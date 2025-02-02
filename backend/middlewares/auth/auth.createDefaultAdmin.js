import User from "../../models/usersSchema.js"
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const adminUser = new User({
        firstname: "System",
        middlename: "Default",
        lastname: "Admin",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log(`✅ Default admin created: ${process.env.ADMIN_EMAIL}`);
    } else {
      console.log("✅ Admin already exist.");
    }
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
};