import applicationSchema from "../models/applicationSchema.js";
import progressSchema from "../models/progressSchema.js";


export const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const application = await applicationSchema.findOne({ userId });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // res.json({ currentStep: application.applicationProgress });
    res.json({ progressId: application.progressId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// export const updateUserProgress = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     const { step, status } = req.body;

//     const progress = await progressSchema.findOneAndUpdate(
//       { applicationId },
//       { $set: { [`steps.${step}`]: status, updatedAt: Date.now() } },
//       { new: true }
//     );

//     if (!progress) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     res.status(200).json({ message: "Progress updated successfully", progress });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
