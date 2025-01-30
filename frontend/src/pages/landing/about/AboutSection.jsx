import Sanjuan from "../../../assets/SANJUAN.jpg";

export default function About() {
  return (
    // grid form na template two columns

    <div className="flex justify-between gap-4 lg:px-[4.5rem] lg:pt-48">
      {/* container ng image ng san juan */}
      <section className="w-[39rem]">
        <img className="rounded-xl" src={Sanjuan} alt="sanjuan-munisipyo" />
      </section>

      {/* container ng title at description */}
      <section className="pl-4 font-semibold w-[40rem]">
        <div>
          <h2 className="font-extrabold text-[#C1111F] text-3xl pb-4">ABOUT</h2>
        </div>
        <div>
          <p className="leading-[160%] text-[20px] font-semibold text-gray-900">
            The City Environment and Natural Resources Office (CENRO) supports
            the Sangguniang Panlungsod and the city mayor in ensuring the
            delivery of environmental services and facilities, as mandated by
            the Local Government Code under section 17 of 1991 and Republic Act
            No. 9388. CENRO develops and implements environment-related programs
            and projects, and coordinates with government and non-government
            organizations to prevent and control land, air, and water pollution.
          </p>
        </div>
      </section>
    </div>
  );
}
