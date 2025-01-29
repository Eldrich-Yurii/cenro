import LOGO from "../../../assets/cenro-logo.png";

export default function Footer() {
  return (
    <footer className="bg-red-700 text-white pt-12 pb-4">
      <div className="flex justify-around items-start pb-12">
        <div className="inline-flex items-center">
          <img src={LOGO} alt="" width={100} />
          <p className="w-12 font-black text-3xl leading-none">CENRO PORTAL</p>
        </div>
        <div>
          <h3 className="font-extrabold text-lg pb-1">Contact Number</h3>
          <p>(02) 7729 0114</p>
          <p>(63) 967 380 5773</p>
        </div>
        <div>
          <h3 className="font-extrabold text-lg pb-1">Quick Links</h3>
          <ul>
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
          <h3 className="font-extrabold text-lg pb-1">Address</h3>
          <p className="w-80">
            City Environment and Natural Resources Office - City Government of
            San Juan, J24F+HCR, San Juan City Hall, N.Domingo Street, San Juan,
            1500 Metro Manilaz
          </p>
        </div>
      </div>
      <hr />
      <div>
        <p className="text-center pt-4">Copyright &copy; 2025 CENRO Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}
