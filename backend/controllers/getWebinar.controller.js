import webinarSchema from "../models/webinarSchema.js";

export const getAllWebinar = async (req, res) => {
    try {
         const webinar = await webinarSchema.find();

         res.status(200).json(webinar)
    } catch (err) {
        res.status(500).json({ message: "Error retrieving Webinar"})
    }
}