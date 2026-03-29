import { el } from "../ui.js";
import { getSessionUser } from "../auth.js";
import { loadState } from "../storage.js";
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

function parseSkills(csv) {
  return String(csv || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function matchScore(userSkillsCsv, requiredCsv) {
  const u = new Set(parseSkills(userSkillsCsv));
  const r = parseSkills(requiredCsv);
  return r.reduce((acc, s) => acc + (u.has(s) ? 1 : 0), 0);
}

export function DashboardPage() {
  const user = getSessionUser();
  if (!user) return el(`<div class="card">${t("common.login_required")}</div>`);

  const state = loadState();

  if (user.role === "EMPLOYER") {
    const myJobs = state.jobs
      .filter((j) => j.employerId === user.id)
      .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
      .slice(0, 10);

    const apps = state.applications
      .map((a) => ({ a, j: state.jobs.find((j) => j.id === a.jobId) }))
      .filter((x) => x.j && x.j.employerId === user.id)
      .sort((x, y) => (y.a.createdAt || "").localeCompare(x.a.createdAt || ""))
      .slice(0, 10);

    return el(`
      <div class="grid">
        <section class="card">
          <h2 style="margin-top:0">${t("dash.employer_title")}</h2>
          <p class="muted" style="margin-top:0">${t("common.company")}: ${esc(user.companyName || "—")}</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <a class="btn primary" href="#/employer/post">${t("emp.post_title")}</a>
            <a class="btn" href="#/employer/jobs">${t("emp.manage")}</a>
            <a class="btn" href="#/profile">${t("dash.edit_profile")}</a>
          </div>
        </section>

        <section class="grid grid2">
          <div class="card">
            <h3 style="margin-top:0">Your jobs</h3>
            ${
              myJobs.length === 0
                ? `<p class="muted">No jobs yet.</p>`
                : `<div class="grid">${myJobs
                    .map((j) => {
                      const icon = iconForJob(j);
                      return `
                        <a class="card" href="#/jobs/${j.id}">
                          <div style="display:flex;gap:12px;align-items:flex-start">
                            <span class="jobIcon ${esc(icon.key)}" title="${esc(icon.label)}">${icon.svg}</span>
                            <div>
                              <strong>${esc(j.title)}</strong>
                              <div class="muted">${esc(j.location)} • ${esc(j.type)} ${j.remote ? "• remote" : ""}</div>
                            </div>
                          </div>
                        </a>
                      `;
                    })
                    .join("")}</div>`
            }
          </div>

          <div class="card">
            <h3 style="margin-top:0">Recent applications</h3>
            ${
              apps.length === 0
                ? `<p class="muted">No applications yet.</p>`
                : `<div class="grid">${apps
                    .map(({ a, j }) => {
                      const seeker = state.users.find((u) => u.id === a.seekerId);
                      const icon = iconForJob(j);
                      return `
                        <div class="card">
                          <div style="display:flex;justify-content:space-between;gap:10px">
                            <div style="display:flex;gap:12px;align-items:flex-start">
                              <span class="jobIcon ${esc(icon.key)}" title="${esc(icon.label)}">${icon.svg}</span>
                              <div>
                                <strong>${esc(seeker?.name || "Seeker")}</strong>
                                <div class="muted">Applied to <a href="#/jobs/${j.id}">${esc(j.title)}</a></div>
                              </div>
                            </div>
                            <span class="pill">${esc(a.status)}</span>
                          </div>
                          <div class="muted small" style="margin-top:10px">Employer can accept/reject in “Employer → Applications”.</div>
                        </div>
                      `;
                    })
                    .join("")}</div>`
            }
          </div>
        </section>
      </div>
    `);
  }

  // SEEKER
  const skillsCount = parseSkills(user.skills).length;
  const scored = state.jobs
    .map((j) => ({ j, score: matchScore(user.skills, j.requiredSkills) }))
    .sort((a, b) => b.score - a.score || (b.j.createdAt || "").localeCompare(a.j.createdAt || ""))
    .slice(0, 10);

  const myApps = state.applications
    .filter((a) => a.seekerId === user.id)
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .slice(0, 10);

  return el(`
    <div class="grid">
      <section class="hero">
        <div class="heroInner">
        <h2 style="margin-top:0">${t("dash.seeker_welcome", { name: esc(user.name) })}</h2>
        <p class="subtitle">${t("dash.seeker_sub")}</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn primary" href="#/profile">${t("dash.update_profile")}</a>
          <a class="btn" href="#/jobs">${t("dash.browse_all")}</a>
        </div>
        <div class="kpis">
          <div class="kpi">
            <strong>${skillsCount}</strong>
            <span>${t("dash.skills_count")}</span>
          </div>
          <div class="kpi">
            <strong>${myApps.length}</strong>
            <span>${t("dash.apps_sent")}</span>
          </div>
          <div class="kpi">
            <strong>${scored[0]?.score ?? 0}</strong>
            <span>${t("dash.best_score")}</span>
          </div>
        </div>
        </div>
      </section>

      <section class="grid grid2">
        <div class="card">
          <h3 style="margin-top:0">${t("dash.recommended")}</h3>
          ${
            scored.length === 0
              ? `<p class="muted">No jobs yet.</p>`
              : `<div class="grid">${scored
                  .map(({ j, score }) => {
                    const icon = iconForJob(j);
                    return `
                      <a class="card hoverable" href="#/jobs/${j.id}">
                        <div style="display:flex;justify-content:space-between;gap:10px">
                          <div style="display:flex;gap:12px;align-items:flex-start">
                            <span class="jobIcon ${esc(icon.key)}" title="${esc(icon.label)}">${icon.svg}</span>
                            <div>
                              <strong>${esc(j.title)}</strong>
                              <div class="muted">${esc(j.location)} • ${esc(j.type)} ${j.remote ? "• remote" : ""}</div>
                            </div>
                          </div>
                          <span class="chip green">match: ${score}</span>
                        </div>
                      </a>
                    `;
                  })
                  .join("")}</div>`
          }
        </div>

        <div class="card">
          <h3 style="margin-top:0">${t("dash.my_apps")}</h3>
          ${
            myApps.length === 0
              ? `<p class="muted">You haven't applied yet.</p>`
              : `<div class="grid">${myApps
                  .map((a) => {
                    const j = state.jobs.find((j) => j.id === a.jobId);
                    const icon = j ? iconForJob(j) : null;
                    return `
                      <div class="card">
                        <div style="display:flex;justify-content:space-between;gap:10px">
                          <div style="display:flex;gap:12px;align-items:flex-start">
                            ${icon ? `<span class="jobIcon ${esc(icon.key)}" title="${esc(icon.label)}">${icon.svg}</span>` : ""}
                            <div>
                              <strong>${esc(j?.title || "Job")}</strong>
                              <div class="muted">${esc(j?.location || "")}</div>
                            </div>
                          </div>
                          <span class="chip ${a.status === "ACCEPTED" ? "green" : a.status === "REJECTED" ? "red" : "blue"}">${esc(
      a.status
    )}</span>
                        </div>
                      </div>
                    `;
                  })
                  .join("")}</div>`
          }
        </div>
      </section>
    </div>
  `);
}
