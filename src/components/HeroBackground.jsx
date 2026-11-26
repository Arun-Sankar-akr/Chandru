import { useMemo } from "react";

// Decorative, animated hero background: drifting gradient, glowing orbs,
// slowly turning mandalas, falling petals and twinkling sparkles.

function Mandala({ className }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const dots = Array.from({ length: 32 }, (_, i) => i * 11.25);
  return (
    <svg className={className} viewBox="-200 -200 400 400" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle r="190" strokeDasharray="2 6" />
        <circle r="150" />
        <circle r="96" strokeDasharray="1 5" />
        <circle r="44" />
        {petals.map((a) => (
          <path key={a} d="M0 -150 C 22 -118 22 -92 0 -62 C -22 -92 -22 -118 0 -150Z" transform={`rotate(${a})`} />
        ))}
        {petals.map((a) => (
          <path key={"s" + a} d="M0 -96 C 11 -80 11 -66 0 -50 C -11 -66 -11 -80 0 -96Z" transform={`rotate(${a + 11.25})`} />
        ))}
        {dots.map((a) => (
          <circle key={"d" + a} cy="-170" r="2.2" fill="currentColor" stroke="none" transform={`rotate(${a})`} />
        ))}
      </g>
    </svg>
  );
}

export default function HeroBackground() {
  // fixed pseudo-random values so petals don't jump on re-render
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: (i * 61 + 7) % 100,
        size: 12 + ((i * 7) % 12),
        dur: 11 + ((i * 5) % 9),
        delay: -((i * 3.1) % 14),
        sway: 18 + ((i * 11) % 34),
        hue: i % 3,
      })),
    []
  );
  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: (i * 37 + 11) % 96,
        top: (i * 53 + 5) % 92,
        dur: 2.4 + ((i * 3) % 5) * 0.6,
        delay: -((i * 0.7) % 4),
      })),
    []
  );

  return (
    <div className="hbg" aria-hidden="true">
      <div className="hbg-grad" />
      <span className="orb o1" />
      <span className="orb o2" />
      <span className="orb o3" />
      <Mandala className="mandala m1" />
      <Mandala className="mandala m2" />
      {sparkles.map((s, i) => (
        <i
          key={"s" + i}
          className="spark"
          style={{ left: s.left + "%", top: s.top + "%", animationDuration: s.dur + "s", animationDelay: s.delay + "s" }}
        />
      ))}
      {petals.map((p, i) => (
        <b
          key={"p" + i}
          className={"petal h" + p.hue}
          style={{
            left: p.left + "%",
            width: p.size,
            height: p.size,
            animationDuration: p.dur + "s",
            animationDelay: p.delay + "s",
            "--sway": p.sway + "px",
          }}
        />
      ))}
    </div>
  );
}
