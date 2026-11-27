import useWide from "../useWide.js";
import portrait from "../assets/temple-portrait.jpg";
import wideImg from "../assets/temple-wide.jpg";
import { wedding } from "../config.js";

export default function Splash({ open, onOpen }) {
  const wide = useWide();
  return (
    <div className={"splash" + (open ? " open" : "")} style={{ backgroundImage: `url(${wide ? wideImg : portrait})` }}>
      <div className="sp-card tilt">
        <p className="ta">திருமண அழைப்பிதழ்</p>
        <p className="lbl">With the blessings of the Almighty</p>
        <h1>{wedding.brideShort} &amp; {wedding.groomShort}</h1>
        <p className="sub">{wedding.dateText}</p>
        <button className="btn" onClick={onOpen}>Open Invitation</button>
      </div>
    </div>
  );
}
