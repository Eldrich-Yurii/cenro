import usersSchema from "../models/usersSchema.js"



export const getEmployees = async (req, res) => {
    try {
        const employee = await usersSchema.find({ role: "employee" }).select("-password");
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error });
    }
};