import applicationSchema from "../models/applicationSchema.js";

export const verifyCert = async (req, res) => {
  try {
    const { hash } = req.query;

    if (!hash || typeof hash !== "string") {
      return res.status(400).json({ message: "Invalid or missing hash" });
    }

    console.log("Verifying certificate with hash:", hash);

    // Find certificate by hash
    const application = await applicationSchema.findOne({ businessCertificateHash: hash });

    if (!application) {
      return res.status(404).json({ message: "Certificate not found or invalid" });
    }

    // Send valid response
    res.status(200).json({
      valid: true,
      businessName: application.businessName,
      issuedTo: application.userId,
      certificatePath: application.businessCertificatePath,
    });

  } catch (err) {
    console.error("Error verifying certificate:", err.message);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};