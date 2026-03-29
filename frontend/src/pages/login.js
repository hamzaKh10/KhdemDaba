import { el, qs } from "../ui.js";
import { login } from "../auth.js";
import { nav } from "../router.js";
import { getLang, t } from "../i18n.js";

export function LoginPage({ flash }) {
  const root = el(`
    <div class="grid">
      <section class="card" style="max-width:520px">
        <h2 style="margin-top:0">${t("auth.login_title")}</h2>
        <form id="form">
          <div>
            <label>${t("auth.email")}</label>
            <input name="email" type="email" placeholder="you@email.com" required />
          </div>
          <div>
            <label>${t("auth.password")}</label>
            <input name="password" type="password" required />
          </div>
          <button class="btn primary" type="submit">${t("auth.login_btn")}</button>
        </form>
        <p class="muted" style="margin-bottom:0">
          ${t("auth.demo")}
        </p>
      </section>
    </div>
  `);

  const lang = getLang();
  if (flash) flash("ok", lang === "ar" ? "نصيحة: استخدم حسابات التجربة للاختبار بسرعة." : "Tip: use the demo accounts to test quickly.");

  qs(root, "#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email");
    const password = fd.get("password");
    const state = login(email, password);
    const ok = state.session?.userId;
    if (!ok) {
      flash?.("err", lang === "ar" ? "البريد الإلكتروني أو كلمة المرور غير صحيحة." : "Invalid email or password.");
      return;
    }
    flash?.("ok", lang === "ar" ? "تم تسجيل الدخول." : "Logged in.");
    nav("/dashboard");
  });

  return root;
}
