// Small credit bar at the very bottom. The whole phrase "Crafted with ASR" is one link.
export default function Done() {
  return (
    <div className="cont">
      <a
        className="credit"
        href="https://arunakr.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Crafted with ASR, opens arunakr.vercel.app/"
      >
        Crafted with <span>ASR</span>
      </a>
    </div>
  );
}
