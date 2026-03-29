const KEY = "khdemdaba_frontend_v1";

function nowIso() {
  return new Date().toISOString();
}

function defaultState() {
  return {
    users: [
      {
        id: "u_seeker_demo",
        email: "seeker@demo.ma",
        password: "Password123!",
        role: "SEEKER",
        name: "Demo Seeker",
        location: "Casablanca",
        skills: "Python, SQL, Django, Git",
        portfolioUrl: "https://example.com",
        cvName: "",
        workLinks: [{ id: "wl1", title: "Instagram", url: "https://example.com" }],
        workImages: [],
        createdAt: nowIso()
      },
      {
        id: "u_employer_demo",
        email: "employer@demo.ma",
        password: "Password123!",
        role: "EMPLOYER",
        name: "Demo Employer",
        location: "Rabat",
        companyName: "Atlas Tech",
        companyWebsite: "https://example.com",
        companyDescription: "Local software studio hiring interns and juniors.",
        createdAt: nowIso()
      }
    ],
    jobs: [
      {
        id: "j1",
        employerId: "u_employer_demo",
        title: "Backend Internship (Python)",
        description: "Work on APIs, databases, and practical backend tasks. Beginners welcome.",
        location: "Casablanca",
        type: "internship",
        remote: true,
        requiredSkills: "Python, SQL, REST",
        durationValue: 3,
        durationUnit: "MONTHS",
        daysPerWeek: 5,
        hoursPerDay: 6,
        payAmount: 2500,
        payUnit: "MONTHLY",
        createdAt: nowIso()
      },
      {
        id: "j2",
        employerId: "u_employer_demo",
        title: "Coffee Shop Helper (Part-time)",
        description: "Help with service, cleaning, and customer support. Training provided.",
        location: "Casablanca",
        type: "job",
        remote: false,
        requiredSkills: "Communication, Teamwork",
        durationValue: 6,
        durationUnit: "MONTHS",
        daysPerWeek: 5,
        hoursPerDay: 6,
        payAmount: 80,
        payUnit: "DAILY",
        createdAt: nowIso()
      }
    ],
    applications: [],
    session: {
      userId: ""
    }
  };
}

export function loadState() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return defaultState();
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaultState();
    return parsed;
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetState() {
  localStorage.removeItem(KEY);
}

export function withState(mutator) {
  const state = loadState();
  const next = mutator(structuredClone(state)) ?? state;
  saveState(next);
  return next;
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

