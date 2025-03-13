import applicationSchema from "../models/applicationSchema.js";

export const verifyCert = async (req, res) => {
  try {
    const { hash } = req.query;

    if (!hash || typeof hash !== "string") {
      return res.status(400).json({ message: "Invalid or missing hash" });
    }

    // Validate hash format (Ensure it matches SHA-256)
    const hashRegex = /^[a-f0-9]{64}$/i; // SHA-256 hash pattern
    if (!hashRegex.test(hash)) {
      return res.status(400).json({ message: "Invalid hash format" });
    }

    console.log(
      `[${new Date().toISOString()}] Verifying certificate for hash: ${hash}`
    );

    // Fetch only required fields to optimize performance
    const application = await applicationSchema.findOne(
      { businessCertificateHash: hash },
      "businessName userId businessCertificatePath"
    );

    if (!application) {
      console.warn(
        `[${new Date().toISOString()}] Certificate not found for hash: ${hash}`
      );
      return res
        .status(404)
        .json({ message: "Certificate not found or invalid" });
    }

    res.status(200).send(`
      <html>
      <head>
        <title>Certificate Verification</title>
        <style>
          body { 
          font-family: Arial, sans-serif; 
          text-align: center; 
          padding: 40px; 
          }
          .container { 
          max-width: 500px; 
          margin: auto; 
          padding: 20px; 
          border-radius: 10px; 
          box-shadow: 0px 0px 10px #ccc; }
          .valid { 
          color: green; 
          font-size: 20px; }
          .invalid { 
          color: red; 
          font-size: 20px; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Certificate Verification</h2>
          <p class="valid">This certificate is valid.</p>
          <p><strong>Business Name:</strong> ${application.businessName}</p>
          <p><strong>Issued To (User ID):</strong> ${application.userId}</p>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] Error verifying certificate:`,
      err.message
    );
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};
