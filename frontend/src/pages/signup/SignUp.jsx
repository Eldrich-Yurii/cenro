import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/AuthApi";
import { TbArrowLeft } from "react-icons/tb";
import Logo from "../../assets/cenro-logo.png";
import { Button } from "@material-tailwind/react";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("user"); // Default to 'user'
  const [error, setError] = useState(null);

  // Address fields
  const [housenumber, setHousenumber] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("San Juan City"); // Fixed value

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const address =
      housenumber && street && barangay && city
        ? {
            housenumber,
            street,
            barangay,
            city,
          }
        : null; // Or you can leave out the address field if not fully filled.

    const formData = {
      firstname,
      middlename,
      lastname,
      birthdate,
      email,
      password,
      confirmPassword,
      role, // Make sure role is included
      address, // Will only include address if it's fully filled
    };

    if (formData.password !== formData.confirmPassword) {
      // alert("Passwords do not match");
      setError("Password does not match");
      return;
    }

    try {
      // const { confirmPassword, ...userData} = formData
      const message = await registerUser(formData);
      alert(JSON.stringify(message));
      navigate("/login") // show success message
    } catch (err) {
      alert(err); // show error message
    }
  };

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
          <form onSubmit={handleSubmit}>
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
                  <label
                    className="font-semibold text-blue-900"
                    htmlFor="firstname"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Enter your first Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    className="border-blue-900 border-2 w-full h-12 rounded-lg px-2 truncate"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-semibold text-blue-900"
                    htmlFor="middlename"
                  >
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middlename"
                    name="middlename"
                    placeholder="Enter your Middle Name"
                    value={middlename}
                    onChange={(e) => setMiddlename(e.target.value)}
                    required
                    className="border-blue-900 border-2 w-full h-12 rounded-lg px-2 truncate"
                  />
                </div>
                <div className="pb-2 flex flex-col gap-2">
                  <label
                    className="font-semibold text-blue-900"
                    htmlFor="lastname"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Enter your Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
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
                  id="birthdate"
                  name="birthdate"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
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
                    id="housenumber"
                    name="housenumber"
                    placeholder="House No."
                    value={housenumber}
                    onChange={(e) => setHousenumber(e.target.value)}
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
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
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
                    id="barangay"
                    name="barangay"
                    placeholder="Barangay"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                    required
                    className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                  />
                </div>
              </div>
              {/* Fixed City */}
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-blue-900 border-2 w-full h-12 rounded-lg pl-2"
                    />
                  </div>
                </div>
                <div className="pb-8 flex flex-col gap-2">
                  <label
                    className="font-semibold text-blue-900"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  { error && <small className="text-red-600">{error}</small>}
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-type your Password..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  className={`border-blue-900 border-2 w-full h-12 rounded-lg pl-2 ${error ? "border-red-600" : ""}`}
                  />
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="bg-blue-900 text-white w-full h-12 font-bold text-xl rounded-lg hover:bg-blue-500"
                >
                  Create an Account
                </Button>
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
          </form>
        </section>
      </div>
    </div>
  );
}
