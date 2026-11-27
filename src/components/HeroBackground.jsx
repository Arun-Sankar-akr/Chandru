import { useMemo } from "react";

// A few soft petals drifting down. Static layers: no motion-tracker (--mx/--my)
// and no depth transforms, so the hero stays calm and cheap on phones and laptops.
const N = 8;

export default function HeroBackground() {
  const items = useMemo(
    () =>
      Array.from({ length: N }, (_, i) => ({
        left: (i * 53 + 9) % 96,
        size: 9 + ((i * 7) % 8),
        dur: 12 + ((i * 5) % 8),
        delay: -((i * 3.1) % 13),
        sway: 20 + ((i * 11) % 34),
        h: i % 3,
      })),
    []
  );
  return (
    <div className="pl-wrap" aria-hidden="true">
      <div className="pl">
        {items.map((p, i) => (
          <b
            key={i}
            className={"petal h" + p.h}
            style={{ left: p.left + "%", width: p.size, height: p.size, animationDuration: p.dur + "s", animationDelay: p.delay + "s", "--sway": p.sway + "px" }}
          />
        ))}
      </div>
    </div>
  );
}