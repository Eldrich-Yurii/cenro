import { Button } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { TbVideo } from "react-icons/tb";

export default function WebSchedModal() {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
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
        <div className="flex flex-col items-center justify-center z-10">
            <Button variant="outlined" onClick={() => setIsOpen(true)} className="w-42 border-blue-800 text-blue-800 py-3 rounded-lg flex justify-center items-center gap-2 font-extrabold text-sm hover:bg-blue-800 hover:text-white transition-all">
                <TbVideo className="text-lg" />
                Schedule a Webinar
              </Button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
                    <div
                        ref={modalRef}
                        className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-95 opacity-0 animate-fade-in"
                    >
                        <div className="grid grid-flow-row">
                        <h2 className="text-xl font-bold mb-4">Scedule A Webinar</h2>

                        <label htmlFor="">label</label>
                        <input type="text" />
                        <label htmlFor="">label</label>
                        <input type="datetime-local" />
                        <label htmlFor="">label</label>
                        <input type="text" />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={() => setIsOpen(false)}>
                                Close
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}