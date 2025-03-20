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
  confirmInspection,
  getPendingFinalCertUsers,
  uploadInspectionReport,
} from "../../../../api/ApplicationApi";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["Account Number", "Business Name", "Upload", "Report", "Action"]; // Added Report

export default function IsnpectionAndFinalCert() {
  const [webinarAttendees, setWebinarAttendees] = useState([]);
  const [uploadDisabled, setUploadDisabled] = useState({}); // Initialize uploadDisabled

  useEffect(() => {
    const fetchPendingFinalCertUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        if (!token) {
          console.error("Token not found.");
          return;
        }
        const data = await getPendingFinalCertUsers(token);
        setWebinarAttendees(data);

        const initialDisabled = {};
        data.forEach((attendee) => {
          initialDisabled[attendee._id] = false;
        });
        setUploadDisabled(initialDisabled);
      } catch (error) {
        console.error("Error fetching pending webinar users:", error);
      }
    };

    fetchPendingFinalCertUsers();
  }, []);

  const handleCofirmInspection = async (applicationId) => {
    try {
      const response = await confirmInspection(applicationId);
      setWebinarAttendees((prev) =>
        prev.filter((attendee) => attendee._id !== applicationId)
      );
      console.log(response.message);
    } catch (err) {
      console.log("Error generating certificate", err);
    }
  };

  const handleFileUpload = async (e, applicationId) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadInspectionReport(applicationId, file);
      console.log("File upload response:", response);

      if (!response || !response.fileUrl) {
        console.error("Unexpected response format:", response);
        return;
      }

      setWebinarAttendees((prevAttendees) =>
        prevAttendees.map((app) =>
          app._id === applicationId ? { ...app, inspectionReport: response.fileUrl } : app
        )
      );

      setUploadDisabled((prevDisabled) => ({
        ...prevDisabled,
        [applicationId]: true,
      }));

      e.target.value = "";
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
    }
  };

  return (
    <Card className="max-h-[34rem] w-full px-6 shadow-lg">
      <CardHeader
        className="rounded-none flex-shrink-0"
        floated={false}
        shadow={false}
      >
        <div className=" flex justify-between items-start">
          <section>
            <Typography variant="h2" className="text-blue-800 font-extrabold">
              Inspection and Certificate of Environmental Compliance
            </Typography>
            <p className="w-72 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              This is the list of Cenro Clients that is under inspection or completed all the requirements.
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
            {webinarAttendees.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center pt-4">
                  No Pending Users Found
                </td>
              </tr>
            ) : (
              webinarAttendees.map(({ _id, businessName, accountNumber, inspectionReport }) => {
                const isLast = _id === webinarAttendees.length - 1;
                const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";
                const isReportUploaded = !!inspectionReport;

                return (
                  <tr key={_id} className="hover:bg-gray-50">
                    {/* <td className={classes}>
                      <div className="flex items-center">
                        <Typography variant="small" className="font-bold text-gray-600">
                          {_id}
                        </Typography>
                      </div>
                    </td> */}
                    <td className={classes}>
                      <Typography variant="small" className="font-normal text-gray-600">
                        {accountNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal text-gray-600">
                        {businessName}
                      </Typography>
                    </td>
                    <td className="border-b border-gray-300">
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, _id)}
                        disabled={uploadDisabled[_id]}
                      />
                    </td>
                    <td className={classes}>
                      <div className="w-32 truncate">
                        <Typography variant="small" className="font-normal text-gray-600">
                          {inspectionReport || "No Report Uploaded"}
                        </Typography>
                      </div>
                    </td>
                    <td className="border-b border-gray-300">
                      <Button onClick={() => handleCofirmInspection(_id)} disabled={!isReportUploaded}>
                        Generate Certificate Now
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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