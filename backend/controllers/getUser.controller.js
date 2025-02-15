import usersSchema from "../models/usersSchema.js";

export const getUsers = async (req, res) => {
    try {
        const users = await usersSchema.find({ role: "user"}).select("-password");
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({ message: "Error Fetching users", err})
    }
}