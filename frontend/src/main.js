import { mount, setFlash } from "./ui.js";
import { onRouteChange, getRoute, nav } from "./router.js";
import { getSessionUser, logout } from "./auth.js";
import { HomePage } from "./pages/home.js";
import { LoginPage } from "./pages/login.js";
import { SignupPage } from "./pages/signup.js";
import { JobsPage } from "./pages/jobs.js";
import { JobPage } from "./pages/job.js";
import { DashboardPage } from "./pages/dashboard.js";
import { ProfilePage } from "./pages/profile.js";
import { EmployerJobsPage, EmployerPostJobPage, EmployerApplicationsPage } from "./pages/employer.js";
import { decorateJobWords } from "./icons.js";
import { applyLangToDocument, getLang, t } from "./i18n.js";

const appRoot = document.getElementById("app");
const navLinks = document.getElementById("navLinks");
const floatCta = document.getElementById("floatCta");
const langDock = document.getElementById("langDock");

function renderLangDock() {
  if (!langDock) return;
  const lang = getLang();
  langDock.innerHTML = `
    <button class="langDockBtn ${lang === "en" ? "active" : ""}" type="button" data-lang="en">EN</button>
    <button class="langDockBtn ${lang === "ar" ? "active" : ""}" type="button" data-lang="ar">العربية</button>
    <button class="langDockBtn ${lang === "dar" ? "active" : ""}" type="button" data-lang="dar">الدارجة</button>
  `;

  langDock.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-lang") || "en";
      localStorage.setItem("khdemdaba_lang", next);
      window.location.reload();
    });
  });
}

function renderNav() {
  const user = getSessionUser();
  if (!navLinks) return;

  const icons = {
    jobs: `<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 9V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    dash: `<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13.5V19a1 1 0 0 0 1 1h5.5V13.5H4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M13.5 4H19a1 1 0 0 1 1 1v5.5h-6.5V4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 5a1 1 0 0 1 1-1h5.5v6.5H4V5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M13.5 13.5H20V19a1 1 0 0 1-1 1h-5.5v-6.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    profile: `<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" stroke-width="2"/></svg>`,
    signup: `<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" stroke="currentColor" stroke-width="2"/><path d="M3 21a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19 8v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M22 11h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    signin: `<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 17l5-5-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M21 4v16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    logout: `<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 17l5-5-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 12H4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20 4v16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
  };

  if (!user) {
    navLinks.innerHTML = `
      <a href="#/jobs">${icons.jobs}${t("nav.jobs")}</a>
      <a class="primaryLink" href="#/signup">${icons.signup}${t("nav.signup")}</a>
      <a href="#/login">${icons.signin}${t("nav.signin")}</a>
    `;
    return;
  }

  navLinks.innerHTML = `
    <a href="#/jobs">${icons.jobs}${t("nav.jobs")}</a>
    <a href="#/dashboard">${icons.dash}${t("nav.dashboard")}</a>
    <a href="#/profile">${icons.profile}${t("nav.profile")}</a>
    ${user.role === "EMPLOYER" ? `<a href="#/employer/jobs">${icons.jobs}${t("nav.employer")}</a>` : ""}
    <button id="logoutBtn" type="button">${t("nav.logout")}</button>
  `;
  const btn = document.getElementById("logoutBtn");
  btn?.addEventListener("click", () => {
    logout();
    setFlash("ok", t("common.logged_out"));
    renderNav();
    nav("/");
  });
}

function flash(type, msg) {
  setFlash(type, msg);
  window.clearTimeout(flash._t);
  flash._t = window.setTimeout(() => setFlash("ok", ""), 3500);
}

function renderFloatCta() {
  if (!floatCta) return;
  const user = getSessionUser();
  const { path } = getRoute();
  const p = path.replace(/\/+$/, "") || "/";

  // Only on home, only when logged out.
  const shouldExist = (p === "/" || p === "") && !user;
  if (!shouldExist) {
    floatCta.classList.remove("show");
    floatCta.style.display = "none";
    floatCta.innerHTML = "";
    window.removeEventListener("scroll", onScrollShow);
    return;
  }

  floatCta.style.display = "block";
  floatCta.innerHTML = `<a class="btn primary" href="#/signup">${t("nav.signup")}</a>`;

  // Show with scroll (slide-in)
  window.removeEventListener("scroll", onScrollShow);
  window.addEventListener("scroll", onScrollShow, { passive: true });
  onScrollShow();
}

function onScrollShow() {
  if (!floatCta) return;
  const y = window.scrollY || 0;
  if (y > 120) floatCta.classList.add("show");
  else floatCta.classList.remove("show");
}

function render() {
  renderLangDock();
  renderNav();
  renderFloatCta();
  const { path } = getRoute();
  const p = path.replace(/\/+$/, "") || "/";

  setFlash("ok", "");

  let node = null;
  if (p === "/" || p === "") node = HomePage();
  else if (p === "/login") node = LoginPage({ flash });
  else if (p === "/signup") node = SignupPage({ flash });
  else if (p === "/dashboard") node = DashboardPage();
  else if (p === "/profile") node = ProfilePage({ flash });
  else if (p === "/jobs") node = JobsPage();

  if (p.startsWith("/jobs/")) {
    const jobId = p.split("/")[2] || "";
    node = JobPage({ jobId, flash });
  }

  if (p === "/employer/jobs") node = EmployerJobsPage();
  if (p === "/employer/post") node = EmployerPostJobPage({ flash });
  if (p.startsWith("/employer/apps/")) {
    const jobId = p.split("/")[3] || "";
    node = EmployerApplicationsPage({ jobId, flash });
  }

  if (!node) {
    node = document.createElement("div");
    node.className = "card";
    node.textContent = t("common.not_found");
  }

  mount(appRoot, node);
  decorateJobWords(appRoot);
}

onRouteChange(render);

applyLangToDocument();
window.addEventListener("khdem:lang", () => {
  applyLangToDocument();
  render();
});
