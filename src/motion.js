// Motion tracker: feeds --mx / --my (-1..1) to CSS from mouse, phone gyroscope,
// or a gentle idle sway, and gives every .tilt element a hover tilt + glare.
const clamp = (v) => Math.max(-1, Math.min(1, v));
let tx = 0, ty = 0, cx = 0, cy = 0, last = 0, base = null;

function onOrient(e) {
  if (e.gamma == null || e.beta == null) return;
  if (base === null) base = e.beta;
  tx = clamp(e.gamma / 22);
  ty = clamp((e.beta - base) / 22);
  last = performance.now();
}

// iOS needs a tap to allow motion sensors; call this from the Open button.
export async function enableGyro() {
  const D = window.DeviceOrientationEvent;
  if (!D || typeof D.requestPermission !== "function") return;
  try {
    if ((await D.requestPermission()) === "granted") window.addEventListener("deviceorientation", onOrient, true);
  } catch {}
}

export function startMotion() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.documentElement;
  const move = (e) => {
    if (e.pointerType === "touch") return;
    tx = (e.clientX / innerWidth - 0.5) * 2;
    ty = (e.clientY / innerHeight - 0.5) * 2;
    last = performance.now();
  };
  let hot = null;
  const tilt = (e) => {
    if (e.pointerType === "touch") return;
    const el = e.target.closest && e.target.closest(".tilt");
    if (hot && hot !== el) reset(hot);
    hot = el;
    if (!el) return;
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--tx", (x - 0.5) * 2);
    el.style.setProperty("--ty", (y - 0.5) * 2);
    el.style.setProperty("--gx", x * 100 + "%");
    el.style.setProperty("--gy", y * 100 + "%");
  };
  const reset = (el) => { el.style.setProperty("--tx", 0); el.style.setProperty("--ty", 0); };
  addEventListener("pointermove", move, { passive: true });
  addEventListener("pointermove", tilt, { passive: true });
  document.addEventListener("pointerleave", () => hot && reset(hot));
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== "function")
    addEventListener("deviceorientation", onOrient, true);

  let raf;
  const loop = (t) => {
    if (t - last > 2500) { tx = Math.sin(t / 2600) * 0.55; ty = Math.cos(t / 3300) * 0.35; }
    cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07;
    root.style.setProperty("--mx", cx.toFixed(3));
    root.style.setProperty("--my", cy.toFixed(3));
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(raf);
}
