import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { getUserApplication, uploadAssessment } from "../../../../api/ApplicationApi";
import { useEffect, useState } from "react";
import SubmitApplication from "../../../../components/modal/SubmitApplication"
const TABLE_HEAD = [
  "Application Type",
  "Business Name",
  "Status",
  // "PDF File",
  "Assessment",
  "Upload Assessment",
];
export default function MyApplication() {
  const [applications, setApplications] = useState([]);
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

  const handleFileUpload = async (e, applicationId) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
        const response = await uploadAssessment(applicationId, file);
        console.log("File upload response:", response); // Debugging log

        // Use 'fileUrl' instead of 'fileName'
        if (!response || !response.fileUrl) {
            console.error("Unexpected response format:", response);
            return;
        }

        setApplications((prevApplications) =>
            prevApplications.map((app) =>
                app._id === applicationId
                    ? { ...app, assessmentCert: response.fileUrl } // Use fileUrl
                    : app
            )
        );

        e.target.value = ""; // Reset file input
    } catch (error) {
        console.error("Error uploading file:", error.response?.data || error.message);
    }
};

  return (
      <Card className="max-h-[34rem] w-full px-6 shadow-lg">
        <CardHeader className="flex-shrink-0 rounded-none" floated={false} shadow={false}>
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
              <SubmitApplication />
            </section>
          </div>
        </CardHeader>
        <br />
        <CardBody className="overflow-y-scroll">
          <table className="h-auto flex-grow w-full min-w-max table-auto text-left ">
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
                    No Applications Found
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
                          <span
                            className={`px-3 py-2 font-extrabold uppercase text-xs rounded-lg ${
                              application.status === "Approved"
                                ? "bg-lime-200 text-lime-600"
                                : application.status === "Pending"
                                ? "bg-yellow-200 text-orange-600"
                                : "bg-pink-200 text-red-600"
                            }`}
                          >
                            {application.status}
                          </span>
                        </td>
                        {/* <td className={classes}>
                          <a
                            href={`http://localhost:5000/${application.pdfPath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-blue-600"
                          >
                            Download PDF
                          </a>
                        </td> */}
                        <td className={classes}>
                          <div className="w-32 truncate">
                            <Typography
                              variant="small"
                              className="font-normal text-gray-600"
                            >
                              {application.assessmentCert}
                            </Typography>
                          </div>
                        </td>
                        <td className="border-b border-gray-300">
                          <input
                            type="file"
                            onChange={(e) => handleFileUpload(e, application._id)}
                          />
                          {/* <Button
                            variant="outlined"
                            className="px-2 py-2 border-red-800 text-red-800  hover:bg-red-800 hover:text-white"
                          >
                            Upload file
                          </Button> */}
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
          {/* {editEmployeeDesignation  && (
            <EditDesigModal
              employee={editEmployeeDesignation}
              setEditEmployeeDesignation={setEditEmployeeDesignation}
              updateEmployeeDesignation={updateEmployeeDesignation}
            />
          )} */}
        </CardBody>
        <CardFooter className="h-auto flex-shrink-0 flex items-center justify-between border-t border-blue-gray-50 p-4">
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
  );
}
