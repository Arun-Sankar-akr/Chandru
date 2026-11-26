import Reveal from "./Reveal.jsx";
import useWide from "../useWide.js";
import portrait from "../assets/temple-portrait.jpg";
import wideImg from "../assets/temple-wide.jpg";
import { wedding } from "../config.js";

export default function Venue() {
  const wide = useWide();
  return (
    <section id="venue">
      <Reveal variant="zoom">
        <p className="lbl">Where we say “I do”</p>
        <h2>Our Venue</h2>
        <div className="venue">
          <img src={wide ? wideImg : portrait} alt="Temple gopuram by the sea" />
        </div>
        <p className="sub" style={{ marginTop: 16 }}>
          {wedding.venue.name}
        </p>
        {wedding.venue.mapUrl && (
          <a className="btn" style={{ display: "inline-block", textDecoration: "none", animation: "none" }} href={wedding.venue.mapUrl} target="_blank" rel="noreferrer">
            View on map
          </a>
        )}
      </Reveal>
    </section>
  );
}
