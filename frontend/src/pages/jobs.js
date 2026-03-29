import { el, qs } from "../ui.js";
import { loadState } from "../storage.js";
import { iconForJob } from "../icons.js";
import { t } from "../i18n.js";

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function jobCard(job, employerName) {
  const icon = iconForJob(job);
  const skills = String(job.requiredSkills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6);

  return `
    <a class="card hoverable" href="#/jobs/${job.id}">
      <div style="display:flex;justify-content:space-between;gap:10px">
        <div style="display:flex;gap:12px;align-items:flex-start">
          <span class="jobIcon ${escapeHtml(icon.key)}" title="${escapeHtml(icon.label)}">${icon.svg}</span>
          <div>
            <strong style="font-size:16px">${escapeHtml(job.title)}</strong>
            <div class="muted">
              ${escapeHtml(employerName)} • ${escapeHtml(job.location)} • ${escapeHtml(job.type)} ${
    job.remote ? "• remote" : ""
  }
            </div>
          </div>
        </div>
        <span class="chip blue">View</span>
      </div>
      <div style="margin-top:10px" class="chipRow">
        ${job.remote ? `<span class="chip green">Remote</span>` : `<span class="chip">On-site</span>`}
        ${job.type ? `<span class="chip">${escapeHtml(job.type)}</span>` : ""}
        ${
          skills.length
            ? skills.map((s) => `<span class="chip">${escapeHtml(s)}</span>`).join("")
            : `<span class="chip">No skills listed</span>`
        }
      </div>
    </a>
  `;
}

export function JobsPage() {
  const state = loadState();
  const root = el(`
    <div class="grid">
      <section class="card">
        <h2 style="margin-top:0">${t("jobs.title")}</h2>
        <form id="form">
          <div class="row">
            <div>
              <label>${t("jobs.keyword")}</label>
              <input name="q" placeholder="Python, coffee, delivery, electrician..." />
            </div>
            <div>
              <label>${t("jobs.location")}</label>
              <input name="location" placeholder="Casablanca, Rabat..." />
            </div>
          </div>
          <div class="row">
            <div>
              <label>${t("jobs.type")}</label>
              <select name="type">
                <option value="">${t("jobs.any")}</option>
                <option value="internship">${t("home.cat_intern")}</option>
                <option value="job">${t("jobs.job")}</option>
                <option value="freelance">${t("jobs.freelance")}</option>
              </select>
            </div>
            <div>
              <label>${t("jobs.remote")}</label>
              <select name="remote">
                <option value="">${t("jobs.any")}</option>
                <option value="1">${t("jobs.remote_only")}</option>
              </select>
            </div>
          </div>
          <button class="btn primary" type="submit">${t("jobs.search")}</button>
        </form>
      </section>

      <section class="grid" id="list"></section>
    </div>
  `);

  function renderList(filters) {
    const list = qs(root, "#list");
    const q = (filters.q || "").toLowerCase().trim();
    const location = (filters.location || "").toLowerCase().trim();
    const type = (filters.type || "").trim();
    const remote = (filters.remote || "").trim();

    const jobs = state.jobs
      .filter((j) => {
        if (q) {
          const hay = `${j.title} ${j.description} ${j.requiredSkills || ""}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        if (location && !String(j.location || "").toLowerCase().includes(location)) return false;
        if (type && j.type !== type) return false;
        if (remote && !j.remote) return false;
        return true;
      })
      .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

    if (jobs.length === 0) {
      list.innerHTML = `<div class="card"><p class="muted" style="margin:0">${t("jobs.no_jobs")}</p></div>`;
      return;
    }

    list.innerHTML = jobs
      .map((j) => {
        const employer = state.users.find((u) => u.id === j.employerId);
        const name = employer?.companyName || employer?.name || "Employer";
        return jobCard(j, name);
      })
      .join("");
  }

  renderList({});

  qs(root, "#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    renderList({
      q: fd.get("q"),
      location: fd.get("location"),
      type: fd.get("type"),
      remote: fd.get("remote")
    });
  });

  return root;
}

