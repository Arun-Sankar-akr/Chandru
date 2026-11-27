import Reveal from "./Reveal.jsx";
import bride from "../assets/bride.jpg";
import groom from "../assets/groom.jpg";
import { wedding } from "../config.js";

function Person({ img, name, role, line, variant }) {
  return (
    <Reveal variant={variant}>
      <article className="person">
        <div className="person-img tilt">
          <img src={img} alt={name} loading="lazy" />
        </div>
        <p className="lbl">{role}</p>
        <h3 className="person-name">{name}</h3>
        <p className="sub">{line}</p>
      </article>
    </Reveal>
  );
}

export default function Couple() {
  const [bf, bm] = wedding.brideParents;
  const [gf, gm] = wedding.groomParents;
  return (
    <section id="couple" className="wide-sec">
      <Reveal>
        <p className="lbl">The two of us</p>
        <h2>Bride &amp; Groom</h2>
      </Reveal>
      <div className="couple">
        <Person img={bride} name={wedding.bride} role="The Bride" variant="left" line={`Daughter of ${bf} & ${bm}`} />
        <div className="couple-heart" aria-hidden="true">♥</div>
        <Person img={groom} name={wedding.groom} role="The Groom" variant="right" line={`Son of ${gf} & ${gm}`} />
      </div>
    </section>
  );
}
