import { el, qs } from "../ui.js";
import { nav } from "../router.js";
import { signup } from "../auth.js";
import { getLang, t } from "../i18n.js";

export function SignupPage({ flash }) {
  const root = el(`
    <div class="grid">
      <section class="card" style="max-width:720px">
        <h2 style="margin-top:0">${t("auth.signup_title")}</h2>
        <form id="form">
          <div class="row">
            <div>
              <label>${t("auth.role")}</label>
              <select name="role">
                <option value="SEEKER">${t("auth.seeker")}</option>
                <option value="EMPLOYER">${t("auth.employer")}</option>
              </select>
            </div>
            <div>
              <label>${t("auth.full_name")}</label>
              <input name="name" required />
            </div>
          </div>
          <div class="row">
            <div>
              <label>${t("auth.email")}</label>
              <input name="email" type="email" required />
            </div>
            <div>
              <label>${t("auth.password")}</label>
              <input name="password" type="password" placeholder="min 8 chars" required />
            </div>
          </div>
          <div class="row">
            <div>
              <label>${t("auth.location")}</label>
              <input name="location" placeholder="Casablanca, Rabat, ..." />
            </div>
            <div>
              <label>${t("auth.company")}</label>
              <input name="companyName" placeholder="Your company" />
            </div>
          </div>
          <button class="btn primary" type="submit">${t("auth.signup_btn")}</button>
        </form>
        <p class="muted" style="margin-bottom:0">${t("auth.prototype")}</p>
      </section>
    </div>
  `);

  qs(root, "#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = signup({
      role: fd.get("role"),
      name: fd.get("name"),
      email: fd.get("email"),
      password: fd.get("password"),
      location: fd.get("location"),
      companyName: fd.get("companyName")
    });
    if (!res.ok) {
      flash?.("err", res.error);
      return;
    }
    const lang = getLang();
    flash?.("ok", lang === "ar" ? "تم إنشاء الحساب." : "Account created.");
    nav("/dashboard");
  });

  return root;
}
