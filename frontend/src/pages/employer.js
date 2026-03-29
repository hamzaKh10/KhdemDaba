import { el, qs, fmtMoney } from "../ui.js";
import { getSessionUser } from "../auth.js";
import { loadState, withState, uid } from "../storage.js";
import { nav } from "../router.js";
import { iconForJob } from "../icons.js";
import { t } from "../i18n.js";

function esc(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loginRequiredCard() {
  return el(`<div class="card">${t("common.login_required")}</div>`);
}

function notAllowedCard() {
  return el(`<div class="card">${t("common.not_allowed")}</div>`);
}

export function EmployerJobsPage() {
  const user = getSessionUser();
  if (!user) return loginRequiredCard();
  if (user.role !== "EMPLOYER") return notAllowedCard();

  const state = loadState();
  const jobs = state.jobs
    .filter((j) => j.employerId === user.id)
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

  return el(`
    <div class="grid">
      <section class="card">
        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
          <h2 style="margin:0">${t("emp.manage")}</h2>
          <a class="btn primary" href="#/employer/post">${t("emp.new_job")}</a>
        </div>
      </section>

      <section class="grid">
        ${
          jobs.length === 0
            ? `<div class="card"><p class="muted" style="margin:0">${t("emp.no_jobs")}</p></div>`
            : jobs
                .map((j) => {
                  const icon = iconForJob(j);
                  return `
                    <a class="card" href="#/employer/apps/${j.id}">
                      <div style="display:flex;gap:12px;align-items:flex-start">
                        <span class="jobIcon ${esc(icon.key)}" title="${esc(icon.label)}">${icon.svg}</span>
                        <div>
                          <strong>${esc(j.title)}</strong>
                          <div class="muted">${esc(j.location)} • ${esc(j.type)} ${j.remote ? `• ${t("common.remote")}` : ""}</div>
                          <div class="muted small">${t("emp.open_apps")}</div>
                        </div>
                      </div>
                    </a>
                  `;
                })
                .join("")
        }
      </section>
    </div>
  `);
}

export function EmployerPostJobPage({ flash }) {
  const user = getSessionUser();
  if (!user) return loginRequiredCard();
  if (user.role !== "EMPLOYER") return notAllowedCard();

  const root = el(`
    <div class="grid">
      <section class="card" style="max-width:860px">
        <h2 style="margin-top:0">${t("emp.post_title")}</h2>
        <form id="form">
          <div>
            <label>${t("emp.form_title")}</label>
            <input name="title" required />
          </div>
          <div>
            <label>${t("emp.form_desc")}</label>
            <textarea name="description" rows="7" required></textarea>
          </div>
          <div class="row">
            <div>
              <label>${t("jobs.location")}</label>
              <input name="location" required />
            </div>
            <div>
              <label>${t("emp.form_type")}</label>
              <select name="type">
                <option value="internship">${t("home.cat_intern")}</option>
                <option value="job" selected>${t("jobs.job")}</option>
                <option value="freelance">${t("jobs.freelance")}</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div>
              <label>${t("emp.form_remote")}</label>
              <select name="remote">
                <option value="">${t("emp.no")}</option>
                <option value="1">${t("emp.yes")}</option>
              </select>
            </div>
            <div>
              <label>${t("emp.skills")}</label>
              <input name="requiredSkills" placeholder="Coffee, Delivery, Cleaning..." />
            </div>
          </div>

          <div class="card">
            <h4 style="margin-top:0">${t("emp.work_details")}</h4>
            <div class="row">
              <div>
                <label>${t("emp.duration_value")}</label>
                <input name="durationValue" inputmode="numeric" placeholder="e.g. 3" />
              </div>
              <div>
                <label>${t("emp.duration_unit")}</label>
                <select name="durationUnit">
                  <option value="">${t("emp.not_specified")}</option>
                  <option value="DAYS">${t("emp.days")}</option>
                  <option value="WEEKS">${t("emp.weeks")}</option>
                  <option value="MONTHS">${t("emp.months")}</option>
                  <option value="YEARS">${t("emp.years")}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div>
                <label>${t("emp.days_week")}</label>
                <input name="daysPerWeek" inputmode="numeric" placeholder="e.g. 5" />
              </div>
              <div>
                <label>${t("emp.hours_day")}</label>
                <input name="hoursPerDay" inputmode="numeric" placeholder="e.g. 8" />
              </div>
            </div>
            <div class="row">
              <div>
                <label>${t("emp.pay_amount")}</label>
                <input name="payAmount" inputmode="numeric" placeholder="e.g. 80" />
              </div>
              <div>
                <label>${t("emp.pay_unit")}</label>
                <select name="payUnit">
                  <option value="">${t("emp.not_specified")}</option>
                  <option value="HOURLY">${t("emp.hourly")}</option>
                  <option value="DAILY">${t("emp.daily")}</option>
                  <option value="WEEKLY">${t("emp.weekly")}</option>
                  <option value="MONTHLY">${t("emp.monthly")}</option>
                  <option value="FIXED">${t("emp.fixed")}</option>
                </select>
              </div>
            </div>
          </div>

          <button class="btn primary" type="submit">${t("emp.post_btn")}</button>
        </form>
      </section>
    </div>
  `);

  qs(root, "#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const title = String(fd.get("title") || "").trim();
    const description = String(fd.get("description") || "").trim();
    const location = String(fd.get("location") || "").trim();
    const type = String(fd.get("type") || "").trim();

    const durationValue = Number(fd.get("durationValue") || "");
    const daysPerWeek = Number(fd.get("daysPerWeek") || "");
    const hoursPerDay = Number(fd.get("hoursPerDay") || "");
    const payAmount = Number(fd.get("payAmount") || "");

    const jobId = uid("j");
    withState((s) => {
      s.jobs.unshift({
        id: jobId,
        employerId: user.id,
        title,
        description,
        location,
        type,
        remote: String(fd.get("remote") || "") === "1",
        requiredSkills: String(fd.get("requiredSkills") || ""),
        durationValue: Number.isFinite(durationValue) && durationValue > 0 ? durationValue : 0,
        durationUnit: String(fd.get("durationUnit") || ""),
        daysPerWeek: Number.isFinite(daysPerWeek) && daysPerWeek > 0 ? daysPerWeek : 0,
        hoursPerDay: Number.isFinite(hoursPerDay) && hoursPerDay > 0 ? hoursPerDay : 0,
        payAmount: Number.isFinite(payAmount) && payAmount > 0 ? payAmount : 0,
        payUnit: String(fd.get("payUnit") || ""),
        createdAt: new Date().toISOString()
      });
      return s;
    });

    flash?.("ok", t("emp.posted"));
    nav(`/jobs/${jobId}`);
  });

  return root;
}

