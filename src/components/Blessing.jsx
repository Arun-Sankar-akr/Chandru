import Reveal, { Orn } from "./Reveal.jsx";

export default function Blessing() {
  return (
    <section className="bless">
      <Reveal>
        <p className="ta">மணமக்களை வாழ்த்துங்கள்</p>
        <Orn />
        <blockquote>
          Two families, one celebration.
          <br />
          We invite you to be part of the beginning of our new journey together.
        </blockquote>
      </Reveal>
    </section>
  );
}
