import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const BookAppointment = () => {
  const { id } = useParams(); // ✅ Doctor ID agar profile se aya ho
  const location = useLocation(); // ✅ Check kahan se aya hai
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(id || ""); // ✅ Agar ID hai to wahi select
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!id) {
      // 🏥 Navbar se aya hai to doctors list fetch karo
      axios
        .get("http://localhost:5000/api/doctors")
        .then((res) => setDoctors(res.data))
        .catch((err) => console.error("Error fetching doctors:", err));
    }
  }, [id]);

  useEffect(() => {
    if (selectedDoctor) {
      // ✅ Doctor ka available slots fetch karo
      axios
        .get(`http://localhost:5000/api/doctors/${selectedDoctor}`)
        .then((res) => setDoctorSlots(res.data.availableSlots))
        .catch((err) => console.error("Error fetching slots:", err));
    }
  }, [selectedDoctor]);

  const handleBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert("Please select doctor, date, and time!");
      return;
    }

    const appointmentData = {
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      await axios.post("http://localhost:5000/api/appointments", appointmentData);
      setSuccessMessage("Appointment booked successfully! ✅");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Book Appointment</h2>

      {/* ✅ Agar Navbar se aya ho to Dropdown Show karo */}
      {!id && (
        <>
          <label className="block mb-2">Select Doctor:</label>
          <select
            className="w-full p-2 border rounded-md"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name} ({doctor.department})
              </option>
            ))}
          </select>
        </>
      )}

      {/* ✅ Slots sirf tab show ho jab doctor select ho */}
      {selectedDoctor && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Available Slots:</h4>
          <p>{doctorSlots.length > 0 ? doctorSlots.join(", ") : "No slots available"}</p>
        </div>
      )}

      {/* 📅 Date Selection */}
      <label className="block mt-4 mb-2">Select Date:</label>
      <input
        type="date"
        className="w-full p-2 border rounded-md"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {/* ⏰ Time Selection */}
      <label className="block mt-4 mb-2">Select Time:</label>
      <input
        type="time"
        className="w-full p-2 border rounded-md"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      />

      {/* 📌 Book Button */}
      <button
        className="mt-6 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        onClick={handleBooking}
      >
        Book Appointment
      </button>

      {/* ✅ Success Message */}
      {successMessage && (
        <p className="mt-4 text-green-600 text-center">{successMessage}</p>
      )}
    </div>
  );
};

export default BookAppointment;
