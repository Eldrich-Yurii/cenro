import { response } from "express";
import User from "../../models/usersSchema.js";
import bcrypt from "bcryptjs";

export const createEmployee = async (request, response) => {
    try {
        const { firstname, middlename, lastname, birthdate, email, password,  } = request.body;

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
        response.status(201).json({ message: "Employee created successfully" });
    } catch (err) {
        response.status(500).json({ message: "Error creating employee", err });
    }
}