import User from "../../models/usersSchema.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const loginUser = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({email});
        if (!user) return response.status(404).json({ error: "User not Found."})


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return response.status(404).json({ error: "Invalid Credentials."});
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY,
        { expiresIn: "1h" });

        response.status(200).json({ message: "Login successful" });
    } catch (error) {
        response.status(500).json({ error: "Login failed" });

    }
}