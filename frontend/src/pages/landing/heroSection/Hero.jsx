// import HeroNavBar from "../navbar/HeroNavBar";
import Services from "../servicesSection/Services";
import BG from "../../../assets/cenroBg.jpg";
import { Link } from "react-router-dom";


export default function Hero() {
  return (
    <section id="home">
      {/* Hero Section */}
      <div>
        <div>
          <img className="h-screen w-full brightness-75" src={BG} alt="cenro" />
          {/* title, desciption container */}
          <div className="absolute top-1/2 transform -translate-y-1/2 z-10 text-[#EBFADC] px-[4.5rem]">
            <p className="text-2xl font-semibold">Welcome to San Juan,</p>
            <h1 className="text-7xl font-black w-[48rem]">CENRO BUSINESS CERTIFICATION</h1>
            <p className="text-lg w-[23rem] pb-7 leading-[120%]">
              Process your new business certification and renewal here on our website.
            </p>
            <Link to="/login" className="bg-[#C1111F] rounded-md px-[18px] py-2 text-2xl hover:bg-red-900 font-extrabold tracking-wide uppercase">
              Get Started
            </Link>
          </div>
          {/* gradient layer */}
          <div className="absolute top-0 h-screen w-full bg-gradient-to-r from-black to-transparent opacity-95"></div>
        </div>
      </div>
      {/* import ng services */}
      <Services />
    </section>
  );
}
