import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/AuthApi";
import { useState, useEffect } from "react";
import { TbArrowLeft } from "react-icons/tb";
import Logo from "../../assets/CENRO-LOGO-ORIG.png";
import { Button } from "@material-tailwind/react"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (lockoutTime && Date.now() < lockoutTime) {
      const timer = setTimeout(() => {
        setLockoutTime(null);
        setLoginAttempts(0);
      }, lockoutTime - Date.now());
      return () => clearTimeout(timer);
    } else if (lockoutTime) {
      setLockoutTime(null);
      setLoginAttempts(0);
    }
  }, [lockoutTime]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (lockoutTime && Date.now() < lockoutTime) {
      setError("Account locked. Please try again later.");
      return;
    }

    try {
      const response = await loginUser( email, password );


      if (!response || !response.token) {
        console.error("Login failed: No token received");
        handleFailedLogin();
        return;
    }
    
    if (!response.role) {
      console.error("No role in response");
      handleFailedLogin();
      return;
  }
    if (!response.userId) {
      console.error("No id in response");
      handleFailedLogin();
      return;
  }

      localStorage.setItem("user", JSON.stringify(response));
      // localStorage.setItem("token", JSON.stringify(response.token));
      // console.log("login successful:", data)
      if (response.role === "admin") {
        navigate("/emp/dashboard");
      } else if (response.role === "employee") {
        navigate("/emp/dashboard");
      } else {
        navigate("/user-account");
      }
    } catch (err){
      setError("Invalid email or password");
      console.log("Login Error:", err.response?.data || err.message);
      handleFailedLogin();
    }
  };

  const handleFailedLogin = () => {
    setLoginAttempts((prevAttempts) => prevAttempts + 1);
    if (loginAttempts >= 4) {
      const lockDuration = 20 * 1000; // 20 seconds in milliseconds
      setLockoutTime(Date.now() + lockDuration);
      setLoginAttempts(0);
      setError(`Too many failed login attempts. Account locked for 20 seconds.`);
    }
  };

  const getRemainingTime = () => {
    if (lockoutTime && Date.now() < lockoutTime) {
      const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
      return `Account locked for ${remaining} seconds.`;
    }
    return "";
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
        width={230}
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
                {lockoutTime && Date.now() < lockoutTime && (
                  <p className="text-red-600">{getRemainingTime()}</p>
                )}
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
                <Button
                  type="submit"
                  className="bg-blue-900 text-white w-full h-12 font-bold text-xl rounded-lg"
                >
                  Login
                </Button>
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
