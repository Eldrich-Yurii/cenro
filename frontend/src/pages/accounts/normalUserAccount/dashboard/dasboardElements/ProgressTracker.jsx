import { useEffect, useState } from "react";
import { getUserApplicationProgress } from "../../../../../api/ProgressTrackingApi"; 
import { TbArrowRight } from "react-icons/tb";
export default function ProgressTracker () {
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
   <div>
    {progress.map((step) => {
      return (
        <div key={step._id} className="flex">
          <span>
            {step.steps?.formSubmitted === true ? "check" : "cross"}
          </span>
          <TbArrowRight />
          <span>
            {step.steps?.receiptApproved === true ? "check" : "cross"}
          </span>
          <TbArrowRight />
          <span>
            {step.steps?.attendanceConfirmed === true ? "check" : "cross"}
          </span>
          <TbArrowRight />
          <span>
            {step.steps?.businessCertificateIssued === true ? "check" : "cross"}
          </span>
        </div>
      )
    })}
   </div>
  );
};

// ProgressTracker.propTypes = {
//   token: PropTypes.string.isRequired,
// };