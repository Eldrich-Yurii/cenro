import { Button, Select, Option } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";

export default function EditDesigModal({
  employee,
  setEditEmployeeDesignation,
  updateEmployeeDesignation,
}) {
  const [designation, setDesignation] = useState(employee.designation); // for edit designation

  console.log("DESIG:", designation)
  const modalRef = useRef(null);

  //   const navigate = useNavigate();

  useEffect(() => {
    if (employee) {
      console.log("Modal opened for:", employee); // Debugging
      setDesignation(employee.designation);
    }
  }, [employee]);

  const handleEditDesignation = async (e) => {
    e.preventDefault();

    //     try {
    //       const response = await createEmployee(formData);
    //       alert(JSON.stringify(response));
    //       navigate(0);
    //     } catch (err) {
    //       alert(err);
    //     }
  };

  // Close modal on Escape key press
  //   useEffect(() => {
  //     const handleKeyDown = (e) => {
  //       if (e.key === "Escape") {
  //         setIsOpen(false);
  //       }
  //     };
  //     document.addEventListener("keydown", handleKeyDown);
  //     return () => document.removeEventListener("keydown", handleKeyDown);
  //   }, []);

  const handleDesignation = (value) => {
    console.log("Selected Designation:", value); // Debugging
    setDesignation(value);
  };

  const handleConfirm = () => {
    updateEmployeeDesignation(employee._id, designation);
    setEditEmployeeDesignation(null); // Close the modal
  };

  return (
    <>
      {/* Modal */}
      <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
        <form onSubmit={handleEditDesignation}>
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-95 opacity-0 animate-fade-in"
          >
            <div className="grid grid-flow-row gap-2">
              <header>
                <h2 className="text-xl font-bold">Edit Employee Designation</h2>
                <IoClose
                  onClick={() => setEditEmployeeDesignation(null)}
                  className="text-xl hover:text-red-700 cursor-pointer"
                />
              </header>
              <div>
                <label htmlFor="">Designation</label>
                <br />
                <div className="w-full">
                  <Select value={designation} onChange={handleDesignation}>
                    <Option value="validator">Validator</Option>
                    <Option value="webinar coordinator">
                      Webinar Coordinator
                    </Option>
                    <Option value="inspector">Inspector</Option>
                    <Option value="chat support">Chat Support</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-red-600 hover:text-white"
                onClick={() => {
                  setEditEmployeeDesignation(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirm}
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-950"
              >
                Confirm
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

//Define Prop Types
EditDesigModal.propTypes = {
  employee: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
  }),
  setEditEmployeeDesignation: PropTypes.func.isRequired,
  updateEmployeeDesignation: PropTypes.func.isRequired,
};
