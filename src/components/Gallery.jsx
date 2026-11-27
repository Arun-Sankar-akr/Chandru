import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import g1 from "../assets/gallery-1.jpg";
import g2 from "../assets/gallery-2.jpg";
import g3 from "../assets/gallery-3.jpg";

const slides = [g1, g2, g3];

// 3D coverflow: the centre photo faces you, the others turn away in depth.
export default function Gallery() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 4200);
    return () => clearInterval(t);
  }, [paused, n]);

  const go = (d) => setI((x) => (x + d + n) % n);
  const off = (k) => { let d = (k - i + n) % n; if (d > n / 2) d -= n; return d; };

  return (
    <section id="gallery">
      <Reveal>
        <p className="lbl">Our moments</p>
        <h2>Our Gallery</h2>
        <p className="sub">A little glimpse into our story, before the big day.</p>
        <div className="cf-wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)}>
          <div className="cf">
            {slides.map((s, k) => {
              const d = off(k);
              return <img key={k} className="cf-i" src={s} alt={`Sweatha and Chandru portrait ${k + 1}`} loading="lazy" onClick={() => setI(k)} style={{ "--d": d, "--a": Math.abs(d), zIndex: 10 - Math.abs(d) }} />;
            })}
          </div>
        </div>
        <div className="cf-ctl">
          <button className="cf-btn" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
          <span>{i + 1} / {n}</span>
          <button className="cf-btn" onClick={() => go(1)} aria-label="Next photo">›</button>
        </div>
      </Reveal>
    </section>
  );
}
