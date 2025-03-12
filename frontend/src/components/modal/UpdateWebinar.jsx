import { Button, Input } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { updateWebinar } from "../../api/webinarApi";

export default function UpdateWebinar({
  webinar,
  setEditWebinar,
  setWebinars, // Add this prop to update the webinar list after edit
}) {
  const [dateTime, setDateTime] = useState(webinar.dateTime);
  const [webinarLink, setWebinarLink] = useState(webinar.webinarLink);
  const modalRef = useRef(null);

  useEffect(() => {
    if (webinar) {
      setDateTime(webinar.dateTime);
      setWebinarLink(webinar.webinarLink);
    }
  }, [webinar]);

  const handleUpdateWebinar = async (e) => {
    e.preventDefault();
    try {
      const updatedWebinarData = await updateWebinar(webinar._id, dateTime, webinarLink);
      setWebinars((prevWebinars) =>
        prevWebinars.map((item) =>
          item._id === webinar._id ? updatedWebinarData.updatedWebinar : item
        )
      );
      setEditWebinar(null); // Close the modal
      alert("Webinar Updated");
    } catch (err) {
      alert("Error updating webinar: " + err.message);
    }
  };

  return (
    <>
      <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
        <form onSubmit={handleUpdateWebinar}>
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-95 opacity-0 animate-fade-in"
          >
            <div className="grid grid-flow-row gap-2">
              <header className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Edit Webinar</h2>
                <IoClose
                  onClick={() => setEditWebinar(null)}
                  className="text-xl hover:text-red-700 cursor-pointer"
                />
              </header>
              <div>
                <label htmlFor="dateTime">Date and Time</label>
                <Input
                  type="datetime-local"
                  value={dateTime ? new Date(dateTime).toISOString().slice(0, 16) : ""}
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="webinarLink">Webinar Link</label>
                <Input
                  type="text"
                  value={webinarLink}
                  onChange={(e) => setWebinarLink(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-red-600 hover:text-white"
                onClick={() => setEditWebinar(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-950"
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

UpdateWebinar.propTypes = {
  webinar: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    webinarLink: PropTypes.string.isRequired,
  }),
  setEditWebinar: PropTypes.func.isRequired,
  setWebinars: PropTypes.func.isRequired,
};