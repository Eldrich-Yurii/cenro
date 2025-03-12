// import { useEffect, useState } from "react";
// import { getUserProgress, updateUserProgress } from "../../../../../api/ProgressTracking";
// import { Stepper, Step } from "@material-tailwind/react";
// import PropTypes from "prop-types";

// const steps = [
//   "Application Submitted",
//   "Receipt Uploaded",
//   "Receipt Approved",
//   "Webinar Scheduled",
//   "Webinar Attended",
//   "Inspection Conducted",
//   "Final Certificate Issued",
// ];

// export default function ProgressTracker({ userId }) {
//   const [currentStep, setCurrentStep] = useState(0);

//   // Fetch user progress when component mounts
//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const step = await getUserProgress(userId);
//         setCurrentStep(step);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchProgress();
//   }, [userId]);

//   // Function to update progress
//   const handleUpdateProgress = async () => {
//     try {
//       const updatedStep = await updateUserProgress(userId, currentStep + 1);
//       setCurrentStep(updatedStep);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold mb-4">Application Progress</h2>

//       <Stepper activeStep={currentStep} className="mb-4">
//         {steps.map((step, index) => (
//           <Step key={index}>{index <= currentStep ? "✅" : "⏳"}</Step>
//         ))}
//       </Stepper>

//       <p className="text-lg text-center text-gray-800 font-bold">
//         {steps[currentStep]}
//       </p>

//       {/* Action Buttons */}
//       <div className="mt-4 flex justify-center">
//         {currentStep < steps.length - 1 && (
//           <button
//             onClick={handleUpdateProgress}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             Next Step
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// ProgressTracker.propTypes = {
//     userId: PropTypes.string.isRequired,
//   };