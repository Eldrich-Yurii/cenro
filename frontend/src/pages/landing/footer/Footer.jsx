import { TbPhone, TbLocation, TbLink } from "react-icons/tb";
import LOGO from "../../../assets/cenro-logo.png";

export default function Footer() {
  return (
    <footer className="bg-red-700 text-white pt-12 pb-4">
      <div className="flex justify-around items-start pb-12">
        <section className="inline-flex items-center">
          <img src={LOGO} alt="" width={100} />
          <p className="w-12 font-black text-4xl leading-none">CENRO PORTAL</p>
        </section>
        <div className="flex justify-between w-7/12">
          <div>
            <div className="inline-flex gap-2 items-center pb-1">
              <TbPhone className="text-xl icon-bold" />
              <h3 className="font-extrabold text-xl">Contact Number</h3>
            </div>
            <div className="pl-7">
              <p>(02) 7729 0114</p>
              <p>(63) 967 380 5773</p>
            </div>
          </div>
          <div>
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
          </div>
          <div>
            <div className="inline-flex gap-2 items-center pb-1">
              <TbLocation className="text-xl icon-bold" />
              <h3 className="font-extrabold text-xl">Address</h3>
            </div>
            <p className="w-80 pl-7">
              City Environment and Natural Resources Office - City Government of
              San Juan, J24F+HCR, San Juan City Hall, N.Domingo Street, San
              Juan, 1500 Metro Manilaz
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <p className="text-center pt-4">
          Copyright &copy; 2025 CENRO Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
