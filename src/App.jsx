import { useEffect, useState } from "react";
import Splash from "./components/Splash.jsx";
import Hero from "./components/Hero.jsx";
import Parents from "./components/Parents.jsx";
import Celebrations from "./components/Celebrations.jsx";
import SaveTheDate from "./components/SaveTheDate.jsx";
import Venue from "./components/Venue.jsx";
import Gallery from "./components/Gallery.jsx";
import Countdown from "./components/Countdown.jsx";
import Footer from "./components/Footer.jsx";
import Done from "./components/Done.jsx";

export default function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    window.scrollTo(0, 0);
  }, [open]);

  return (
    <>
      <Splash open={open} onOpen={() => setOpen(true)} />
      <Hero open={open} />
      <Parents />
      <Celebrations />
      <SaveTheDate />
      <Venue />
      <Gallery />
      <Countdown />
      <Footer />
      <Done/>
    </>
  );
}
