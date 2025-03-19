import notificationSchema from "../models/notificationSchema.js";

export const getNotif = async (req, res) => {
  try {
    const notif = await notificationSchema
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(notif);
  } catch (error) {
    res.status(500).json({ message: "Error Retrieving Notification", error });
  }
};
