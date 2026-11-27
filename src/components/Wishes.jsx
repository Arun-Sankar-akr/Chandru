import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import { watchWishes, addWish, newWishId } from "../wishStore.js";
import "../wishes.css";

/* ---------- colours ---------- */
const PRESETS = [
  ["#e0a52c", "Gold"],
  ["#e0457b", "Rose"],
  ["#8a5bd6", "Amethyst"],
  ["#ff7a3d", "Sunset"],
  ["#2fb7a3", "Jade"],
  ["#4a8df0", "Sky"],
];
// wishes saved before colour picking existed only have a "style" name
const LEGACY = { gold: "#e0a52c", rose: "#c21f4c", amethyst: "#8a5bd6" };
const HEX = /^#[0-9a-f]{6}$/i;

const colorOf = (w) => (HEX.test(w.color) ? w.color : LEGACY[w.style] || PRESETS[0][0]);

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const mix = (hex, to, t) => {
  const a = rgb(hex), b = rgb(to);
  return "rgb(" + a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",") + ")";
};
// CSS variables that paint one lantern from a single base colour
const lanternVars = (hex) => ({
  "--c1": mix(hex, "#ffffff", 0.55),
  "--c2": hex,
  "--c3": mix(hex, "#000000", 0.28),
  "--glow": "rgba(" + rgb(hex).join(",") + ",.5)",
});

/* ---------- stable pseudo-random numbers from a wish id ---------- */
const hash = (s) => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const leftOf = (id) => 6 + (hash(id) % 84);

const star = (ctx, x, y, r) => {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4, rr = i % 2 ? r * 0.28 : r;
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  ctx.closePath();
  ctx.fill();
};

