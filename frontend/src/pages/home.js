import { el } from "../ui.js";
import { getSessionUser } from "../auth.js";
import { t } from "../i18n.js";

export function HomePage() {
  const user = getSessionUser();
  return el(`
    <div class="grid">
      <section class="hero">
        <div class="heroInner">
          <div class="heroGrid">
            <div>
              <h1 class="title">${t("home.title")}</h1>
              <p class="subtitle">
                ${t("home.subtitle")}
              </p>
              <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
                <a class="btn primary" href="#/jobs">${t("home.browse")}</a>
                ${
                  user
                    ? `<a class="btn" href="#/dashboard">${t("home.goto")}</a>`
                    : `<a class="btn primary" href="#/signup">${t("home.create")}</a><a class="btn" href="#/login">${t("nav.signin")}</a>`
                }
              </div>

              <div class="kpis">
                <div class="kpi">
                  <strong>${t("home.skills")}</strong>
                  <span>${t("home.skills_sub")}</span>
                </div>
                <div class="kpi">
                  <strong>${t("home.local")}</strong>
                  <span>${t("home.local_sub")}</span>
                </div>
                <div class="kpi">
                  <strong>${t("home.practical")}</strong>
                  <span>${t("home.practical_sub")}</span>
                </div>
              </div>
            </div>

            <div class="heroArtWrap">
              <img class="heroArt" src="./assets/hero-illustration.svg" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section class="card bigCard">
        <div class="bigHead">
          <h2 style="margin:0;letter-spacing:-0.3px">${t("home.work_title")}</h2>
          <p class="muted" style="margin:8px 0 0 0">
            ${t("home.work_sub")}
          </p>
        </div>
        <div class="sampleGrid">
          <div class="sampleCard">
            <span class="sampleIcon blue" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M8 3h6l4 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <path d="M14 3v4h4" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <path d="M9 12h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M9 16h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            <div class="sampleText">
              <strong>${t("home.work_cv")}</strong>
              <div class="muted small">${t("home.work_cv_sub")}</div>
            </div>
          </div>

          <div class="sampleCard">
            <span class="sampleIcon green" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <path d="M9 11a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z" stroke="currentColor" stroke-width="2" />
                <path d="M4 16l5-4 4 3 3-2 4 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <div class="sampleText">
              <strong>${t("home.work_photos")}</strong>
              <div class="muted small">${t("home.work_photos_sub")}</div>
            </div>
          </div>

          <div class="sampleCard">
            <span class="sampleIcon blue" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M10 13a4 4 0 0 1 0-6l1-1a4 4 0 0 1 6 6l-1 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14 11a4 4 0 0 1 0 6l-1 1a4 4 0 0 1-6-6l1-1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <div class="sampleText">
              <strong>${t("home.work_links")}</strong>
              <div class="muted small">${t("home.work_links_sub")}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <h3 style="margin-top:0">${t("home.cats_title")}</h3>
        <p class="muted" style="margin-top:6px">
          ${t("home.cats_sub")}
        </p>
        <div class="catGrid">
          <div class="catTile">
            <span class="catIcon blue">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 7h10v3a5 5 0 0 1-5 5H9a2 2 0 0 1-2-2V7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <path d="M17 9h2a2 2 0 0 1 0 4h-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            <div>
              <strong>${t("home.cat_cafe")}</strong>
              <div class="muted small">${t("home.cat_cafe_sub")}</div>
            </div>
          </div>

          <div class="catTile">
            <span class="catIcon green">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M14 3 7 10l4 4 7-7-4-4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <path d="M6.5 11.5 3 15l6 6 3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <div>
              <strong>${t("home.cat_handyman")}</strong>
              <div class="muted small">${t("home.cat_handyman_sub")}</div>
            </div>
          </div>

          <div class="catTile">
            <span class="catIcon blue">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 2H9v4l-3 3v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9l-3-3V2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            <div>
              <strong>${t("home.cat_cleaning")}</strong>
              <div class="muted small">${t("home.cat_cleaning_sub")}</div>
            </div>
          </div>

          <div class="catTile">
            <span class="catIcon green">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 13h9l2-4h5l-2 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" stroke-width="2" />
                <path d="M18 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" stroke-width="2" />
              </svg>
            </span>
            <div>
              <strong>${t("home.cat_delivery")}</strong>
              <div class="muted small">${t("home.cat_delivery_sub")}</div>
            </div>
          </div>

          <div class="catTile">
            <span class="catIcon blue">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 19h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M7 19V9l5-5 5 5v10" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <path d="M9 12h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            <div>
              <strong>${t("home.cat_painting")}</strong>
              <div class="muted small">${t("home.cat_painting_sub")}</div>
            </div>
          </div>

          <div class="catTile">
            <span class="catIcon green">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M12 22v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M20 12h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M10 12H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M7.5 16.5A6 6 0 0 1 16.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            <div>
              <strong>${t("home.cat_plumbing")}</strong>
              <div class="muted small">${t("home.cat_plumbing_sub")}</div>
            </div>
          </div>

          <div class="catTile">
            <span class="catIcon blue">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
              </svg>
            </span>
            <div>
              <strong>${t("home.cat_electric")}</strong>
              <div class="muted small">${t("home.cat_electric_sub")}</div>
            </div>
          </div>

          <div class="catTile">
            <span class="catIcon green">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" stroke-width="2" />
                <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            <div>
              <strong>${t("home.cat_intern")}</strong>
              <div class="muted small">${t("home.cat_intern_sub")}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid grid2">
        <div class="card">
          <h3 style="margin-top:0">${t("home.problem")}</h3>
          <ul class="muted" style="margin:0;padding-inline-start:18px">
            <li>${t("home.problem_1")}</li>
            <li>${t("home.problem_2")}</li>
            <li>${t("home.problem_3")}</li>
          </ul>
        </div>
        <div class="card">
          <h3 style="margin-top:0">${t("home.solution")}</h3>
          <ul class="muted" style="margin:0;padding-inline-start:18px">
            <li>${t("home.solution_1")}</li>
            <li>${t("home.solution_2")}</li>
            <li>${t("home.solution_3")}</li>
          </ul>
        </div>
      </section>

      <section class="grid grid2">
        <div class="card">
          <h3 style="margin-top:0">${t("home.seekers")}</h3>
          <ul class="muted" style="margin:0;padding-inline-start:18px">
            <li>${t("home.seeker_1")}</li>
            <li>${t("home.seeker_2")}</li>
            <li>${t("home.seeker_3")}</li>
          </ul>
        </div>
        <div class="card">
          <h3 style="margin-top:0">${t("home.employers")}</h3>
          <ul class="muted" style="margin:0;padding-inline-start:18px">
            <li>${t("home.employer_1")}</li>
            <li>${t("home.employer_2")}</li>
            <li>${t("home.employer_3")}</li>
          </ul>
        </div>
      </section>

      <section class="card">
        <h3 style="margin-top:0">${t("home.diff")}</h3>
        <div class="grid grid2">
          <div class="card">
            <h4 style="margin-top:0">${t("home.match")}</h4>
            <p class="muted" style="margin:0">
              ${t("home.match_sub")}
            </p>
          </div>
          <div class="card">
            <h4 style="margin-top:0">${t("home.hiring")}</h4>
            <p class="muted" style="margin:0">
              ${t("home.hiring_sub")}
            </p>
          </div>
        </div>
      </section>

      ${
        user
          ? ""
          : `
        <section class="card">
          <h2 style="margin-top:0;letter-spacing:-0.2px">${t("home.ready")}</h2>
          <p class="muted" style="margin-top:0">
            ${t("home.ready_sub")}
          </p>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <a class="btn primary" href="#/signup">${t("nav.signup")}</a>
            <a class="btn" href="#/login">${t("nav.signin")}</a>
            <a class="btn" href="#/jobs">${t("home.browse")}</a>
          </div>
        </section>
      `
      }
    </div>
  `);
}
