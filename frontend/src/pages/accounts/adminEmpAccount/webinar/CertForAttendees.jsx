import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { TbEye } from "react-icons/tb";
import {
  confirmAttendance,
  getPendingWebinarUsers,
  viewPostTest,
  viewPreTest,
} from "../../../../api/ApplicationApi";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";


const TABLE_HEAD = ["Account Number", "Business Name", "Pre Test", "Post Test", "Action"];

export default function CertForAttendees() {
  const [webinarAttendees, setWebinarAttendees] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        if (!token) {
          console.error("Token not found.");
          return;
        }
        const data = await getPendingWebinarUsers(token);
        setWebinarAttendees(data);
      } catch (error) {
        console.error("Error fetching pending webinar users:", error);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleConfirmAttendance = async (applicationId) => {
    try {
      const response = await confirmAttendance(applicationId);
      setWebinarAttendees((prev) =>
        prev.filter((attendee) => attendee._id !== applicationId)
      );
      console.log(response.message); // Show success message
    } catch (err) {
      console.log("Error generating certificate", err);
    }
  };

  const handleViewPreTest = async (applicationId) => {
    try {
      const fileData = await viewPreTest(applicationId);

      // create a blob URL for the file
      const blob = new Blob([fileData], { type: fileData.type });
      const blobUrl = URL.createObjectURL(blob);

      setFileUrl(blobUrl);
      
      setFileType(fileData.type);
      setIsModalOpen(true);
    } catch (err) {
      console.log("Error fetching file", err);
    }
  };

  const handleViewPostTest = async (applicationId) => {
      try {
        const fileData = await viewPostTest(applicationId);
  
        // create a blob URL for the file
        const blob = new Blob([fileData], { type: fileData.type });
        const blobUrl = URL.createObjectURL(blob);
  
        setFileUrl(blobUrl);
        
        setFileType(fileData.type);
        setIsModalOpen(true);
      } catch (err) {
        console.log("Error fetching file", err);
      }
    };

  return (
    <Card className="max-h-[60rem] w-full px-6 shadow-lg">
      <CardHeader
        className="rounded-none flex-shrink-0"
        floated={false}
        shadow={false}
      >
        <div className=" flex justify-between items-start">
          <section>
            <Typography variant="h2" className="text-blue-800 font-extrabold">
              Generate Certificates
            </Typography>
            <p className="w-72 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              This is the list of Cenro Clients that attended the
              Webinar and submitted the Pre and Post Tests.
            </p>
          </section>
          <section className="flex items-center">
            <input
              className="pl-3 h-12 border-gray-500 rounded-lg"
              type="search"
              name="certSearch"
              id="certSearch"
              placeholder="Search..."
            />
          </section>
        </div>
      </CardHeader>
      <CardBody className="overflow-y-auto scrollbar">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-gray-300 pb-4 pt-10">
                  <div className="flex items-center">
                    <Typography
                      variant="small"
                      className="text-gray-800 font-extrabold leading-none"
                    >
                      {head}
                    </Typography>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {webinarAttendees.length === 0 ? <tr>
              <td colSpan={12} className="text-center p-4 font-bold">
                No attendees found
              </td>
            </tr> : webinarAttendees.map(({ _id, businessName, accountNumber }) => {
              const isLast = _id === webinarAttendees.length - 1;
              const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

              return (
                <tr key={_id} className="hover:bg-gray-50">
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {accountNumber}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {businessName}
                    </Typography>
                  </td>
                  <td className={classes}>
                  <button className="border border-blue-800 text-blue-800 p-2 rounded-lg"
                  onClick={() => handleViewPreTest(_id)}>
                    <TbEye />
                    </button>
                  </td>
                  <td className={classes}>
                    <button className="border border-blue-800 text-blue-800 p-2 rounded-lg"
                    onClick={() => handleViewPostTest(_id)}>
                      
                    <TbEye />
                    </button>
                  </td>
                  
                  {/* <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {lastname}
                        </Typography>
                      </td> */}
                  {/* <td className={classes}>
                        <div className="w-max">
                          <span
                            className={`px-3 py-2 font-extrabold uppercase text-xs rounded-lg ${
                              status === "certificate generated"
                                ? "bg-lime-200 text-lime-800"
                                : status === "pending"
                                ? "bg-yellow-200 text-orange-600"
                                : "bg-red-200 text-red-600"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      </td> */}
                  <td className="border-b border-gray-300">
                    <Button onClick={() => handleConfirmAttendance(_id)}>
                      Confirm Attendance
                    </Button>
                    {/* <div className="flex gap-4">
                          <Menu>
                            <MenuHandler>
                              <Button
                                variant="outlined"
                                className="px-2 py-2 border-gray-200 text-blue-800 hover:bg-blue-800 hover:text-white"
                              >
                                <TbDots />
                              </Button>
                            </MenuHandler>
                            <MenuList className="text-start p-2">
                              <MenuItem className="pt-2 hover:bg-blue-50">
                                View COA
                              </MenuItem>
                              <MenuItem className="pt-2 hover:bg-blue-50">
                                Approve
                              </MenuItem>
                              <MenuItem className="pt-2 hover:bg-blue-50">
                                Reject
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </div> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isModalOpen && (
                    <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-5 rounded-lg shadow-lg w-[80%] h-[80%] flex flex-col">
                        <div className="flex justify-between">
                          <h2 className="text-xl font-bold mb-2">
                            Screenshot Verification
                          </h2>
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-2xl"
                          >
                            <IoClose />
                          </button>
                        </div>
                        <iframe src={fileUrl} className="w-full h-full border" />
                      </div>
                    </div>
        )}
      </CardBody>
      
    </Card>
  );
}
