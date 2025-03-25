import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import {
  getUserApplication,
  uploadAssessment,
} from "../../../../api/ApplicationApi";
import { useEffect, useState } from "react";
import SubmitApplication from "../../../../components/modal/SubmitApplication";
import Swal from "sweetalert2";
import { FaFilePdf, FaFileImage, FaFileWord, FaFileAlt } from "react-icons/fa";

const TABLE_HEAD = [
  "Account No.",
  "Application Type",
  "Business Name",
  "Status",
  "Official Receipt (OR)",
  "Upload OR",
];

export default function MyApplication() {
  const [applications, setApplications] = useState([]);

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
          const response = await uploadAssessment(applicationId, file);
          console.log("File upload response:", response);

          if (!response || !response.fileUrl) {
            console.error("Unexpected response format:", response);
            return;
          }

          setApplications((prevApplications) =>
            prevApplications.map((app) =>
              app._id === applicationId
                ? { ...app, assessmentCert: response.fileUrl }
                : app
            )
          );

          e.target.value = ""; // Reset file input

          Swal.fire({
            icon: "success",
            title: "Uploaded!",
            text: "Your file has been uploaded.",
          });
        } catch (error) {
          console.error(
            "Error uploading file:",
            error.response?.data || error.message
          );
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "There was an error uploading your file.",
          });
        }
      }
    });
  };

  return (
    <Card className="max-h-[600px] w-full px-6 shadow-lg">
      <CardHeader
        className="flex-shrink-0 rounded-none"
        floated={false}
        shadow={false}
      >
        <div className=" flex justify-between">
          <section>
            <Typography
              variant="h2"
              className="text-blue-800 font-extrabold font-inter"
            >
              My Business Application
            </Typography>
            <p className="w-auto text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              Follow these steps to start processing your application:
            </p>
            <p className="w-auto text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              1. Make sure you already payed the processing fee at the CENRO
              cashier.
            </p>
            <p className="w-auto text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              2. Click the Submit Application Button.
            </p>
            <p className="w-auto text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              3. Fill-out the form.
            </p>
            <p className="w-auto text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              4. Your application details will show below.
            </p>
            <p className="w-auto text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              5. Upload the copy of your Official Receipt obtained from the
              cashier to start validation.
            </p>
            <p className="w-auto text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              6. Once approved, you are now elligible to attend the Webinar.
            </p>
          </section>
          <section className="flex flex-col gap-2 items-end">
            <SubmitApplication />
          </section>
        </div>
      </CardHeader>
      <br />
      <CardBody className="overflow-y-scroll">
        <table className="min-h-[200px] flex-grow w-full min-w-max table-auto text-left ">
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
                        {application.accountNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
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
                    <td className={classes}>
                      <div className="w-32 truncate">
                        <Typography
                          variant="small"
                          className={`font-bold ${application.assessmentCert ? "text-green-600" : "text-gray-600"}`}
                        >
                          {application.assessmentCert ? "Already Uploaded" : "Not Uploaded Yet"}
                        </Typography>
                      </div>
                    </td>
                    <td className="border-b border-gray-300">
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, application._id)}
                        disabled={!!application.assessmentCert}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="h-auto flex-shrink-0 flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Total Applications: {applications.length}
        </Typography>
      </CardFooter>
    </Card>
  );
}