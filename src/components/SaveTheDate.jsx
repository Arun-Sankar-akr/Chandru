import Reveal from "./Reveal.jsx";
import { wedding } from "../config.js";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const pad = (n) => String(n).padStart(2, "0");

// Read y/m/d straight from the config string so it is always the wedding's own
// (India) date, whatever timezone the guest's phone is in.
const [Y, M, D] = wedding.date.slice(0, 10).split("-").map(Number);
const firstDow = new Date(Date.UTC(Y, M - 1, 1)).getUTCDay();
const daysInMonth = new Date(Date.UTC(Y, M, 0)).getUTCDate();

function downloadIcs() {
  const next = new Date(Date.UTC(Y, M - 1, D + 1));
  const ymd = (y, m, d) => `${y}${pad(m)}${pad(d)}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invite//EN",
    "BEGIN:VEVENT",
    `UID:wedding-${ymd(Y, M, D)}@wedding-invite`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${ymd(Y, M, D)}`,
    `DTEND;VALUE=DATE:${ymd(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate())}`,
    `SUMMARY:${wedding.brideShort} & ${wedding.groomShort} Wedding`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-save-the-date.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function SaveTheDate() {
  const cells = [...Array(firstDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  return (
    <section id="date">
      <Reveal variant="zoom">
        <p className="lbl">Circle it in your calendar</p>
        <h2>Mark the Day</h2>
        <div className="card cal">
          <p className="cal-month">
            {MONTHS[M - 1]} {Y}
          </p>
          <div className="cal-grid">
            {DAYS.map((d, i) => (
              <small key={i} className="cal-h">{d}</small>
            ))}
            {cells.map((d, i) =>
              d === null ? (
                <span key={i} />
              ) : d === D ? (
                <span key={i} className="cal-d big" style={{ "--i": i }}>
                  <em className="cal-heart" aria-hidden="true">♥</em>
                  {d}
                </span>
              ) : (
                <span key={i} className="cal-d" style={{ "--i": i }}>{d}</span>
              )
            )}
          </div>
          <p className="sub" style={{ marginTop: 16 }}>{wedding.longDate}</p>
        </div>
        <button className="btn" onClick={downloadIcs}>Add to Calendar</button>
      </Reveal>
    </section>
  );
}
