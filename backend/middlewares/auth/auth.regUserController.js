import User from "../../models/usersSchema.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (request, response) => {
  try {
    const {
      firstname,
      middlename,
      lastname,
      birthdate,
      email,
      password,
      address,
      role,
    } = request.body;

    if (!birthdate || isNaN(new Date(birthdate))) {
      return res.status(400).json({ message: "Invalid birthdate format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      firstname,
      middlename,
      lastname,
      birthdate,
      email,
      password: hashedPassword,
      address,
      role,
      ...(role === "user" && { address }), // add address if role is user
    });

    await newUser.save(); // save user to database
    response.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    response.status(500).json({ message: "Error registering user", error });
  }
};
