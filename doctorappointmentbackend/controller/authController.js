const User = require('../models/User');
const Doctor = require("../models/Doctor");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;




// 📌 Admin ke through Doctor Register
const registerDoctor = async (req, res) => {
    try {
        const { name, email, password, department, availableSlots = [], image, experience, qualifications, ratings } = req.body;

        // ✅ Check if email already exists in User or Doctor collection
        const existingUser = await User.findOne({ email });
        const existingDoctor = await Doctor.findOne({ email });

        if (existingUser || existingDoctor) {
            return res.status(400).json({ message: "Email already registered!" });
        }

        // ✅ Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create User as Doctor
        const user = new User({ name, email, password: hashedPassword, role: "doctor" });
        await user.save();

        // ✅ Create Doctor Entry
        const doctor = new Doctor({
            name,
            email,
            department,
            availableSlots: availableSlots.length > 0 ? availableSlots : [], // Empty array as default
            image: image || "",
            experience: experience || 0,
            qualifications: qualifications || "Not Provided",
            ratings: ratings || 0
        });

        await doctor.save();

        res.status(201).json({ message: "Doctor registered successfully!" });

    } catch (error) {
        console.error("Doctor Registration Error:", error);
        res.status(500).json({ message: "Error registering doctor", error });
    }
};




// 📌 یوزر رجسٹریشن
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // ✅ Agar role "doctor" hai to allow karein
        if (!['admin', 'user', 'doctor'].includes(role)) {
            return res.status(400).json({ message: "Invalid Role" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        
        res.status(201).json({ message: "User Registered!", role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

// 📌 یوزر لاگ ان
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // ✅ JWT token me role add karein
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};


module.exports = { registerUser, loginUser , registerDoctor };
