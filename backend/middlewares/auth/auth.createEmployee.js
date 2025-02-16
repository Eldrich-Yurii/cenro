import User from "../../models/usersSchema.js";
import bcrypt from "bcryptjs";

export const createEmployee = async (req, res) => {
    try {
        const { firstname, middlename, lastname, birthdate, email, password, designation } = req.body;
 
        // Validate required fields
        if (!firstname || !middlename || !lastname || !birthdate || !email || !password || !designation) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }


        // Validate designation 
        const validDesignation = ["validator", "webinar coordinator", "inspector", "chat support"];
        if (!validDesignation.includes(designation)) {
            return res.status(400).json({ message: "Invalid designation" });
        }

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
            role: "employee",
            designation
        });

        console.log("Received Data:", req.body);

        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully" });
    } catch (err) {
        console.error("Error creating employee:", err);
        res.status(500).json({ message: "Error creating employee", err });
    }
}