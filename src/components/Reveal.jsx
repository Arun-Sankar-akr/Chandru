import { useEffect, useRef } from "react";

// variant: "up" (default) | "left" | "right" | "zoom"
export default function Reveal({ children, className = "", variant = "up" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const o = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            o.disconnect();
          }
        }),
      { threshold: 0.12 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={`rv ${variant} ${className}`}>
      {children}
    </div>
  );
}

export const Orn = () => (
  <div className="orn">
    <span>❖</span>
  </div>
);
