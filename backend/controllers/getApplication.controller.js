import applicationSchema from "./../models/applicationSchema.js";
import Application from "./../models/applicationSchema.js"


export const getUserApplication = async (req, res) => {
  try {
    const applications = await applicationSchema
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllApplication = async (req, res) => {
    try {
        const application = await Application.find()

        return res.status(200).json(application)
    } catch (err) {
        res.status(500).json({ message: "Error Fetching Application", err})
    }
}