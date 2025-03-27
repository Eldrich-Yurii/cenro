import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { TbEdit } from "react-icons/tb";
import WebSchedModal from "../../../../components/modal/WebSchedModal";
import UpdateWebinar from "../../../../components/modal/UpdateWebinar";
import { getAllWebinar, updateWebinarStatus } from "../../../../api/webinarApi";
// import { deleteWebinar } from "../../../../api/webinarApi"
import { useEffect, useState } from "react";

const TABLE_HEAD = [
  "Webinar Title",
  "Date and Time",
  "Attendees",
  "Link",
  "Status",
  "Edit Time",
];

const handleUpdateStatus = async (webinarId, status, setWebinars) => {
    if (!webinarId) {
      console.log("Application ID is undefined");
      return;
    }

    try {
      const response = await updateWebinarStatus(webinarId, status);
      console.log(response);

      const updatedWebinars = await getAllWebinar();
      setWebinars(updatedWebinars);

    } catch (err) {
      console.log("Error Updating status", err);
    }
  };

// const TABLE_ROWS = [
//   {
//     id: "1",
//     title: "New Business Application",
//     datetime: "Feb 26, 2025 - 10:30 AM",
//     link: "ZOOMLINK",
//     status: "pending",
//   },
//   {
//     id: "2",
//     title: "Renewal of Business Certificate",
//     datetime: "Feb 26, 2025 - 10:30 AM",
//     link: "ZOOMLINK",
//     status: "ongoing",
//   },
// ];

export default function WebinarSched() {
  const [webinars, setWebinars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSched, setFilteredSched] = useState([]);
  const [editWebinar, setEditWebinar] = useState(null);


  useEffect(() => {
    const fetchAllWebinars = async () => {
      try {
        const data = await getAllWebinar();
        setWebinars(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllWebinars();
  }, []);

   //search function
   useEffect(() => {
    const results = webinars.filter((item) => {
      const searchStr =
        `${item.formType} ${formatDateTime(item.dateTime)} ${item.webinarLink} ${item.status}`.toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });
    setFilteredSched(results);
  }, [searchTerm, webinars]);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
  
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  // const handleDeleteWebinar = async (id) => {
  //     if(!window.confirm("Are you sure you want delete this webinar schedule?"))
  //   return;
  
  //     const user = JSON.parse(localStorage.getItem("webinar"));
  //     const token = user?.token;
  
  //     if (!token) {
  //       console.error("Token not found.");
  //     }
  
  //     try {
  //       await deleteWebinar(id, token)
        
  //       setWebinars((prevWebinar) => prevWebinar.filter((webinar) => webinar._id !== id));
  //     }catch(err) {
  //       console.error("Error deleting webinar", err);
  //     }
  //     alert("Webinar schedule deleted")
  //   }
  

  return (
    
      <Card className="max-h-[60rem] flex flex-col w-full p-4 shadow-lg">
        <CardHeader className="rounded-none flex-shrink-0" floated={false} shadow={false}>
          <div className="flex justify-between items-start">
            <section>
              <Typography
                variant="h2"
                className="text-blue-800 font-extrabold font-inter"
              >
                Webinar Schedule
              </Typography>
              <p className="w-56 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
                This is the table where you can list the webinar schedules.
              </p>
            </section>
          </div>
          <div className="w-full flex justify-between pt-2 pb-3">
            <section className="flex items-center">
              <WebSchedModal />
            </section>
            <section className="flex items-center">
              <input
                className="pl-3 h-12 border-gray-500 rounded-lg"
                type="search"
                name="empsearch"
                id="empSearch"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </section>
          </div>
        </CardHeader>
        <CardBody className=" overflow-y-auto scrollbar">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-gray-300 pb-4 pt-10"
                  >
                    <Typography
                      variant="small"
                      className="text-gray-800 font-extrabold leading-none font-inter"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSched.map(
                ({ _id, formType, dateTime, status, maxAttendees, attendees, webinarLink }) => {
                  const isLast = _id === webinars.length - 1;
                  const classes = isLast
                    ? "py-4"
                    : "py-4 border-b border-gray-300";

                  return (
                    <tr key={_id} className="hover:bg-gray-50">
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-bold text-gray-600"
                        >
                          {formType}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {formatDateTime(dateTime)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-bold text-gray-600"
                        >
                         {attendees.length} / {maxAttendees}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-bold text-gray-600"
                        >
                         {webinarLink}
                        </Typography>
                      </td>
                      <td className={classes}>
                      <div className="w-max">
                        <span
                        >
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to mark this as Scheduled?"
                                  )
                                ) {
                                  handleUpdateStatus(_id, "Scheduled", setWebinars);
                                }
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                status === "Scheduled"
                                  ? "bg-red-200 text-red-700"
                                  : "bg-gray-300 text-gray-700"
                              }`}
                              disabled={status === "Scheduled"}
                            >
                              Scheduled
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to mark this as Ongoing?"
                                  )
                                ) {
                                  handleUpdateStatus(_id, "Ongoing", setWebinars);
                                }
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                status === "Ongoing"
                                  ? "bg-yellow-200 text-yellow-700"
                                  : "bg-gray-300 text-gray-700"
                              }`}
                              disabled={status === "Ongoing"}
                            >
                              Ongoing
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want mark this as Done?"
                                  )
                                ) {
                                  handleUpdateStatus(_id, "Done", setWebinars);
                                }
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                status === "Done"
                                  ? "bg-green-200 text-green-700"
                                  : "bg-gray-300 text-gray-700"
                              }`}
                              disabled={status === "Done"}
                            >
                              Done
                            </button>
                          </div>
                        </span>
                      </div>
                    </td>
                      <td className="border-b border-gray-300">
                        <div className="flex gap-4">
                          <Button
                            variant="outlined"
                            className="px-2 py-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
                            onClick={() => setEditWebinar({ _id, dateTime, })}
                          >
                            <TbEdit />
                          </Button>
                          </div>
                          </td>
                          <td classname="border-b border-gray-300">

                          
                          </td>
                          
                          {/* <td classname="border-b border-gray-300">
                          <Typography
                              variant="small"
                              className={`font-bold uppercase text-xs rounded-lg ${
                                status === "Ongoing"
                                  ? "bg-yellow-200 text-orange-600"
                                  : status === "Done"
                                  ? "bg-blue-200 text-blue-800"
                                  : "bg-gray-100 text-gray-700"
                              } px-3 py-2 inline-block`}
                            >
                              {status}
                            </Typography>
                          
                          </td> */}
                          {/* <Button
                            variant="outlined"onClick={() => handleDeleteWebinar(_id)}
                            className="px-2 py-2 border-red-800 text-red-800  hover:bg-red-800 hover:text-white"
                          >
                            <TbTrash />
                          </Button> */}
                      
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        {editWebinar && (
        <UpdateWebinar
          webinar={editWebinar}
          setEditWebinar={setEditWebinar}
          setWebinars={setWebinars}
        />
      )}
      </Card>
  );
}
