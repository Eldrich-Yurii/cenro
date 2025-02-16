import User from "../../models/usersSchema.js";
import mongoose from "mongoose";

export const updateEmpDesignation = async (req, res) => {
    try {
        const { designation } = req.body;
        const id = req.params.id;

        console.log("ID:", req.params.id)
        console.log("Received Request Body:", req.body);


         // Validate MongoDB ObjectId
         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid employee ID format" });
        }

        // Convert the ID to an ObjectId and find the employee
        const employeeId = new mongoose.Types.ObjectId(id);
        const employee = await User.findOne({ _id: employeeId });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found"})
        }
        // Update the employee's designation
        employee.designation = designation;
        console.log("Employee Found:", employee);

        await employee.save();

        res.status(200).json({ meassgae: "Employee Updated Successfully", employee})

    } catch(err) {
        console.error("Error updating Employee", err);
        res.status(500).json({ message: "Internal Server Error"})
    }
}  