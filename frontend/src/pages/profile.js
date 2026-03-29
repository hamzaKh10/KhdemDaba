import { el, qs } from "../ui.js";
import { getSessionUser } from "../auth.js";
import { loadState, withState, uid } from "../storage.js";
import { t } from "../i18n.js";

function esc(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error("read_failed"));
    fr.onload = () => resolve(String(fr.result || ""));
    fr.readAsDataURL(file);
  });
}

export function ProfilePage({ flash }) {
  const user = getSessionUser();
  if (!user) return el(`<div class="card">${t("common.login_required")}</div>`);

  const state = loadState();
  const me = state.users.find((u) => u.id === user.id) || user;

  const cities = [
    "Casablanca",
    "Rabat",
    "Marrakesh",
    "Tangier",
    "Agadir",
    "Fes",
    "Meknes",
    "Oujda",
    "Kenitra",
    "Tetouan",
    "Safi",
    "El Jadida",
    "Nador",
    "Taza",
    "Settat",
    "Beni Mellal",
    "Khouribga",
    "Mohammedia",
    "Laayoune",
    "Dakhla"
  ];

  const currentCity = String(me.location || "").trim();
  const cityOptions =
    `<option value="">${t("profile.select_city")}</option>` +
    (currentCity && !cities.includes(currentCity) ? `<option value="${esc(currentCity)}" selected>${esc(currentCity)}</option>` : "") +
    cities
      .map((c) => `<option value="${esc(c)}" ${currentCity === c ? "selected" : ""}>${esc(c)}</option>`)
      .join("");

  const root = el(`
    <div class="grid">
      <section class="card" style="max-width:860px">
        <h2 style="margin-top:0">${t("profile.title")}</h2>
        <form id="profileForm">
          <div class="row">
            <div>
              <label>${t("profile.name")}</label>
              <input name="name" value="${esc(me.name)}" required />
            </div>
            <div>
              <label>${t("jobs.location")}</label>
              <select name="location" required>${cityOptions}</select>
            </div>
          </div>

          <div id="roleFields"></div>

          <button class="btn primary" type="submit">${t("profile.save")}</button>
          <p class="muted small" style="margin:0">${t("auth.prototype")}</p>
        </form>
      </section>

      <section id="samplesSection" class="card" style="max-width:860px; display:none"></section>
    </div>
  `);

  const roleFields = qs(root, "#roleFields");
  const samplesSection = qs(root, "#samplesSection");

  if (me.role === "SEEKER") {
    roleFields.innerHTML = `
      <div>
        <label>${t("profile.seeker_skills")}</label>
        <input name="skills" value="${esc(me.skills || "")}" placeholder="Python, Coffee, Delivery..." required />
      </div>
      <div class="row">
        <div>
          <label>${t("profile.portfolio")}</label>
          <input name="portfolioUrl" value="${esc(me.portfolioUrl || "")}" placeholder="https://..." />
        </div>
        <div>
          <label>${t("profile.cv")}</label>
          <input name="cv" type="file" accept="application/pdf" />
        </div>
      </div>
      <p class="muted" style="margin-top:0">${t("profile.current_cv")} ${
        me.cvName ? `<span class="pill">${esc(me.cvName)}</span>` : "—"
      }</p>
    `;

    samplesSection.style.display = "block";
    samplesSection.innerHTML = `
      <h3 style="margin-top:0">${t("profile.samples")}</h3>
      <p class="muted" style="margin-top:0">${t("profile.samples_sub")}</p>

      <div class="grid grid2">
        <div class="card">
          <h4 style="margin-top:0">${t("profile.upload_images")}</h4>
          <form id="imgForm">
            <div>
              <label>${t("profile.images_label")}</label>
              <input name="images" type="file" accept="image/png,image/jpeg,image/webp" multiple required />
            </div>
            <div>
              <label>${t("profile.title_optional")}</label>
              <input name="title" placeholder="e.g. Work sample" />
            </div>
            <button class="btn primary" type="submit">${t("profile.upload_btn")}</button>
          </form>
        </div>

        <div class="card">
          <h4 style="margin-top:0">${t("profile.add_link")}</h4>
          <form id="linkForm">
            <div>
              <label>${t("profile.url")}</label>
              <input name="url" placeholder="https://..." required />
            </div>
            <div>
              <label>${t("profile.title_optional")}</label>
              <input name="title" placeholder="e.g. Instagram page" />
            </div>
            <button class="btn primary" type="submit">${t("profile.add_link_btn")}</button>
          </form>
        </div>
      </div>

      <h4 style="margin-top:18px">${t("profile.your_samples")}</h4>
      <div id="samplesList" class="grid grid2"></div>
    `;

    function renderSamples() {
      const st = loadState();
      const u = st.users.find((x) => x.id === me.id);
      const list = qs(samplesSection, "#samplesList");
      const links = u?.workLinks || [];
      const images = u?.workImages || [];

      const blocks = [];
      for (const img of images) {
        blocks.push(`
          <div class="card">
            <div style="display:flex;justify-content:space-between;gap:10px">
              <div>
                <strong>${esc(img.title || "Image")}</strong>
                <div class="muted small">IMAGE</div>
              </div>
              <button class="btn danger" data-delimg="${esc(img.id)}" type="button">${t("profile.delete")}</button>
            </div>
            <img class="img" style="margin-top:10px" src="${esc(img.dataUrl)}" alt="Work sample" />
          </div>
        `);
      }

      for (const l of links) {
        blocks.push(`
          <div class="card">
            <div style="display:flex;justify-content:space-between;gap:10px">
              <div>
                <strong>${esc(l.title || "Link")}</strong>
                <div class="muted small">LINK</div>
              </div>
              <button class="btn danger" data-dellink="${esc(l.id)}" type="button">${t("profile.delete")}</button>
            </div>
            <a class="muted" style="display:block;margin-top:10px;word-break:break-word" href="${esc(
              l.url
            )}" target="_blank" rel="noreferrer">${esc(l.url)}</a>
          </div>
        `);
      }

      list.innerHTML = blocks.length ? blocks.join("") : `<p class="muted">${t("profile.no_samples")}</p>`;

      list.querySelectorAll("[data-delimg]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-delimg");
          withState((s) => {
            const u2 = s.users.find((x) => x.id === me.id);
            if (!u2) return s;
            u2.workImages = (u2.workImages || []).filter((x) => x.id !== id);
            return s;
          });
          renderSamples();
        });
      });

      list.querySelectorAll("[data-dellink]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-dellink");
          withState((s) => {
            const u2 = s.users.find((x) => x.id === me.id);
            if (!u2) return s;
            u2.workLinks = (u2.workLinks || []).filter((x) => x.id !== id);
            return s;
          });
          renderSamples();
        });
      });
    }

    renderSamples();

    qs(samplesSection, "#linkForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const url = String(fd.get("url") || "").trim();
      const title = String(fd.get("title") || "").trim();
      if (!url.startsWith("http")) {
        flash?.("err", t("profile.valid_url"));
        return;
      }
      withState((s) => {
        const u = s.users.find((x) => x.id === me.id);
        if (!u) return s;
        u.workLinks = u.workLinks || [];
        u.workLinks.unshift({ id: uid("wl"), title, url });
        return s;
      });
      e.currentTarget.reset();
      flash?.("ok", t("profile.link_added"));
      renderSamples();
    });

    qs(samplesSection, "#imgForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const title = String(fd.get("title") || "").trim();
      const input = qs(samplesSection, 'input[name="images"]');
      const files = Array.from(input.files || []).slice(0, 4);
      if (files.length === 0) return;

      for (const file of files) {
        if (file.size > 700 * 1024) {
          flash?.("err", t("profile.img_too_large"));
          continue;
        }
        const dataUrl = await fileToDataUrl(file);
        withState((s) => {
          const u = s.users.find((x) => x.id === me.id);
          if (!u) return s;
          u.workImages = u.workImages || [];
          u.workImages.unshift({ id: uid("wi"), title, dataUrl });
          return s;
        });
      }

      e.currentTarget.reset();
      flash?.("ok", t("profile.img_saved"));
      renderSamples();
    });
  } else {
    roleFields.innerHTML = `
      <div class="row">
        <div>
          <label>${t("profile.company_name")}</label>
          <input name="companyName" value="${esc(me.companyName || "")}" />
        </div>
        <div>
          <label>${t("profile.company_website")}</label>
          <input name="companyWebsite" value="${esc(me.companyWebsite || "")}" placeholder="https://..." />
        </div>
      </div>
      <div>
        <label>${t("profile.company_desc")}</label>
        <textarea name="companyDescription" rows="5">${esc(me.companyDescription || "")}</textarea>
      </div>
    `;
  }

  qs(root, "#profileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const name = String(fd.get("name") || "").trim();
    if (name.length < 2) {
      flash?.("err", t("profile.name_short"));
      return;
    }

    const location = String(fd.get("location") || "").trim();
    const cvFile = fd.get("cv");
    const cvName = cvFile && cvFile.name ? cvFile.name : "";
    const skills = String(fd.get("skills") || "").trim();

    if (me.role === "SEEKER" && skills.length === 0) {
      flash?.("err", t("profile.skills_required"));
      return;
    }

    withState((s) => {
      const u = s.users.find((x) => x.id === me.id);
      if (!u) return s;
      u.name = name;
      u.location = location;
      if (u.role === "SEEKER") {
        u.skills = skills;
        u.portfolioUrl = String(fd.get("portfolioUrl") || "");
        if (cvName) u.cvName = cvName;
      } else {
        u.companyName = String(fd.get("companyName") || "");
        u.companyWebsite = String(fd.get("companyWebsite") || "");
        u.companyDescription = String(fd.get("companyDescription") || "");
      }
      return s;
    });

    flash?.("ok", t("profile.saved"));
    window.location.reload();
  });

  return root;
}
