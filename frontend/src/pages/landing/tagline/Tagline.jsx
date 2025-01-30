import BG from "../../../assets/SANJUAN.jpg";

export default function Tagline() {
  return (
    <div className="tagline-bg">
      <img
        className="absolute w-full h-96 -z-10 object-cover object-top opacity-40 contrast-200 grayscale"
        src={BG}
        alt=""
      />
      <h3 className="text-center text-[#001A49] text-5xl font-extrabold lg:py-36 lg:px-56">
        <i>“protect and preserve the environment and its natural resources.”</i>
      </h3>
    </div>
  );
}