export function EmployerApplicationsPage({ jobId, flash }) {
  const user = getSessionUser();
  if (!user) return loginRequiredCard();
  if (user.role !== "EMPLOYER") return notAllowedCard();

  const state = loadState();
  const job = state.jobs.find((j) => j.id === jobId);
  if (!job || job.employerId !== user.id) return el(`<div class="card">Job not found.</div>`);

  const root = el(`
    <div class="grid">
      <section class="card">
        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
          <div>
            <h2 style="margin-top:0;margin-bottom:6px">${esc(job.title)}</h2>
            <div class="muted">${esc(job.location)} • ${esc(job.type)}</div>
          </div>
          <a class="btn" href="#/employer/jobs">${t("emp.back")}</a>
        </div>
      </section>

      <section class="card">
        <h3 style="margin-top:0">${t("emp.apps")}</h3>
        <div id="list" class="grid"></div>
      </section>
    </div>
  `);

  const list = qs(root, "#list");

  function render() {
    const st = loadState();
    const apps = st.applications
      .filter((a) => a.jobId === job.id)
      .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

    if (apps.length === 0) {
      list.innerHTML = `<p class="muted">${t("emp.none_apps")}</p>`;
      return;
    }

    list.innerHTML = apps
      .map((a) => {
        const seeker = st.users.find((u) => u.id === a.seekerId);
        return `
          <div class="card">
            <div style="display:flex;justify-content:space-between;gap:10px">
              <div>
                <strong>${esc(seeker?.name || "Seeker")}</strong>
                <div class="muted">${esc(seeker?.location || "—")}</div>
                ${
                  (seeker?.skills || "").trim()
                    ? `<div class="muted">${t("emp.skills_label")} ${esc(seeker.skills)}</div>`
                    : ""
                }
                <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
                  ${seeker?.cvName ? `<span class="pill">${t("emp.cv_label")} ${esc(seeker.cvName)}</span>` : ""}
                  ${
                    seeker?.portfolioUrl
                      ? `<a class="btn" target="_blank" rel="noreferrer" href="${esc(seeker.portfolioUrl)}">${t(
                          "emp.portfolio"
                        )}</a>`
                      : ""
                  }
                </div>
                ${
                  a.coverNote
                    ? `<p class="muted" style="white-space:pre-wrap">${esc(a.coverNote)}</p>`
                    : ""
                }
              </div>
              <span class="pill">${esc(a.status)}</span>
            </div>

            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">
              <button class="btn primary" data-act="accept" data-id="${esc(a.id)}" ${
          a.status === "ACCEPTED" ? "disabled" : ""
        }>${t("emp.accept")}</button>
              <button class="btn danger" data-act="reject" data-id="${esc(a.id)}" ${
          a.status === "REJECTED" ? "disabled" : ""
        }>${t("emp.reject")}</button>
            </div>
          </div>
        `;
      })
      .join("");

    list.querySelectorAll("button[data-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const act = btn.getAttribute("data-act");
        const status = act === "accept" ? "ACCEPTED" : "REJECTED";
        withState((s) => {
          const app = s.applications.find((x) => x.id === id);
          if (!app) return s;
          app.status = status;
          return s;
        });
        flash?.("ok", t("emp.app_updated"));
        render();
      });
    });
  }

  render();
  return root;
}
