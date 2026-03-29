import { el, qs, fmtMoney } from "../ui.js";
import { getSessionUser } from "../auth.js";
import { loadState, withState, uid } from "../storage.js";
import { nav } from "../router.js";
import { iconForJob } from "../icons.js";
import { getLang, t } from "../i18n.js";

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function pill(text) {
  return `<span class="pill">${escapeHtml(text)}</span>`;
}

export function JobPage({ jobId, flash }) {
  const state = loadState();
  const job = state.jobs.find((j) => j.id === jobId);
  if (!job) return el(`<div class="card">Job not found.</div>`);

  const icon = iconForJob(job);
  const employer = state.users.find((u) => u.id === job.employerId);
  const employerName = employer?.companyName || employer?.name || "Employer";
  const user = getSessionUser();

  const workDetails = [
    job.durationValue && job.durationUnit ? pill(`Duration: ${job.durationValue} ${String(job.durationUnit).toLowerCase()}`) : "",
    job.daysPerWeek ? pill(`Days/week: ${job.daysPerWeek}`) : "",
    job.hoursPerDay ? pill(`Hours/day: ${job.hoursPerDay}`) : "",
    job.payAmount && job.payUnit ? pill(`Pay: ${fmtMoney(job.payAmount)} / ${String(job.payUnit).toLowerCase()}`) : ""
  ].filter(Boolean);

  const root = el(`
    <div class="grid">
      <section class="card">
        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
          <div style="display:flex;gap:12px;align-items:flex-start">
            <span class="jobIcon big ${escapeHtml(icon.key)}" title="${escapeHtml(icon.label)}">${icon.svg}</span>
            <div>
              <h2 style="margin-top:0;margin-bottom:6px">${escapeHtml(job.title)}</h2>
              <div class="muted">
                ${escapeHtml(employerName)} • ${escapeHtml(job.location)} • ${escapeHtml(job.type)} ${
    job.remote ? "• remote" : ""
  }
              </div>
            </div>
          </div>
          <a class="btn" href="#/jobs">${t("job.back")}</a>
        </div>

        ${
          workDetails.length
            ? `<div style="margin-top:14px">
                <h3 style="margin-top:0">${t("job.details")}</h3>
                <div style="display:flex;gap:10px;flex-wrap:wrap">${workDetails.join("")}</div>
              </div>`
            : ""
        }

        ${
          (job.requiredSkills || "").trim()
            ? `<div style="margin-top:14px">
                <h3 style="margin-top:0">${t("job.skills")}</h3>
                <p class="muted" style="margin:0">${escapeHtml(job.requiredSkills)}</p>
              </div>`
            : ""
        }

        <div style="margin-top:14px">
          <h3 style="margin-top:0">${t("job.desc")}</h3>
          <p class="muted" style="white-space:pre-wrap">${escapeHtml(job.description)}</p>
        </div>
      </section>

      <section class="card" style="max-width:720px">
        <h3 style="margin-top:0">${t("job.apply")}</h3>
        <div id="applyBox"></div>
      </section>
    </div>
  `);

  const applyBox = qs(root, "#applyBox");

  const already = user
    ? state.applications.find((a) => a.jobId === job.id && a.seekerId === user.id)
    : null;

  if (!user) {
    applyBox.innerHTML = `<p class="muted">${
      getLang() === "ar" ? `المرجو <a href="#/login">تسجيل الدخول</a> للتقديم.` : `Please <a href="#/login">login</a> to apply.`
    }</p>`;
    return root;
  }

  if (user.role !== "SEEKER") {
    applyBox.innerHTML = `<p class="muted">${
      getLang() === "ar" ? "فقط الباحثون عن عمل يمكنهم التقديم." : "Only job seekers can apply to jobs."
    }</p>`;
    return root;
  }

  if (already) {
    applyBox.innerHTML = `<p class="muted">${
      getLang() === "ar" ? "لقد قمت بالتقديم مسبقاً. الحالة:" : "You already applied. Status:"
    } <span class="pill">${escapeHtml(already.status)}</span></p>`;
    return root;
  }

  applyBox.innerHTML = `
    <form id="applyForm">
      <div>
        <label>${t("job.cover")}</label>
        <textarea name="coverNote" rows="5" placeholder="${t("job.cover_ph")}"></textarea>
      </div>
      <button class="btn primary" type="submit">${t("job.apply_now")}</button>
      <p class="muted small" style="margin:0">${t("job.prototype")}</p>
    </form>
  `;

  qs(root, "#applyForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const coverNote = String(fd.get("coverNote") || "").trim();

    withState((s) => {
      s.applications.push({
        id: uid("a"),
        jobId: job.id,
        seekerId: user.id,
        status: "PENDING",
        coverNote,
        createdAt: new Date().toISOString()
      });
      return s;
    });

    flash?.("ok", "Applied successfully.");
    nav("/dashboard");
  });

  return root;
}

