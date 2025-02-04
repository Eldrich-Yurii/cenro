import { Link } from "react-router-dom";
import { TbArrowLeft } from "react-icons/tb";
import Logo from "../../assets/cenro-logo.png";

export default function SignUp() {
  return (
    <div className="font-inter w-full">
      <nav className="absolute left-4 top-4 z-20">
        <Link to="/">
          <TbArrowLeft className="text-3xl text-white" />
        </Link>
      </nav>
      <img
        className="absolute top-4 left-4 opacity-90 z-10"
        src={Logo}
        alt="cenro-logo"
        width={180}
      />
      <div className="grid grid-cols-2 h-screen">
        <section className="login-pic w-full brightness-75 contrast-125"></section>

        <section className="flex flex-col justify-center items-center bg-gray-200">
          {/* Create an Account Form */}
          <div className="w-[32rem] h-[34rem] py-12 px-10 overflow-y-auto scrollbar border-2 border-gray-300 rounded-xl outline-offset-4 bg-white shadow-2xl">
            <div className="w-[25rem] pb-8 text-blue-900">
              <h2 className="font-black text-5xl pb-2 leading-[100%]">
                CREATE AN ACCOUNT
              </h2>
              <p className="text-lg font-medium w-64 leading-[120%]">
                Please fill out the form to create an account.
              </p>
            </div>
            {/* Full Name */}
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-blue-900" htmlFor="fName">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Enter your first Name"
                  required
                  className="border-blue-900 border-2 w-full h-12 rounded-lg px-2 truncate"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-blue-900" htmlFor="mName">
                  Middle Name
                </label>
                <input
                  type="text"
                  id="mname"
                  name="mname"
                  placeholder="Enter your Middle Name"
                  required
                  className="border-blue-900 border-2 w-full h-12 rounded-lg px-2 truncate"
                />
              </div>
              <div className="pb-2 flex flex-col gap-2">
                <label className="font-semibold text-blue-900" htmlFor="lName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Enter your Last Name"
                  required
                  className="border-blue-900 border-2 w-full h-12 rounded-lg px-2 truncate"
                />
              </div>
            </div>
            {/* Birth Date */}
            <div className="pb-3 flex flex-col gap-2">
              <label className="font-semibold text-blue-900" htmlFor="bdate">
                Birth Date
              </label>
              <input
                type="date"
                id="bdate"
                name="bdate"
                required
                className="border-blue-900 border-2 w-full h-12 rounded-lg px-2"
              />
            </div>
            {/* Address */}
            <label className="font-semibold text-blue-900" htmlFor="">
              Address
            </label>
            <div className="pt-2 grid grid-cols-3 gap-2">
              <div className="pb-2">
                <input
                  type="text"
                  id="house"
                  name="house"
                  placeholder="House No."
                  required
                  className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                />
              </div>
              <div>
                {/* <label className="font-semibold text-blue-900" htmlFor="mName">
                  Middle Name
                </label> */}
                <input
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Street"
                  required
                  className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                />
              </div>
              <div>
                {/* <label className="font-semibold text-blue-900" htmlFor="lName">
                  Last Name
                </label> */}
                <input
                  type="text"
                  id="brgy"
                  name="brgy"
                  placeholder="Barangay"
                  required
                  className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                />
              </div>
            </div>
            <input
              type="text"
              id="city"
              name="city"
              // value="San Juan"
              required
              className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
            />
            {/* Account credentials */}
            <div className="pt-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-blue-900"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter an Email..."
                    required
                    className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                  />
                </div>
                <div className="pb-2 flex flex-col gap-2">
                  <label
                    className="font-semibold text-blue-900"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter a Password..."
                    required
                    className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                  />
                </div>
              </div>
              <div className="pb-8 flex flex-col gap-2">
                <label
                  className="font-semibold text-blue-900"
                  htmlFor="cpassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  placeholder="Re-type your Password..."
                  required
                  className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                />
              </div>
            </div>
            <div>
              <button className="bg-blue-900 text-white w-full h-12 font-bold text-xl rounded-lg hover:bg-blue-500">
                Create an Account
              </button>
            </div>
            <div>
              <p className="text-lg font-semibold text-center pt-8">
                Already have an account?
                <Link to="/login" className="underline text-blue-900">
                  Login Now
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
