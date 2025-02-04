import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
    const token = request.cookies.token

    if (!token) return response.status(400).json({ error: "Access denied, No token provided"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (request.user.role !== "admin") return response.status(403).json({ error: "Access Denied, Admin Only."})
        
        request.user = decoded; // Attach user data to request
        next();
    } catch (error){
        response.status(400).json({ error: "Invalid token", error });
    }
};
