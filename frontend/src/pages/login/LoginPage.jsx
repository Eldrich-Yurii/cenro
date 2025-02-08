import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/AuthApi";
import { useState } from "react";
import { TbArrowLeft } from "react-icons/tb";
import Logo from "../../assets/cenro-logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser( email, password );


      if (!response || !response.token) {
        console.error("Login failed: No token received");
        return;
    }
    
    if (!response.role) {
      console.error("No role in response");
      return;
  }

      localStorage.setItem("user", JSON.stringify(response));
      // console.log("login successful:", data)
      if (response.role === "admin") {
        navigate("/admin/dashboard");
      } else if (response.role === "employee") {
        navigate("/employeedashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err){
      setError("Invalid email or password");
      console.log("Login Error:", err.response?.data || err.message)
    }
  };

  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  // };

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
        <section className="flex flex-col justify-center items-center px-2">
          <form onSubmit={handleLogin}>
            <div className="w-[34rem]">
              <div className="w-[25rem] pb-8 text-blue-900">
                <h2 className="font-black text-5xl pb-2 leading-[100%]">
                  LOGIN TO YOUR ACCOUNT
                </h2>
                <p className="text-lg font-medium w-56 leading-[120%]">
                  Please fill out the form to log in.
                </p>
              </div>
              <div>
                {error && <p className="text-red-600">{error}</p>}
                <div className="pb-8 flex flex-col gap-2">
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
                    placeholder="Enter your email..."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                  />
                </div>
                <div className="pb-8 flex flex-col gap-2">
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
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                  />
                  <p className="text-end text-blue-900">Forgot Password?</p>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-900 text-white w-full h-12 font-bold text-xl rounded-lg"
                >
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
          </form>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
