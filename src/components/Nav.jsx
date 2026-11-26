import { useEffect, useState } from "react";

const links = [
  ["couple", "Couple"],
  ["schedule", "Schedule"],
  ["date", "Date"],
  ["venue", "Venue"],
  ["gallery", "Gallery"],
];

export default function Nav({ open }) {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!open) return;
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.6);
      let cur = "";
      for (const [id] of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <nav className={"nav" + (open && show ? " show" : "")} aria-label="Sections">
      {links.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={active === id ? "on" : ""}>
          {label}
        </a>
      ))}
    </nav>
  );
}
