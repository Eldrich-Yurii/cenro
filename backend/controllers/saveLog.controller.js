import logSchema from "../models/logsSchema.js";

export const saveLog = async (action, userId, details = "") => {
  try {
    if (!userId) {
      console.error("Error: userId is missing in saveLog");
      return;
    }
    const log = new logSchema({ action, user: userId, details });
    await log.save();
    console.log("Log saved:", action);
  } catch (error) {
    console.error("Error saving log:", error);
  }
};