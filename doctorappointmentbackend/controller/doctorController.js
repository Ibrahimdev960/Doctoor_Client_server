const Doctor = require("../models/Doctor");

const getDoctorByEmail = async (req, res) => {
    try {
        const { email } = req.params; // ✅ Email frontend se aa rahi hai

        if (!email) {
            return res.status(400).json({ message: "❌ Email is required" });
        }

        const doctor = await Doctor.findOne({ email }).select("-password"); // ✅ Password remove karein

        if (!doctor) {
            return res.status(404).json({ message: "❌ Doctor not found" });
        }

        return res.status(200).json({
            doctor,
            appointments: [], // ✅ Yahan appointments ko bhi fetch kar sakte hain agar required ho
        });
    } catch (error) {
        console.error("❌ Error fetching doctor:", error);
        return res.status(500).json({ message: "❌ Error fetching doctor", error });
    }
};





// 📌 تمام ڈاکٹروں کی لسٹ حاصل کریں
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctors", error });
    }
};

// 📌 ایک مخصوص ڈاکٹر کی تفصیلات حاصل کریں
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctor", error });
    }
};
// ✅ Get current doctor details
const getCurrentDoctor = async (req, res) => {
    try {
        console.log("🛑 Debugging getCurrentDoctor: req.user =", req.user);  // ✅ Debugging

        if (!req.user || !req.user.email) {
            return res.status(400).json({ message: "Invalid User Data" });
        }

        const doctor = await Doctor.findOne({ email: req.user.email });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(doctor);
    } catch (error) {
        console.error("❌ Error fetching doctor:", error);  // Debugging
        res.status(500).json({ message: "Error fetching doctor profile", error });
    }
};

// 📌 نیا ڈاکٹر شامل کریں
const addDoctor = async (req, res) => {
    try {
        const { name, department, availableSlots, image, experience, qualifications, ratings } = req.body;
        const doctor = new Doctor({ name, department, availableSlots, image, experience, qualifications, ratings });
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Error adding doctor", error });
    }
};


// ✅ Export only ONCE
module.exports = { getDoctors, getDoctorById, addDoctor , getCurrentDoctor, getDoctorByEmail };
