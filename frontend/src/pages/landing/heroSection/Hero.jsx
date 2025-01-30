import HeroNavBar from "../navbar/HeroNavBar";
import Services from "../servicesSection/Services";
import BG from "../../../assets/cenroBg.jpg";

export default function Hero() {
  return (
    <div>
      {/* Navigation Bar */}
      <HeroNavBar />
      {/* Hero Section */}
      <div>
        <div>
          <img className="h-screen w-full brightness-75" src={BG} alt="cenro" />
          {/* gradient layer */}
          {/* title, desciption container */}
          <div className="absolute top-1/2 transform -translate-y-1/2 z-10 text-white px-[4.5rem]">
            <p className="text-2xl font-semibold">Welcome to San Juan,</p>
            <h1 className="text-7xl font-black">CENRO PORTAL</h1>
            <p className="text-lg w-[23rem] pb-7 leading-[120%]">
              Process documents and track your document status more easily.
            </p>
            <button className="bg-red-700 rounded-md px-[18px] py-2 text-2xl hover:bg-red-800 font-extrabold tracking-wide ">
              Get Started
            </button>
          </div>
          <div className="absolute top-0 h-screen w-full bg-gradient-to-r from-black to-transparent opacity-95"></div>
        </div>
      </div>
      {/* import ng services */}
      <Services />
    </div>
  );
}
