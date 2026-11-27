import { useMemo } from "react";

// Three depth layers of petals. Each layer sits at a different translateZ and
// shifts with the motion tracker (--mx/--my), so they drift past at different speeds.
const L = [
  { dz: -40, dp: 6, n: 7, s: 0.8 },
  { dz: 60, dp: -14, n: 6, s: 1.1 },
  { dz: 150, dp: -30, n: 4, s: 1.7, blur: 2 },
];

export default function HeroBackground() {
  const layers = useMemo(
    () =>
      L.map((l, k) => ({
        ...l,
        items: Array.from({ length: l.n }, (_, i) => ({
          left: (i * 53 + k * 19 + 9) % 96,
          size: (10 + ((i * 7 + k * 3) % 10)) * l.s,
          dur: 12 + ((i * 5 + k * 2) % 8),
          delay: -((i * 3.1 + k) % 13),
          sway: 20 + ((i * 11) % 34),
          h: (i + k) % 3,
        })),
      })),
    []
  );
  return (
    <div className="pl-wrap" aria-hidden="true">
      {layers.map((l, k) => (
        <div key={k} className="pl" style={{ "--dz": l.dz + "px", "--dp": l.dp, filter: l.blur ? `blur(${l.blur}px)` : undefined }}>
          {l.items.map((p, i) => (
            <b key={i} className={"petal h" + p.h} style={{ left: p.left + "%", width: p.size, height: p.size, animationDuration: p.dur + "s", animationDelay: p.delay + "s", "--sway": p.sway + "px" }} />
          ))}
        </div>
      ))}
    </div>
  );
}
