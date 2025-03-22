const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    patientName: String,
    timeSlot: String,
    date: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
