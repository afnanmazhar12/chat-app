import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies?.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - no token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ error: "Unauthorized - invalid token" });
        }

        // Fetch the user from the database
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "Unauthorized - user not found" });
        }

        req.user = user; // Attach user to request
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error("Error in protectRoute:", error.message);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Unauthorized - invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Unauthorized - token expired" });
        }
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
