import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
    const token = request.header("Authorization");

    if (!token) return response.status(400).json({ error: "Access denied, No token provided"});

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET_KEY);
        request.user = decoded; // Attach user data to request
    } catch {
        response.status(400).json({ error: "Invalid token" });
    }
};

export const isAdmin = (request, response, next) => {
    if (request.user.role !== "admin") return response.status(403).json({ error: "Access Denied, Admin Only."})
}