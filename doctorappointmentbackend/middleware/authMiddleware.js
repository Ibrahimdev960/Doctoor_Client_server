const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No Token Provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // ✅ User ka role aur ID available hoga
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// ✅ Doctor ke liye access control
const authorizeDoctor = (req, res, next) => {
    if (req.user.role !== "doctor") {
        return res.status(403).json({ message: "Access Denied! Only Doctors Allowed." });
    }
    next();
};


const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized, No token found" });
        }

        token = token.split(" ")[1]; // Token extract karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password"); // User fetch karna
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, Invalid token" });
    }
};




module.exports = { authenticate, authorizeDoctor ,protect};
