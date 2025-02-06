import { response } from "express";
import User from "../../models/usersSchema.js";
import bcrypt from "bcryptjs";

export const createEmployee = async (req, res) => {
    try {
        const { firstname, middlename, lastname, birthdate, email, password,  } = req.body;

        // Check if the requester is an admin
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized: Only admins can create employee accounts" });
        }

         // Check if email exists
         const existingUser = await User.findOne({ email });
         if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hashPassword = await bcrypt.hash(password, 10);
        const newEmployee = new User ({
            firstname,
            middlename,
            lastname,
            birthdate,
            email,
            password: hashPassword, 
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error creating employee", err });
    }
}