import Reveal from "./Reveal.jsx";
import { wedding } from "../config.js";

function ParentsCard({ title, names, child }) {
  return (
    <div className="card">
      <p className="lbl">{title}</p>
      <div className="names">{names[0]}</div>
      <p className="sub">&amp;</p>
      <div className="names">{names[1]}</div>
      <p className="sub">parents of {child}</p>
    </div>
  );
}

export default function Parents() {
  return (
    <section>
      <Reveal>
        <p className="lbl">With the blessings of our elders</p>
        <h2>Our Beloved Parents</h2>
      </Reveal>
      <div className="parents">
        {wedding.brideParents && (
          <Reveal variant="left">
            <ParentsCard title="Bride’s Parents" names={wedding.brideParents} child={wedding.bride} />
          </Reveal>
        )}
        {wedding.groomParents && (
          <Reveal variant="right">
            <ParentsCard title="Groom’s Parents" names={wedding.groomParents} child={wedding.groom} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
