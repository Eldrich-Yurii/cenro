import { Link } from "react-router-dom";
import { TbArrowLeft } from "react-icons/tb";

export default function LoginPage() {
  return (
    <div className="font-inter w-full">
      <nav className="absolute">
        <Link to="/">
          <TbArrowLeft />
        </Link>
      </nav>
      <div className="grid grid-cols-2 h-screen">
        <section className="login-pic w-full">
          <img src="" alt="" />
        </section>
        <section className="flex flex-col justify-center items-center px-2">
          <div className="w-[30rem]">
            <div className="w-[25rem] pb-8 text-blue-900">
              <h2 className="font-black text-5xl pb-2 leading-[100%]">
                LOGIN TO YOUR ACCOUNT
              </h2>
              <p className="text-lg font-semibold w-56 leading-[120%]">
                Please fill out the form to log in.
              </p>
            </div>
            <div>
              <div className="pb-8 flex flex-col gap-2">
                <label className="font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                />
              </div>
              <div className="pb-8 flex flex-col gap-2">
                <label className="font-medium" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                />
                <p className="text-end">Forgot Password?</p>
              </div>
            </div>
            <div>
              <button className="bg-blue-900 text-white w-full h-12 font-bold text-xl rounded-lg">
                Login
              </button>
            </div>
            <div>
              <p className="text-lg font-semibold text-center pt-8">
                Don&apos;t have an account?
                <Link to="/signup" className="underline text-blue-900">
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
