import { useState } from "react";
import Reveal from "./Reveal.jsx";
import { wedding } from "../config.js";

export default function Share() {
  const [copied, setCopied] = useState(false);
  const text = `${wedding.brideShort} & ${wedding.groomShort} are getting married on ${wedding.longDate}. Please join us and bless the couple.`;
  const url = typeof window !== "undefined" ? window.location.href : "";

  const wa = `https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`;

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${wedding.brideShort} & ${wedding.groomShort}`, text, url });
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy this link", url);
    }
  }

  return (
    <section id="share">
      <Reveal variant="zoom">
        <p className="lbl">Spread the joy</p>
        <h2>Share the Invitation</h2>
        <p className="sub">Know someone who should be with us? Send them the invite.</p>
        <div className="share-row">
          <a className="btn" href={wa} target="_blank" rel="noopener noreferrer">
            Send on WhatsApp
          </a>
          <button className="btn ghost" onClick={share}>
            {copied ? "Link copied" : navigator.share ? "Share" : "Copy link"}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
