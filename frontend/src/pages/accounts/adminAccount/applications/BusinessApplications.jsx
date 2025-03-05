import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Menu,
  MenuItem,
  MenuList,
  MenuHandler,
  Typography,
} from "@material-tailwind/react";
import { TbDots, TbFile, TbSearch } from "react-icons/tb";
import {
  getAllApplication,
  updateApplicationStatus,
  viewAssessmentCert,
} from "../../../../api/ApplicationApi";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const TABLE_HEAD = [
  "Application Type",
  "Business Name",
  "Status",
  "Assessment Certificate",
  "Actions",
];

export default function BusinessApplications() {
  const [applications, setApplications] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllApplications = async () => {
      try {
        const data = await getAllApplication();
        setApplications(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllApplications();
  }, []);

  const handleUpdateStatus = async (applicationId, status) => {
    if (!applicationId) {
      console.log("Application ID is undefined");
      return;
    }

    try {
      const response = await updateApplicationStatus(applicationId, status);
      console.log(response);

      setApplications((prevApps) =>
        prevApps.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.log("Error Updating status", err);
    }
  };

  const handleViewAssessmentCert = async (applicationId) => {
    try {
      const fileData = await viewAssessmentCert(applicationId);

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
      <Card className="flex flex-col h-[35rem] w-full px-6 shadow-lg">
        <CardHeader
          className="h-38 rounded-none flex-shrink-0"
          floated={false}
          shadow={false}
        >
          <div className=" flex justify-between">
            <section>
              <Typography
                variant="h2"
                className="text-blue-800 font-extrabold font-inter"
              >
                Business Application
              </Typography>
              <p className="w-64 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
                This is the list of business application sent by users.
              </p>
            </section>
          </div>
          <div className="w-full flex justify-between pt-4">
            <section className="flex flex-col gap-2 items-end">
              <Menu>
                <MenuHandler>
                  <Button
                    variant="outlined"
                    className="w-42 border-blue-800 text-blue-800 py-3 rounded-lg flex justify-center items-center gap-2 font-extrabold text-sm hover:bg-blue-800 hover:text-white transition-all"
                  >
                    <TbFile className="text-lg" />
                    Filter...
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem>New Business Application</MenuItem>
                  <MenuItem>Renewal of Business Certificate</MenuItem>
                </MenuList>
              </Menu>
            </section>
            <section className="flex items-center">
              <input
                className="pl-3 h-12 border-gray-500 rounded-lg"
                type="search"
                name="empsearch"
                id="empSearch"
                placeholder="Search..."
              />
              <Button className="ml-2 h-12 w-12 rounded-lg bg-blue-800 text-white text-2xl grid place-content-center hover:bg-blue-950">
                <TbSearch />
              </Button>
            </section>
          </div>
        </CardHeader>
        
        <CardBody className="flex-grow overflow-y-scroll scrollbar">
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
                ({ _id, formType, businessName, status, assessmentCert }) => {
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
                          {formType}
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
                        <div className="w-max">
                          <span
                            className={`px-3 py-2 font-extrabold uppercase text-xs rounded-lg ${
                              status === "Approved"
                                ? "bg-lime-200 text-lime-800"
                                : status === "Pending"
                                ? "bg-yellow-200 text-orange-600"
                                : "bg-red-200 text-red-600"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-48 truncate">
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                          >
                          {assessmentCert}
                        </Typography>
                          </div>
                      </td>
                      <td className="border-b border-gray-300">
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleViewAssessmentCert(_id)}
                            className="bg-blue-500 text-white p-2 rounded"
                          >
                            View COA
                          </button>

                          {status === "Pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleUpdateStatus(_id, "Approved")
                                }
                                className="px-2 py-2 text-green-700 border border-green-700 rounded hover:bg-green-700 hover:text-white"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(_id, "Rejected")
                                }
                                className="px-2 py-2 text-red-700 border border-red-700 rounded hover:bg-red-700 hover:text-white"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
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
                    Certificate of Assessment
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
        <CardFooter className="h-38 flex items-center justify-between border-t border-blue-gray-50 p-4">
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
