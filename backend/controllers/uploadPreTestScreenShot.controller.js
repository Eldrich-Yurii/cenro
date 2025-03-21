import applicationSchema from "./../models/applicationSchema.js";

export const uploadPreTestScreenShot = async (req, res) => {
  try {
    const { applicationId } = req.params;
    // console.log("Received applicationId:", applicationId); // Debugging

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      const filePath = req.file.path.replace(/\\/g, "/"); // Normalize path for cross-platform support
  
      const application = await applicationSchema.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
  
      // Update application with the uploaded file path
      application.preTestPath = filePath;
      await application.save();
  
      // res.status(200).json({ message: "Assessment certificate uploaded", fileUrl: `${req.protocol}://${req.get("host")}/${filePath}` });
      res.status(200).json({ message: "File uploaded", fileUrl: filePath });
  } catch (err) {
    res.status(500).json({ message: "Error uploading file", err });
  }
};
