import { loadState, withState, uid } from "./storage.js";

export function getSessionUser() {
  const state = loadState();
  const userId = state.session?.userId || "";
  if (!userId) return null;
  return state.users.find((u) => u.id === userId) || null;
}

export function logout() {
  withState((s) => {
    s.session.userId = "";
    return s;
  });
}

export function login(email, password) {
  email = String(email || "").toLowerCase().trim();
  password = String(password || "");
  return withState((s) => {
    const user = s.users.find((u) => u.email === email && u.password === password);
    if (!user) return s;
    s.session.userId = user.id;
    return s;
  });
}

export function signup(payload) {
  const email = String(payload.email || "").toLowerCase().trim();
  const password = String(payload.password || "");
  const role = payload.role === "EMPLOYER" ? "EMPLOYER" : "SEEKER";
  const name = String(payload.name || "").trim();
  const location = String(payload.location || "").trim();
  const companyName = String(payload.companyName || "").trim();

  if (!email.includes("@") || password.length < 8 || name.length < 2) {
    return { ok: false, error: "Invalid signup data." };
  }

  let createdUserId = "";
  withState((s) => {
    if (s.users.some((u) => u.email === email)) return s;
    const user = {
      id: uid("u"),
      email,
      password,
      role,
      name,
      location,
      createdAt: new Date().toISOString()
    };
    if (role === "SEEKER") {
      user.skills = "";
      user.portfolioUrl = "";
      user.cvName = "";
      user.workLinks = [];
      user.workImages = [];
    } else {
      user.companyName = companyName || "My Company";
      user.companyWebsite = "";
      user.companyDescription = "";
    }
    s.users.push(user);
    s.session.userId = user.id;
    createdUserId = user.id;
    return s;
  });

  if (!createdUserId) return { ok: false, error: "Email already exists." };
  return { ok: true };
}

