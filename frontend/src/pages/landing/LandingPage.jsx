import HeroNavBar from "../navbar/HeroNavBar";
import Hero from "./heroSection/Hero";
import About from "./about/AboutSection";
import Contact from "./contact/Contact";
import Tagline from "./tagline/Tagline";
import Footer from "./footer/Footer";

export default function LandingPage() {
  return (
    // landing page container
    <div className="font-inter">
      <Hero />
      <About />
      <Contact />
      <Tagline />
      <Footer />
    </div>
  );
}
