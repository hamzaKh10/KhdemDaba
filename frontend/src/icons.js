function norm(s) {
  return String(s || "").toLowerCase();
}

function hasAny(hay, words) {
  return words.some((w) => hay.includes(w));
}

export function jobCategory(job) {
  const hay = norm(`${job?.title || ""} ${job?.description || ""} ${job?.requiredSkills || ""}`);

  if (hasAny(hay, ["café", "cafe", "coffee", "barista", "waiter", "restaurant", "kitchen"])) return "cafe";
  if (hasAny(hay, ["barber", "hair", "haircut", "salon", "coiffeur", "حلاق"])) return "barber";
  if (hasAny(hay, ["mechanic", "garage", "repair", "répar", "reparation", "ميكانيكي"])) return "mechanic";
  if (hasAny(hay, ["security", "guard", "agent", "حارس", "أمن", "امن"])) return "security";
  if (hasAny(hay, ["cashier", "sales", "seller", "vendeur", "caiss", "بائع", "كاشيير"])) return "cashier";
  if (hasAny(hay, ["driver", "chauffeur", "taxi", "uber", "سائق"])) return "driver";
  if (hasAny(hay, ["garden", "gardener", "jardin", "بستاني"])) return "gardener";
  if (hasAny(hay, ["tailor", "sew", "seam", "couture", "خياط"])) return "tailor";
  if (hasAny(hay, ["nurse", "hospital", "clinic", "health", "ممرض"])) return "health";
  if (hasAny(hay, ["teacher", "tutor", "school", "education", "مدرس"])) return "teacher";
  if (hasAny(hay, ["warehouse", "storekeeper", "stock", "magasinier", "مستودع"])) return "warehouse";
  if (hasAny(hay, ["plumb", "plomberie", "plombier", "pipe"])) return "plumbing";
  if (hasAny(hay, ["electric", "électric", "electricien", "électricien", "wiring"])) return "electrician";
  if (hasAny(hay, ["paint", "painter", "peinture", "renov"])) return "painting";
  if (hasAny(hay, ["deliver", "delivery", "rider", "courier", "livreur", "scooter", "bike"])) return "delivery";
  if (hasAny(hay, ["clean", "cleaning", "ménage", "menage", "housekeep"])) return "cleaning";
  if (hasAny(hay, ["carpen", "carpenter", "wood", "menuis", "handyman", "bricolage", "construction"])) return "handyman";
  if (job?.type === "internship" || hasAny(hay, ["intern", "internship", "stage", "trainee", "student"])) return "internship";
  if (job?.type === "freelance" || hasAny(hay, ["developer", "dev", "web", "frontend", "backend", "python", "javascript", "react"])) {
    return "tech";
  }
  return "general";
}

