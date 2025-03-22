const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    department: String,
    availableSlots: { type: [String], default: [] },
    image: String,
    experience: { type: Number, default: 0 },
    qualifications: { type: String, default: "Not Provided" },
    ratings: { type: Number, default: 0 }
});

module.exports = mongoose.model("Doctor", doctorSchema);
