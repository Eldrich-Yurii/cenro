import { TbPhone, TbLocation, TbLink } from "react-icons/tb";
import LOGO from "../../../assets/cenro-logo.png";
import LOGOORIG from "../../../assets/CENRO-LOGO-ORIG.png"
import BagongPhilOrig from "../../../assets/Bagong-Pilipinas.png";
import BagongPhilWhite from "../../../assets/Logo-Bagong-Pilipinas.png";
import SanJuanWhite from "../../../assets/makabagong-san-juan-logo.png";
import SanJuanOrig from "../../../assets/makabagong-sanjuan-logo.png";
import SealWhite from "../../../assets/San-Juan-City-Seal.png";
import SealOrig from "../../../assets/SanJuanCity-Seal.png";

export default function Footer() {
  return (
    <footer className="bg-red-700 text-[#EBFADC] pt-12 pb-4">
      <div className="flex justify-around items-start pb-12">
        <div className="grid grid-cols-1">
          <section className="inline-flex items-center">
            <div className="grid grid-cols-1">
            <p className="w-80 font-black text-6xl tracking-wider uppercase">
              Cenro
              <br />
            </p>
              <small className="uppercase font-light text-sm tracking-[0.6rem]">san juan city</small>
            </div>
          </section>
          <section className="flex gap-2 pt-2">
            {/* <img src={LOGO} alt="" width={50} />
            <img src={SanJuanWhite} alt="" width={50} />
            <img src={BagongPhilWhite} alt="" width={50} />
            <img src={SealWhite} alt="" width={50} /> */}
            <img src={LOGOORIG} alt="" width={50} />
            <img src={SanJuanOrig} alt="" width={50} />
            <img src={BagongPhilOrig} alt="" width={50} />
            <img src={SealOrig} alt="" width={50} />
          </section>
        </div>
        <div className="flex justify-between w-7/12">
          <section>
            <div className="inline-flex gap-2 items-center pb-1">
              <TbPhone className="text-xl icon-bold" />
              <h3 className="font-extrabold text-xl">Contact Number</h3>
            </div>
            <div className="pl-7 pb-2">
              <p>(63) 939 717 2394</p>
              <p>(63) 967 380 5773</p>
            </div>
          </section>
          <section>
            <div className="inline-flex gap-2 items-center pb-1">
              <TbLink className="text-xl icon-bold" />
              <h3 className="font-extrabold text-xl">Quick Links</h3>
            </div>
            <ul className="pl-7">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Log In</a>
              </li>
              <li>
                <a href="#">Sign Up</a>
              </li>
            </ul>
          </section>
          <section>
            <div className="inline-flex gap-2 items-center pb-1">
              <TbLocation className="text-xl icon-bold" />
              <h3 className="font-extrabold text-xl">Address</h3>
            </div>
            <address className="w-80 pl-7">
              137-135 Pinaglabanan Street, cor Dr.P.A. Narciso, San Juan, Metro
              Manila lower Ground Floor Cenro Office
            </address>
          </section>
        </div>
      </div>
      <div className="px-8">
        <hr />
      </div>
      <div>
        <p className="text-center pt-4">
          Copyright &copy; 2025 CENRO Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