const ICONS = {
  cafe: {
    label: "Café / Restaurant",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 7h10v3a5 5 0 0 1-5 5H9a2 2 0 0 1-2-2V7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M17 9h2a2 2 0 0 1 0 4h-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M8 20h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },
  barber: {
    label: "Barber",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 4c2 2 2 6 0 8l-2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M16 4c-2 2-2 6 0 8l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M7 17l10-10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M10 20a3 3 0 0 1-4-4l2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14 20a3 3 0 0 0 4-4l-2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`
  },
  handyman: {
    label: "Handyman / Bricolage",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 3 7 10l4 4 7-7-4-4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M6.5 11.5 3 15l6 6 3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`
  },
  mechanic: {
    label: "Mechanic",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" stroke="currentColor" stroke-width="2" />
      <path d="M19.4 13a7.8 7.8 0 0 0 0-2l2-1-1.5-2.6-2.3.6a8 8 0 0 0-1.7-1L16.5 4H13.5l-.4 2.9a8 8 0 0 0-2.2 0L10.5 4H7.5l.6 2.9a8 8 0 0 0-1.7 1L4 7.4 2.5 10l2 1a7.8 7.8 0 0 0 0 2l-2 1L4 16.6l2.3-.6a8 8 0 0 0 1.7 1L7.5 20h3l.4-2.9a8 8 0 0 0 2.2 0l.4 2.9h3l.6-2.9a8 8 0 0 0 1.7-1l2.3.6L21.4 14l-2-1Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>`
  },
  cleaning: {
    label: "Cleaning",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3h6v4l-2 2v12a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2V9l-2-2V3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M9 7h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },
  delivery: {
    label: "Delivery",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 13h9l2-4h5l-2 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" stroke-width="2" />
      <path d="M18 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" stroke-width="2" />
    </svg>`
  },
  driver: {
    label: "Driver",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" stroke-width="2" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" stroke-width="2" />
      <path d="M5.5 12h3.2M15.3 12h3.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },
  painting: {
    label: "Painting",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h10v5H4V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M14 8h4a2 2 0 0 1 2 2v1h-6V8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M9 11v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },
  plumbing: {
    label: "Plumbing",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 7h6a3 3 0 0 1 3 3v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M10 20H7a3 3 0 0 1-3-3v-2h6v5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M16 13h4v4a3 3 0 0 1-3 3h-1v-7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>`
  },
  electrician: {
    label: "Electrician",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>`
  },
  security: {
    label: "Security",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2 20 6v6c0 6-4.5 9.5-8 10-3.5-.5-8-4-8-10V6l8-4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M9 12l2 2 4-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`
  },
  cashier: {
    label: "Cashier / Sales",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 7h14v14H5V7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M9 12h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M9 16h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },
  gardener: {
    label: "Gardener",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M7 14c4 1 6 0 10-4 2-2 3-5 3-7-2 0-5 1-7 3-4 4-5 6-4 10Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M5 12c0-3 2-5 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },
  tailor: {
    label: "Tailor",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3c2 2 3 4 3 6l-3 3-3-3c0-2 1-4 3-6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M12 12v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M9 15h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },
  health: {
    label: "Health",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6.5-7 11-7 11Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M12 9v4M10 11h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },
  teacher: {
    label: "Teacher",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h10a3 3 0 0 1 3 3v11H7a3 3 0 0 0-3 3V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M7 10h7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M7 14h7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },
  warehouse: {
    label: "Warehouse",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 8l9-5 9 5v13H3V8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M9 21V12h6v9" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M7 10h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },
  internship: {
    label: "Internship / Student",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7l9-4 9 4-9 4-9-4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M7 10v6c0 1.7 2.2 3 5 3s5-1.3 5-3v-6" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M21 7v7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  },
  tech: {
    label: "Tech / Office",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h16v10H4V5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M8 19h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M10 9l-2 2 2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14 9l2 2-2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`
  },
  general: {
    label: "Job",
    svg: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M4 9V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>`
  }
};

export function iconForJob(job) {
  const key = jobCategory(job);
  const it = ICONS[key] || ICONS.general;
  return { key, label: it.label, svg: it.svg };
}

const INLINE_KEYWORDS = new Map([
  // cafe / restaurant
  ["cafe", "cafe"],
  ["café", "cafe"],
  ["coffee", "cafe"],
  ["barista", "cafe"],
  ["waiter", "cafe"],
  ["restaurant", "cafe"],
  ["kitchen", "cafe"],
  ["serveur", "cafe"],
  ["مقهى", "cafe"],
  ["قهوة", "cafe"],
  // barber
  ["barber", "barber"],
  ["hairdresser", "barber"],
  ["haircut", "barber"],
  ["salon", "barber"],
  ["coiffeur", "barber"],
  ["حلاق", "barber"],
  // handyman / construction
  ["carpenter", "handyman"],
  ["carpentry", "handyman"],
  ["menuisier", "handyman"],
  ["menuiserie", "handyman"],
  ["handyman", "handyman"],
  ["bricolage", "handyman"],
  ["construction", "handyman"],
  ["maçon", "handyman"],
  ["macon", "handyman"],
  ["نجار", "handyman"],
  ["بناء", "handyman"],
  // mechanic
  ["mechanic", "mechanic"],
  ["garage", "mechanic"],
  ["repair", "mechanic"],
  ["reparation", "mechanic"],
  ["réparation", "mechanic"],
  ["ميكانيكي", "mechanic"],
  // cleaning
  ["cleaning", "cleaning"],
  ["cleaner", "cleaning"],
  ["clean", "cleaning"],
  ["menage", "cleaning"],
  ["ménage", "cleaning"],
  ["housekeeping", "cleaning"],
  ["تنظيف", "cleaning"],
  // delivery
  ["delivery", "delivery"],
  ["deliver", "delivery"],
  ["courier", "delivery"],
  ["driver", "delivery"],
  ["livreur", "delivery"],
  ["توصيل", "delivery"],
  // driver
  ["chauffeur", "driver"],
  ["taxi", "driver"],
  ["uber", "driver"],
  ["سائق", "driver"],
  // painting
  ["painting", "painting"],
  ["painter", "painting"],
  ["peinture", "painting"],
  ["صباغ", "painting"],
  ["دهان", "painting"],
  // plumbing
  ["plumber", "plumbing"],
  ["plumbing", "plumbing"],
  ["plombier", "plumbing"],
  ["plomberie", "plumbing"],
  ["سباك", "plumbing"],
  // electrician
  ["electrician", "electrician"],
  ["electric", "electrician"],
  ["électricien", "electrician"],
  ["electricien", "electrician"],
  ["électricité", "electrician"],
  ["electricite", "electrician"],
  ["كهربائي", "electrician"],
  // security
  ["security", "security"],
  ["guard", "security"],
  ["حارس", "security"],
  ["أمن", "security"],
  ["امن", "security"],
  // cashier / sales
  ["cashier", "cashier"],
  ["sales", "cashier"],
  ["seller", "cashier"],
  ["vendeur", "cashier"],
  ["caissier", "cashier"],
  ["بائع", "cashier"],
  // gardener
  ["gardener", "gardener"],
  ["garden", "gardener"],
  ["jardin", "gardener"],
  ["بستاني", "gardener"],
  // tailor
  ["tailor", "tailor"],
  ["couture", "tailor"],
  ["seamstress", "tailor"],
  ["خياط", "tailor"],
  // health
  ["nurse", "health"],
  ["hospital", "health"],
  ["clinic", "health"],
  ["health", "health"],
  ["ممرض", "health"],
  // teacher
  ["teacher", "teacher"],
  ["tutor", "teacher"],
  ["school", "teacher"],
  ["education", "teacher"],
  ["مدرس", "teacher"],
  // warehouse
  ["warehouse", "warehouse"],
  ["stock", "warehouse"],
  ["magasinier", "warehouse"],
  ["storekeeper", "warehouse"],
  ["مستودع", "warehouse"],
  // internship / student
  ["intern", "internship"],
  ["internship", "internship"],
  ["stage", "internship"],
  ["student", "internship"],
  ["تدريب", "internship"],
  ["طالب", "internship"],
  // tech
  ["developer", "tech"],
  ["frontend", "tech"],
  ["backend", "tech"],
  ["python", "tech"],
  ["javascript", "tech"],
  ["freelancer", "tech"]
]);

function buildInlineRegex() {
  const keys = Array.from(INLINE_KEYWORDS.keys())
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(`\\b(${keys.join("|")})\\b`, "gi");
}

const INLINE_RE = buildInlineRegex();

export function iconForJobWord(word) {
  const key = INLINE_KEYWORDS.get(String(word || "").toLowerCase()) || "general";
  const it = ICONS[key] || ICONS.general;
  return { key, label: it.label, svg: it.svg };
}

export function decorateJobWords(root) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);

  for (const node of nodes) {
    const parent = node.parentElement;
    if (!parent) continue;
    if (parent.closest(".jobWord")) continue;
    if (parent.closest("script, style, noscript")) continue;
    if (parent.closest("input, textarea, select, [contenteditable='true']")) continue;
    if (parent.closest(".catTile, .sampleCard")) continue;
    const card = parent.closest(".card");
    if (card && card.querySelector(".jobIcon, .catIcon, .sampleIcon")) continue;

    const text = node.nodeValue || "";
    if (!text.trim()) continue;
    INLINE_RE.lastIndex = 0;
    const matches = Array.from(text.matchAll(INLINE_RE));
    if (matches.length === 0) continue;

    const frag = document.createDocumentFragment();
    let last = 0;
    for (const m of matches) {
      const idx = m.index ?? 0;
      const word = m[0] || "";
      if (idx > last) frag.append(document.createTextNode(text.slice(last, idx)));

      const icon = iconForJobWord(word);
      const wrap = document.createElement("span");
      wrap.className = "jobWord";

      const iconEl = document.createElement("span");
      iconEl.className = `jobWordIcon ${icon.key}`;
      iconEl.setAttribute("aria-hidden", "true");
      iconEl.innerHTML = icon.svg;

      const txt = document.createElement("span");
      txt.className = "jobWordText";
      txt.textContent = word;

      wrap.append(iconEl, txt);
      frag.append(wrap);
      last = idx + word.length;
    }
    if (last < text.length) frag.append(document.createTextNode(text.slice(last)));
    node.parentNode?.replaceChild(frag, node);
  }
}
