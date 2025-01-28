import HeroNavBar from "../navbar/HeroNavBar";
import Services from "../servicesSection/Services";
import BG from "../../../assets/cenro-bg.jpg";

export default function Hero() {
  return (
    <div>
      {/* Navigation Bar */}
      <HeroNavBar />
      {/* Hero Section */}
      <div>
        <img
          className="h-screen w-full contrast-80 brightness-75"
          src={BG}
          alt="cenro"
        />
        {/* gradient layer */}
        <div className="absolute top-0 h-screen w-full bg-gradient-to-r from-black to-transparent opacity-95"></div>
        
        {/* title, desciption container */}
        <div className="absolute top-48 z-10 text-white pl-[4.5rem]">
          <p className="text-2xl font-semibold">Welcome to San Juan,</p>
          <h1 className="text-[72px] font-black">CENRO PORTAL</h1>
          <p className="text-2xl font-semibold w-[25rem] pb-7">
            Process documents and track your document status more easily.
          </p>
          <button className="bg-red-700 rounded-md px-[18px] py-2 text-2xl font-extrabold tracking-wide">
            Get Started
          </button>
        </div>
      </div>
      {/* import ng services */}
      <Services />
    </div>
  );
}
