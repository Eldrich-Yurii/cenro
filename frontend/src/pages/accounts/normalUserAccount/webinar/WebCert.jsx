import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import {
  getUserApplication,
  viewCertificateOfAttendance,
} from "../../../../api/ApplicationApi";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";

const TABLE_HEAD = [
  "Application Type",
  "Business Name",
  "View Certficate Of Participation",
  "Action",
];
export default function WebCert() {
  const [applications, setApplications] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]);
  // const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
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
    fetchApplications();
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

  //search function
  useEffect(() => {
    const results = applications.filter((app) => {
      const searchStr =
        `${app.formType} ${app.businessName} ${app.status} ${app.assessmentCert}`.toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });
    setFilteredApplications(results);
  }, [searchTerm, applications]);

  return (
    <Card className="max-h-[34rem] w-full px-6 pt-6 shadow-lg">
      <CardHeader
        className="rounded-none flex-shrink-0"
        floated={false}
        shadow={false}
      >
        <div className=" flex justify-between items-start">
          <section>
            <Typography
              variant="h2"
              className="text-blue-800 font-extrabold font-inter"
            >
              Certificate Of Participation
            </Typography>
            <p className="w-64 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              This is the list of your Participation Certificate for the Webinars
            </p>
          </section>
          <section className="flex items-center">
            <input
              className="pl-3 h-12 border-gray-500 rounded-lg"
              type="search"
              name="empsearch"
              id="empSearch"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <Button className="ml-2 h-12 w-12 rounded-lg bg-blue-800 text-white text-2xl grid place-content-center hover:bg-blue-950">
                <TbSearch />
              </Button> */}
          </section>
        </div>
      </CardHeader>
      <CardBody className="overflow-y-auto scrollbar">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-gray-300 pb-4 pt-10">
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
              filteredApplications.map((application) => {
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
                          {application.certificateOfAttendancePath ? "Certificate Ready" : "No Certificate Yet"}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <button
                        onClick={() =>
                          handleViewCertAttendance(application._id)
                        }
                        className="border border-blue-800 text-blue-800 p-2 rounded-lg"
                      >
                        <TbSearch />
                      </button>
                    </td>
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
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-6">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 1
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" className="">
            Previous
          </Button>
          <Button variant="outlined" size="sm" className="">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
