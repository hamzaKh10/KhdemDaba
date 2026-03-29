export function getRoute() {
  const hash = window.location.hash || "#/";
  const cleaned = hash.startsWith("#") ? hash.slice(1) : hash;
  const [path, queryString] = cleaned.split("?");
  const query = new URLSearchParams(queryString || "");
  return { path: path || "/", query };
}

export function nav(to) {
  window.location.hash = to.startsWith("#") ? to : `#${to}`;
}

export function onRouteChange(fn) {
  window.addEventListener("hashchange", fn);
  fn();
}

