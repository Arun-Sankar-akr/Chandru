import { Orn } from "./Reveal.jsx";
import HeroBackground from "./HeroBackground.jsx";
import bride from "../assets/bride.jpg";
import groom from "../assets/groom.jpg";
import { wedding } from "../config.js";

// Fullscreen bride | groom background. `open` starts the entrance animation.
export default function Hero({ open }) {
  const d = (s) => ({ "--d": s });
  return (
    <header className={"hero" + (open ? " go" : "")}>
      <div className="hero-scene">
        <div className="hero-stage">
          <div className="hero-bg">
            <img className="half" src={bride} alt={wedding.bride} />
            <img className="half" src={groom} alt={wedding.groom} />
            <i className="veil" />
          </div>
          <HeroBackground />
          <div className="rings" aria-hidden="true"><i className="ring a" /><i className="ring b" /></div>
          <div className="hero-in">
            <p className="ta hz" style={d(".7s")}>திருமண அழைப்பிதழ்</p>
            <p className="lbl hz" style={d(".9s")}>Together with their families</p>
            <h1>
              <span className="hz" style={d("1.1s")}>{wedding.brideShort}</span>
              <span className="amp hz" style={d("1.35s")}>&amp;</span>
              <span className="hz" style={d("1.6s")}>{wedding.groomShort}</span>
            </h1>
            <div className="hz" style={d("2s")}><Orn /></div>
            <p className="date hz" style={d("2.2s")}>{wedding.dateText}</p>
            <p className="sub hz" style={d("2.45s")}>request the pleasure of your presence at their wedding</p>
            <a className="cue hz" style={d("2.8s")} href="#couple" aria-label="Scroll to the invitation"><span>Scroll</span><i /></a>
          </div>
        </div>
      </div>
      <i className="hero-fade" />
    </header>
  );
}
