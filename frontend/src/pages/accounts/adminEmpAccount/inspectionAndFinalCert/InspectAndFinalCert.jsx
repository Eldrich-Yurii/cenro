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
import Swal from "sweetalert2";
import { FaFilePdf, FaFileImage, FaFileWord, FaFileAlt } from "react-icons/fa";

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
    Swal.fire({
      title: "Generate Certificate?",
      text: "Are you sure you want to generate the certificate?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Generate!",
      cancelButtonText: "No, Cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Generating Certificate...",
          html: "Generating Certificate. Please Wait",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        try {
          const response = await confirmInspection(applicationId);
          setWebinarAttendees((prev) =>
            prev.filter((attendee) => attendee._id !== applicationId)
          );
          console.log(response.message);
          Swal.close();
          Swal.fire("Generated!", "Certificate generated successfully.", "success");
        } catch (err) {
          console.log("Error generating certificate", err);
          Swal.close();
          Swal.fire("Error!", "Failed to generate certificate.", "error");
        }
      }
    });
  };

const getFileIcon = (file) => {
    if (!file) return <FaFileAlt />;

    const fileType = file.type;

    if (fileType.includes("pdf")) {
      return <FaFilePdf />;
    } else if (fileType.includes("image")) {
      return <FaFileImage />;
    } else if (
      fileType.includes("word") ||
      fileType.includes(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
    ) {
      return <FaFileWord />;
    } else {
      return <FaFileAlt />;
    }
  };

  const generateFilePreview = (file) => {
    return new Promise((resolve) => {
      if (!file) {
        resolve("<p>No file selected.</p>");
        return;
      }

      const fileType = file.type;

      if (fileType.includes("image")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(`<img src="${e.target.result}" alt="File Preview" style="max-width: full; max-height: 200px;" />`);
        };
        reader.readAsDataURL(file);
      } else if (fileType.includes("pdf")) {
        
        resolve(`<p>PDF File Preview</p><FaFilePdf size={50} />`);
      } else if (
        fileType.includes("word") ||
        fileType.includes(
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
      ) {
        resolve(`<p>Word Document Preview</p><FaFileWord size={50} />`); // Example placeholder
      } else {
        resolve(`<p>File Preview</p><FaFileAlt size={50} />`); // Generic placeholder
      }
    });
  };


  const handleFileUpload = async (e, applicationId) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = await generateFilePreview(file);

    Swal.fire({
      title: "Confirm Upload",
      html: `
          <p>Are you sure you want to upload "${file.name}"?</p>
          <div>${preview}</div>
        `,
      icon: getFileIcon(file).type.name,
      showCancelButton: true,
      confirmButtonText: "Yes, upload!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await uploadInspectionReport(applicationId, file);
          console.log("File upload response:", response);

          if (!response || !response.fileUrl) {
            console.error("Unexpected response format:", response);
            return;
          }

          setWebinarAttendees((prevAttendees) =>
            prevAttendees.map((app) =>
              app._id === applicationId
                ? { ...app, inspectionReport: response.fileUrl }
                : app
            )
          );

          setUploadDisabled((prevDisabled) => ({
            ...prevDisabled,
            [applicationId]: true,
          }));

          e.target.value = "";
        } catch (error) {
          console.error(
            "Error uploading file:",
            error.response?.data || error.message
          );
        }
      }
    });
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
            <p className="w-80px text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              This is the list of Cenro Clients that has completed the webinar and has an ongoing or completed inspection. <b>Upload the inspection document</b> to be able to generate the CEC.
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
                        disabled={!!inspectionReport}
                      />
                    </td>
                    <td className={classes}>
                      <div className="w-32 truncate">
                      <Typography
                          variant="small"
                          className={`font-bold ${inspectionReport ? "text-green-600" : "text-gray-600"}`}
                        >
                          {inspectionReport ? "Already Uploaded" : "Not Yet Uploaded"}
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