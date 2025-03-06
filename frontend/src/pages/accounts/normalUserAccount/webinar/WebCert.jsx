import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { getUserApplication, viewCertificateOfAttendance } from "../../../../api/ApplicationApi";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const TABLE_HEAD = ["Application Type", "Business Name", "Certficate Of Attendace", "Action"];
export default function WebCert() {
  const [applications, setApplications] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        console.error("Token not found.");
        return;
      }

      try {
        const data = await getUserApplication(token);
        setApplications(data);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchTickets();
  }, []);

  const handleViewCertAttendance = async (applicationId) => {
    try {
      const fileData = await viewCertificateOfAttendance(applicationId);

      // create a blob URL for the file
      const blob = new Blob([fileData], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);

      setFileUrl(blobUrl);
      setIsModalOpen(true);
    } catch (err) {
      console.log("Error fetching file", err);
    }
  };

  return (
    <div className="h-screen">
      <Card className="h-[32rem] w-full px-6 shadow-lg">
        <CardHeader className="rounded-none" floated={false} shadow={false}>
          <div className=" flex justify-between">
            <section>
              <Typography
                variant="h2"
                className="text-blue-800 font-extrabold font-inter"
              >
                My Business Application
              </Typography>
              <p className="w-64 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
                This is the list of applications you submitted.
              </p>
            </section>
            <section className="flex flex-col gap-2 items-end">
              Lagyan ng search siguro
            </section>
          </div>
        </CardHeader>
        <br />
        <CardBody>
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
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="12" className="text-center pt-4">
                    No Certificate Found
                  </td>
                </tr>
              ) : (
                applications.map((application) => {
                  const isLast = application._id === applications.length - 1;
                  const classes = isLast
                    ? "py-4"
                    : "py-4 border-b border-gray-300";

                  return (
                    <tr key={application._id} className="hover:bg-gray-50">
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-bold text-gray-600"
                        >
                          {application.formType}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {application.businessName}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <div className="w-32 truncate">
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {application.certificateOfAttendancePath}
                          </Typography>
                        </div>
                      </td>
                      <button
                            onClick={() => handleViewCertAttendance(application._id)}
                            className="bg-blue-500 text-white p-2 rounded"
                          >
                            View COA
                          </button>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
            {isModalOpen && (
                      <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg w-[80%] h-[80%] flex flex-col">
                          <div className="flex justify-between">
                            <h2 className="text-xl font-bold mb-2">
                              Certificate of Attendance
                            </h2>
                            <button
                              onClick={() => setIsModalOpen(false)}
                              className="text-2xl"
                            >
                              <IoClose />
                            </button>
                          </div>
                          <iframe src={fileUrl} className="w-full h-full border" />
                          <div className="flex justify-end mt-4">
                            <a
                              href={fileUrl}
                              download="assessment_certificate.pdf"
                              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 1
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm" className="text-blue-800">
              Previous
            </Button>
            <Button variant="outlined" size="sm" className="text-blue-800">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
