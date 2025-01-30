import ServicesCards from "./ServicesCards";

export default function Services() {
  return (
    // services container
    <div className="bg-red-700 h-[15rem] pt-8 text-3xl text-[#EBFADC]">
      <p className="font-extrabold text-center">SERVICES WE OFFER</p>
      <ServicesCards />
    </div>
  );
}
