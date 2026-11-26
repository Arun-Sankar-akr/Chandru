import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import { wedding } from "../config.js";

const target = new Date(wedding.date);

export default function Countdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const d = Math.max(0, target - now);
  const parts = [
    ["Days", Math.floor(d / 864e5)],
    ["Hours", Math.floor(d / 36e5) % 24],
    ["Minutes", Math.floor(d / 6e4) % 60],
    ["Seconds", Math.floor(d / 1e3) % 60],
  ];

  return (
    <section>
      <Reveal>
        <p className="lbl">Counting the moments</p>
        <h2>Until Our Forever</h2>
        <div className="cd">
          {parts.map(([label, n], i) => (
            <div key={label} style={{ "--i": i }}>
              <b key={n} className="tick">{String(n).padStart(2, "0")}</b>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <p className="sub" style={{ marginTop: 20 }}>
          {d === 0 ? "Today is the day! 💛" : `${wedding.brideShort} & ${wedding.groomShort} · 27 January 2027`}
        </p>
      </Reveal>
    </section>
  );
}
