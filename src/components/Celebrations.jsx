import Reveal from "./Reveal.jsx";
import { wedding } from "../config.js";

export default function Celebrations() {
  return (
    <section>
      <Reveal variant="zoom">
        <p className="lbl">Save the date</p>
        <h2>Wedding Celebrations</h2>
        <div className="card">
          <p className="ta">முகூர்த்தம்</p>
          <h3>Muhurtham</h3>
          <p>{wedding.longDate}</p>
          <p className="sub">{wedding.time}</p>
        </div>
      </Reveal>
    </section>
  );
}
