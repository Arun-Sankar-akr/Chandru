import { useEffect, useState } from "react";
import Splash from "./components/Splash.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Blessing from "./components/Blessing.jsx";
import Couple from "./components/Couple.jsx";
import Parents from "./components/Parents.jsx";
import Celebrations from "./components/Celebrations.jsx";
import SaveTheDate from "./components/SaveTheDate.jsx";
import Venue from "./components/Venue.jsx";
import Gallery from "./components/Gallery.jsx";
import Countdown from "./components/Countdown.jsx";
import Share from "./components/Share.jsx";
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
      <Nav open={open} />
      <Hero open={open} />
      <Blessing />
      <Couple />
      <Parents />
      <Celebrations />
      <SaveTheDate />
      <Countdown />
      <Venue />
      <Gallery />
      <Share />
      <Footer />
      <Done />
    </>
  );
}
