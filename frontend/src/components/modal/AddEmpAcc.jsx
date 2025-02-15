import { Button, Select, Option } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { createEmployee } from "../../api/AuthApi";
import { TbUserPlus } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

export default function AddEmpAcc() {
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("employee"); // Default to 'employee'
  const [designation, setDesignation]= useState("")
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);


  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      firstname,
      middlename,
      lastname,
      birthdate,
      email,
      password,
      confirmPassword,
      role,
      designation
    }

    if(formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await createEmployee(formData);
      alert(JSON.stringify(response))
    } catch(err) {
      alert(err)
    }

  }

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
   
    <div className="z-10">
      {/* Button to open modal */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outlined"
        className="w-42 border-blue-800 text-blue-800 py-3 rounded-lg flex justify-center items-center gap-2 font-extrabold text-sm hover:bg-blue-800 hover:text-white transition-all"
      >
        <TbUserPlus className="text-lg" />
        Add Employee
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
          <form onSubmit={handleSubmit}>
            <div
              ref={modalRef}
              className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-95 opacity-0 animate-fade-in"
            >
              <div className="grid grid-flow-row gap-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Add Employee Account</h2>
                  <IoClose
                    onClick={() => setIsOpen(false)}
                    className="text-xl hover:text-red-700 cursor-pointer"
                  />
                </div>

                <div>
                  <label htmlFor="">First Name</label>
                  <br />
                  <input
                    type="text"
                    name="firstname"
                    value={firstname}
                    placeholder="Enter Employee First Name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="">
                    Middle Name (if applicable, if not type n/a)
                  </label>
                  <br />
                  <input
                    type="text"
                    name="middlename"
                    value={middlename}
                    placeholder="Enter Employee Middle Name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="">Last Name</label>
                  <br />
                  <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    placeholder="Enter Employee Last Name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="">Birthdate</label>
                  <br />
                  <input type="date" name="birthdate" 
                  value={birthdate}
                  className="w-full" />
                </div>
                <div>
                  <label htmlFor="">Email</label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter an Email"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="">Password</label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter a Password"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="">Confirm Password</label>
                  { error && <small className="text-red-600">{error}</small>}
                  <br />
                  <input
                    type="password"
                    name="confirmpassword"
                    value={confirmPassword}
                    placeholder="Re-type Password"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="">Designation</label>
                  <br />
                  <div className="w-full">
                    <Select label="Select Designation">
                      <Option>Validator</Option>
                      <Option>Webinar Coordinator</Option>
                      <Option>Inspector</Option>
                      <Option>Chat Support</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-red-600 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-950">
                  Confirm
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
