import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import g1 from "../assets/gallery-1.jpg";
import g2 from "../assets/gallery-2.jpg";
import g3 from "../assets/gallery-3.jpg";

const slides = [g1, g2, g3];

export default function Gallery() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section>
      <Reveal>
        <p className="lbl">Our moments</p>
        <h2>Our Gallery</h2>
        <p className="sub">A little glimpse into our story, before the big day.</p>
        <div className="gal">
          <img key={i} src={slides[i]} alt={`Sweatha and Chandru portrait ${i + 1}`} />
        </div>
        <div className="dots">
          {slides.map((_, k) => (
            <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
