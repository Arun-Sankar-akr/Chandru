import Reveal, { Orn } from "./Reveal.jsx";
import { wedding } from "../config.js";

export default function Footer() {
  return (
    <footer className="foot">
      <Reveal>
        <p className="ta">வாழ்க வளமுடன்</p>
        <div className="script">
          {wedding.brideShort} &amp; {wedding.groomShort}
        </div>
        <Orn />
        <p className="sub">Your blessings and presence will make our day complete.</p>
      </Reveal>
    </footer>
  );
}
