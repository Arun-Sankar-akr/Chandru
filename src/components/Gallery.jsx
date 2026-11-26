import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import g1 from "../assets/gallery-1.jpg";
import g2 from "../assets/gallery-2.jpg";
import g3 from "../assets/gallery-3.jpg";

const slides = [g1, g2, g3];

export default function Gallery() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  const go = (d) => setI((x) => (x + d + slides.length) % slides.length);

  return (
    <section id="gallery">
      <Reveal>
        <p className="lbl">Our moments</p>
        <h2>Our Gallery</h2>
        <p className="sub">A little glimpse into our story, before the big day.</p>
        <div
          className="gal"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <img key={i} src={slides[i]} alt={`Sweatha and Chandru portrait ${i + 1}`} />
          <button className="gal-nav prev" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
          <button className="gal-nav next" onClick={() => go(1)} aria-label="Next photo">›</button>
          <span className="gal-count">{i + 1} / {slides.length}</span>
        </div>
        <div className="thumbs">
          {slides.map((s, k) => (
            <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`}>
              <img src={s} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
