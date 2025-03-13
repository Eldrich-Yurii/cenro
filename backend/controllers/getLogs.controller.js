import logSchema from "../models/logsSchema.js";

export const getLogs = async (req, res) => {
  try {
    const logs = await logSchema.find().populate("user", "firstname").sort({ timestamp: -1 });
    return res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logs", error: err.message });
  }
};