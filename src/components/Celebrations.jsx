import Reveal from "./Reveal.jsx";
import { wedding } from "../config.js";

export default function Celebrations() {
  return (
    <section id="schedule">
      <Reveal>
        <p className="lbl">{wedding.longDate}</p>
        <h2>Wedding Celebrations</h2>
        <p className="sub">The day, from the first blessing to the last goodbye.</p>
      </Reveal>
      <ol className="tl">
        {wedding.events.map((e, i) => (
          <li key={e.name}>
            <Reveal variant={i % 2 ? "right" : "left"}>
              <div className="card tl-card tilt">
                <p className="ta">{e.ta}</p>
                <h3>{e.name}</h3>
                <p className="sub">{e.note}</p>
                <p className="tl-time">{e.time || "Time to be announced"}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
