import User from "../../models/usersSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not Found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(404).json({ error: "Invalid Credentials." });

    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ message: "JWT_SECRET_KEY is missing" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    console.log("Generated Token:", token);
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", error });
  }
};
