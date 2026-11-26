import { Orn } from "./Reveal.jsx";
import HeroBackground from "./HeroBackground.jsx";
import bride from "../assets/bride.jpg";
import groom from "../assets/groom.jpg";
import { wedding } from "../config.js";

// `open` flips to true when the splash is opened, which starts the entrance animation.
export default function Hero({ open }) {
  return (
    <div className={"hero" + (open ? " go" : "")}>
      <HeroBackground />
      <section className="hero-in">
        <p className="ta hz" style={{ "--d": ".7s" }}>திருமண அழைப்பிதழ்</p>
        <p className="lbl hz" style={{ "--d": ".9s" }}>Together with their families</p>
        <h1>
          <span className="hz" style={{ "--d": "1.1s", display: "block" }}>{wedding.bride}</span>
          <span className="amp hz" style={{ "--d": "1.35s" }}>&amp;</span>
          <span className="hz" style={{ "--d": "1.6s", display: "block" }}>{wedding.groom}</span>
        </h1>
        <div className="pair">
          <div className="arch from-l" style={{ "--d": "1.8s" }}>
            <img src={bride} alt={wedding.bride} />
            <span>{wedding.brideShort}</span>
          </div>
          <div className="heart-mid" aria-hidden="true">♥</div>
          <div className="arch from-r" style={{ "--d": "1.8s" }}>
            <img src={groom} alt={wedding.groom} />
            <span>{wedding.groomShort}</span>
          </div>
        </div>
        <div className="hz" style={{ "--d": "2.4s" }}>
          <Orn />
        </div>
        <p className="date shine hz" style={{ "--d": "2.6s" }}>{wedding.dateText}</p>
        <p className="sub hz" style={{ "--d": "2.85s" }}>request the pleasure of your presence at their wedding</p>
        <a className="cue hz" style={{ "--d": "3.2s" }} href="#couple" aria-label="Scroll to the invitation">
          <span>Scroll</span>
          <i />
        </a>
      </section>
    </div>
  );
}
