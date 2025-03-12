import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { TbSearch } from "react-icons/tb";
import {
  getUserApplication,
  viewFinalCertificate,
} from "../../../../api/ApplicationApi";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const TABLE_HEAD = ["Business Name", "Certificate", "Actions"];

export default function FinalCert() {
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

  const handleViewFinalCert = async (applicationId) => {
    try {
      const fileData = await viewFinalCertificate(applicationId);

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
      <Card className="h-[34rem] w-full px-3 pt-3 shadow-lg">
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
                Inspection & Certificate of Compliance
              </Typography>
              <p className="w-72 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
                This where you will get your Certificate of Compliance after the
                Inspection.
              </p>
            </section>
            <section className="flex items-center">
              <input
                className="pl-3 h-12 border-gray-500 rounded-lg"
                type="search"
                name="empsearch"
                id="empSearch"
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
              {applications.map(
                ({ _id, businessName, businessCertificatePath }) => {
                  const isLast = _id === applications.length - 1;
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
                          {businessName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="truncate w-32">
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {businessCertificatePath
                              ? "Certficate Ready"
                              : "No Certificate Yet"}
                          </Typography>
                        </div>
                      </td>
                      <td className="border-b border-gray-300">
                        <button
                          onClick={() => handleViewFinalCert(_id)}
                          className="border-blue-800 border text-blue-800 p-2 rounded-lg"
                        >
                          <TbSearch />
                        </button>
                      </td>
                    </tr>
                  );
                }
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
    </div>
  );
}