export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState(PRESETS[0][0]);
  const [sel, setSel] = useState(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");
  const [rise, setRise] = useState(-640); // how far a lantern flies: the full height of the sky
  const mine = useRef(new Set()); // ids released from this device: they start at the bottom
  const last = useRef(0);

  const sky = useRef(null);
  const cv = useRef(null);
  const parts = useRef([]);
  const raf = useRef(0);
  const prev = useRef(0);
  const dpr = useRef(1);
  const lastTrail = useRef({ x: -99, y: -99 });
  const calm = useRef(
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(
    () => watchWishes(setWishes, () => setNote("Could not load wishes. Please try again later.")),
    []
  );

  /* ---------- sparkle + confetti canvas (runs only while particles exist) ---------- */
  const tick = useCallback((now) => {
    const c = cv.current;
    if (!c) { raf.current = 0; return; }
    const ctx = c.getContext("2d");
    const dt = Math.min(3, (now - (prev.current || now)) / 16.7);
    prev.current = now;
    ctx.setTransform(dpr.current, 0, 0, dpr.current, 0, 0);
    ctx.clearRect(0, 0, c.width / dpr.current, c.height / dpr.current);
    parts.current = parts.current.filter((p) => p.life > 0);
    for (const p of parts.current) {
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy += p.g * dt; p.vx *= 0.985;
      p.rot += p.vr * dt; p.life -= dt;
      ctx.globalAlpha = Math.max(0, p.life / p.max);
      ctx.fillStyle = p.c;
      if (p.kind === "star") star(ctx, p.x, p.y, p.r);
      else {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
    if (parts.current.length) raf.current = requestAnimationFrame(tick);
    else { raf.current = 0; prev.current = 0; }
  }, []);

  const spawn = useCallback((list) => {
    if (calm.current) return;
    parts.current.push(...list);
    if (parts.current.length > 260) parts.current.splice(0, parts.current.length - 260);
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  }, [tick]);

  const burst = useCallback((x, y, base) => {
    const cols = [base, "#e0a52c", "#e0457b", "#f5c75a"];
    spawn(Array.from({ length: 28 }, () => {
      const a = Math.random() * Math.PI * 2, s = 1.2 + Math.random() * 3.6;
      const life = 60 + Math.random() * 45;
      return {
        x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1.4, g: 0.07,
        life, max: life, r: 3 + Math.random() * 3.5, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
        c: cols[(Math.random() * cols.length) | 0], kind: Math.random() < 0.4 ? "star" : "rect",
      };
    }));
  }, [spawn]);

  useEffect(() => {
    const el = sky.current, c = cv.current;
    if (!el || !c || typeof ResizeObserver === "undefined") return;
    const fit = () => {
      dpr.current = Math.min(2, window.devicePixelRatio || 1);
      c.width = el.clientWidth * dpr.current;
      c.height = el.clientHeight * dpr.current;
      setRise(-(el.clientHeight + 230));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => { ro.disconnect(); cancelAnimationFrame(raf.current); raf.current = 0; };
  }, []);

  function trail(e) {
    if (e.pointerType !== "mouse" || calm.current) return;
    const r = sky.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const d = Math.hypot(x - lastTrail.current.x, y - lastTrail.current.y);
    if (d < 16) return;
    lastTrail.current = { x, y };
    const cols = ["#e0a52c", "#f0c35a", "#e0457b"];
    const life = 34 + Math.random() * 14;
    spawn([{
      x: x + (Math.random() - 0.5) * 8, y: y + (Math.random() - 0.5) * 8,
      vx: (Math.random() - 0.5) * 0.4, vy: 0.2 + Math.random() * 0.3, g: 0.012,
      life, max: life, r: 3 + Math.random() * 3.5, rot: 0, vr: 0,
      c: cols[(Math.random() * cols.length) | 0], kind: "star",
    }]);
  }

  /* ---------- lanterns ---------- */
  const lanterns = useMemo(
    () =>
      wishes.slice(0, 28).map((w) => {
        const h = hash(w.id);
        const s = 0.62 + ((h >>> 7) % 40) / 100;       // depth: 0.62 (far) … 1.01 (near)
        const dur = (24 + ((h >>> 3) % 14)) * (1.6 - 0.6 * s); // far lanterns drift slower
        return {
          ...w,
          hex: colorOf(w),
          left: leftOf(w.id),
          s,
          blur: s < 0.78 ? (0.78 - s) * 8 : 0,
          dur,
          // own new lantern starts at the bottom; others are spread along the whole flight path
          delay: mine.current.has(w.id) ? 0 : -(((h >>> 5) % 100) / 100) * dur,
          sway: 4 + ((h >>> 9) % 4),
          swayDelay: -((h >>> 11) % 5),
        };
      }),
    [wishes]
  );

  function pick(e, l) {
    if (sel === l.id) return setSel(null);
    const r = sky.current.getBoundingClientRect(), b = e.currentTarget.getBoundingClientRect();
    burst(b.left - r.left + b.width / 2, b.top - r.top + b.height / 3, l.hex);
    setSel(l.id);
  }

  useEffect(() => {
    if (!sel) return;
    const k = (e) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [sel]);

  async function release() {
    if (busy) return;
    if (!name.trim() || !text.trim()) return setNote("Please add your name and a blessing.");
    if (Date.now() - last.current < 8000) return setNote("One moment before the next lantern ✨");
    setBusy(true);
    try {
      const id = newWishId();
      const hex = HEX.test(color) ? color : PRESETS[0][0];
      mine.current.add(id);
      await addWish({ id, name, text, color: hex, style: "gold" });
      last.current = Date.now();
      const el = sky.current;
      if (el) burst((el.clientWidth * leftOf(id)) / 100, el.clientHeight - 48, hex);
      setName(""); setText(""); setNote("");
      setToast("Your blessing has been cast into the sky ✨");
      setTimeout(() => setToast(""), 4200);
    } catch (e) {
      console.error(e);
      setNote("Could not save your wish. Please try again.");
      setTimeout(() => setNote(""), 4000);
    }
    setBusy(false);
  }

  const picked = lanterns.find((l) => l.id === sel);

  return (
    <section id="wishes" className="wish-sec">
      <Reveal>
        <p className="lbl">Blessings from the heart</p>
        <h2>Wish Lanterns</h2>
        <p className="sub">Release a blessing for the couple. It will float in the sky for everyone to read.</p>
      </Reveal>
      <div className="wish-grid">
        <div className="sky" ref={sky} style={{ "--rise": rise + "px" }} onPointerMove={trail} role="group" aria-label="Floating wish lanterns">
          <i className="cloud c-a" />
          <i className="cloud c-b" />
          <p className="sky-hint">✦ Tap a lantern to read a blessing</p>
          {lanterns.length === 0 && <p className="sky-empty sub">Be the first to release a lantern.</p>}

          {lanterns.map((l) => (
            <button
              key={l.id}
              className={"lw " + (l.id === sel ? "sel" : "")}
              style={{
                left: l.left + "%",
                zIndex: Math.round(l.s * 10),
                animationDuration: l.dur + "s",
                animationDelay: l.delay + "s",
                "--s": l.s,
                "--b": l.blur + "px",
                "--sw": l.sway + "s",
                "--swd": l.swayDelay + "s",
                ...lanternVars(l.hex),
              }}
              onClick={(e) => pick(e, l)}
              aria-label={`Blessing from ${l.name}`}
            >
              <span className="lw-in">
                <span className="sway"><span className="ln"><i /></span></span>
                <em>{l.name}</em>
              </span>
            </button>
          ))}

          <canvas className="fx" ref={cv} aria-hidden="true" />

          {picked && (
            <div className="read-wrap" onClick={() => setSel(null)}>
              <div
                className="read"
                role="dialog"
                aria-label={`Blessing from ${picked.name}`}
                style={lanternVars(picked.hex)}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="x" aria-label="Close" onClick={() => setSel(null)}>×</button>
                <span className="heart" aria-hidden="true">♥</span>
                <p className="q">“{picked.text}”</p>
                <small>From</small>
                <b>{picked.name}</b>
              </div>
            </div>
          )}

          <div className={"toast " + (toast ? "show" : "")} role="status" aria-live="polite">
            <strong>Lantern released! 🏮</strong>
            <span>{toast}</span>
          </div>
        </div>

        <div className="card wish-form">
          <h3>Release a Wish Lantern</h3>
          <p className="sub">Your blessing will float in the sky forever.</p>
          <input value={name} maxLength={24} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" />
          <textarea value={text} maxLength={140} onChange={(e) => setText(e.target.value)} placeholder="Write a blessing…" aria-label="Your blessing" rows={4} />
          <small className="count">{text.length}/140</small>

          <p className="lbl pick-l">Choose lantern colour</p>
          <div className="color-row">
            <span className="preview" aria-hidden="true">
              <span className="ln" style={lanternVars(color)}><i /></span>
            </span>
            <div className="swatches">
              {PRESETS.map(([hex, label]) => (
                <button
                  key={hex}
                  type="button"
                  className={"sw " + (color.toLowerCase() === hex ? "on" : "")}
                  style={{ background: hex }}
                  onClick={() => setColor(hex)}
                  aria-label={label}
                  aria-pressed={color.toLowerCase() === hex}
                  title={label}
                />
              ))}
              <label className="sw custom" title="Pick any colour">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} aria-label="Custom lantern colour" />
                <span>+</span>
              </label>
            </div>
          </div>

          <button className="btn" onClick={release} disabled={busy}>{busy ? "Releasing…" : "Release Lantern"}</button>
          <p className="wish-note" aria-live="polite">{note}</p>
        </div>
      </div>
    </section>
  );
}