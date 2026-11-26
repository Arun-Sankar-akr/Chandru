import { useEffect, useState } from "react";

// true on laptop/desktop screens (900px and wider)
export default function useWide() {
  const q = "(min-width:900px)";
  const [wide, setWide] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const f = () => setWide(m.matches);
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return wide;
}
