import { Button } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { TbVideo } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

export default function WebSchedModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

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

  // Click outside to close modal
  // useEffect(() => {
  //     const handleClickOutside = (event) => {
  //         if (modalRef.current && !modalRef.current.contains(event.target)) {
  //             setIsOpen(false);
  //         }
  //     };
  //     if (isOpen) {
  //         document.addEventListener("mousedown", handleClickOutside);
  //     }
  //     return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [isOpen]);

  return (
    <div className="z-10">
      {/* Button to open modal */}
      <Button
        variant="outlined"
        onClick={() => setIsOpen(true)}
        className="w-42 border-blue-800 text-blue-800 py-3 rounded-lg flex justify-center items-center gap-2 font-extrabold text-sm hover:bg-blue-800 hover:text-white transition-all font-inter"
      >
        <TbVideo className="text-lg" />
        Schedule a Webinar
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-95 opacity-0 animate-fade-in"
          >
            <div className="grid grid-flow-row gap-2">
                <div className="flex justify-between items-center">

              <h2 className="text-xl font-bold">Scedule A Webinar</h2>
              <IoClose onClick={() => setIsOpen(false)} className="text-xl hover:text-red-700 cursor-pointer"/>
                </div>
              <div>

              <label htmlFor="">Webinar Title</label><br />
              <input type="text" placeholder="Enter Webinar Title" className="w-full"/>
              </div>
              <div>

              <label htmlFor="">Date and Time</label><br />
              <input type="datetime-local" className="w-full"/>
              </div>
              <div>

              <label htmlFor="">Webinar Link</label><br />
              <input type="text" placeholder="Paste your Webinar Link here"  className="w-full"/>
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
        </div>
      )}
    </div>
  );
}
