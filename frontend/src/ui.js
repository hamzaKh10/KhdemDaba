export function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export function mount(root, node) {
  root.innerHTML = "";
  root.append(node);
}

export function setFlash(type, msg) {
  const flash = document.getElementById("flash");
  if (!flash) return;
  if (!msg) {
    flash.style.display = "none";
    flash.textContent = "";
    flash.className = "flash";
    return;
  }
  flash.style.display = "block";
  flash.textContent = msg;
  flash.className = `flash ${type === "ok" ? "ok" : "err"}`;
}

export function qs(root, sel) {
  const node = root.querySelector(sel);
  if (!node) throw new Error(`Missing element: ${sel}`);
  return node;
}

export function fmtMoney(amount) {
  if (!Number.isFinite(amount)) return "";
  return `${amount} MAD`;
}

