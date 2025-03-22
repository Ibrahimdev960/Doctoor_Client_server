const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// 📌 اپوائنٹمنٹ بک کریں
const bookAppointment = async (req, res) => {
    try {
        const { doctorId, patientName, timeSlot ,date} = req.body;

        // چیک کریں کہ سلاٹ پہلے سے بک نہ ہو
        const existingAppointment = await Appointment.findOne({ doctorId, timeSlot,date});
        if (existingAppointment) {
            return res.status(400).json({ message: 'Slot already booked!' });
        }

        // اپوائنٹمنٹ محفوظ کریں
        const appointment = new Appointment({ doctorId, patientName,date, timeSlot });
        await appointment.save();

        // اس سلاٹ کو ڈاکٹر کے availableSlots سے ہٹا دیں
        await Doctor.findByIdAndUpdate(doctorId, {
            $pull: { availableSlots: timeSlot }
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Error booking appointment", error });
    }
};

// 📌 کسی ڈاکٹر کی بک شدہ اپوائنٹمنٹس حاصل کریں
const getAppointmentsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        if (!doctorId) {
            return res.status(400).json({ message: "Doctor ID is required!" });
        }
        
        const appointments = await Appointment.find({ doctorId }).populate("doctorId", "name department");
        
        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found!" });
        }

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error });
    }
};


module.exports = { bookAppointment, getAppointmentsByDoctor };
