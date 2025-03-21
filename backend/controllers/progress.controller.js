import progressSchema from "../models/progressSchema.js"; // Use the correct schema


export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from the token

    const progress = await progressSchema.find({ userId }).populate({
      path: "applicationId",
      select: "businessName",
    });

    if (!progress || progress.length === 0) {
      return res.status(404).json({ message: "No progress found for this user" });
    }

    res.json(progress); // Return all progress records
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
