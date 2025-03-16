import { useEffect, useState } from "react";
import { getUserApplicationProgress } from "../../../../../api/ProgressTrackingApi";
import {
  TbCertificate,
  TbCheck,
  TbFile,
  TbReceipt,
  TbVideo,
} from "react-icons/tb";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
export default function ProgressTracker() {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        console.error("Token not found.");
        return;
      }

      try {
        const data = await getUserApplicationProgress(token);
        setProgress(data);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchProgress();
  }, []);

  return (
    <Card className="max-h-[34rem] w-full px-3 pt-3 shadow-lg">
      <CardHeader
        className="flex-shrink-0 rounded-none"
        floated={false}
        shadow={false}
      >
        <div className=" flex justify-between items-start">
          <section>
            <small
              className="text-blue-800 font-extrabold font-inter"
            >
              Application Progress
            </small>
          </section>
        </div>
      </CardHeader>
      <CardBody className="overflow-y-auto">
        {progress.map((step) => {
          return (
            <div key={step._id} className="flex justify-center flex-col pb-8">
          

              <div className="flex items-center justify-between px-6">
                <span>
                  {step.steps?.formSubmitted === true ? (
                    <TbCheck className="bg-green-700 text-white text-5xl rounded-full p-2" />
                  ) : (
                    <TbFile className="border-[3px] bg-white border-gray-400 text-gray-400 text-5xl rounded-full p-2" />
                  )}
                </span>

                <hr
                  className={`${
                    step.steps?.receiptApproved === true
                      ? "bg-green-700"
                      : "bg-gray-300"
                  } w-full rounded-lg h-1 mx-2`}
                />
                <span>
                  {step.steps?.receiptApproved === true ? (
                    <TbCheck className="bg-green-700 text-white text-5xl rounded-full p-2" />
                  ) : (
                    <TbReceipt className="border-[3px] bg-white border-gray-400 text-gray-400 text-5xl rounded-full p-2" />
                  )}
                </span>
                <hr
                  className={`${
                    step.steps?.attendanceConfirmed === true
                    ? "bg-green-700"
                      : "bg-gray-300"
                  } w-full rounded-lg h-1 mx-2`}
                />
                <span>
                  {step.steps?.attendanceConfirmed === true ? (
                    <TbCheck className="bg-green-700 text-white text-5xl rounded-full p-2" />
                  ) : (
                    <TbVideo className="border-[3px] bg-white border-gray-400 text-gray-400 text-5xl rounded-full p-2" />
                  )}
                </span>
                <hr
                  className={`${
                    step.steps?.businessCertificateIssued === true
                    ? "bg-green-700"
                    : "bg-gray-300"
                  } w-full rounded-lg h-1 mx-2`}
                  />
                <span>
                  {step.steps?.businessCertificateIssued === true ? (
                    <TbCheck className="bg-green-700 text-white text-5xl rounded-full p-2" />
                  ) : (
                    <TbCertificate className="border-[3px] bg-white border-gray-400 text-gray-400 text-5xl rounded-full p-2" />
                  )}
                </span>
              </div>
              <br />
              <div className="-mt-5 flex justify-between">
                <p className="text-center">form submission</p>
                <p>Receipt Approved</p>
                <p>Attended Webinar</p>
                <p>CEC Generated</p>
              </div>
            </div>
          );
        })}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
    </CardFooter>
    </Card>
  );
}
