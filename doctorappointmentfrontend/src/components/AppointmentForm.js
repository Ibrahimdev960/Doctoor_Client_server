import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  // Backend se doctors ki list fetch karo
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Doctor select karne per available time slots update karo
  const handleDoctorChange = (doctorId) => {
    setSelectedDoctor(doctorId);
    const doctor = doctors.find((doc) => doc._id === doctorId);
    setAvailableSlots(doctor ? doctor.availableSlots : []);
    setTimeSlot(""); // Reset time slot when doctor changes
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !timeSlot) {
      alert("Please select a doctor and time slot!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/appointments", {
        doctorId: selectedDoctor,
        patientName,
        timeSlot,
      });

      setSubmittedData({ doctorId: selectedDoctor, patientName, timeSlot });
      alert("Appointment Booked Successfully!");

      // Reset form fields
      setSelectedDoctor("");
      setPatientName("");
      setTimeSlot("");
      setAvailableSlots([]);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Book an Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Doctor Selection Dropdown */}
        <div>
          <label className="block font-medium">Select Doctor:</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={selectedDoctor}
            onChange={(e) => handleDoctorChange(e.target.value)}
            required
          >
            <option value="">-- Select a Doctor --</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name} - {doctor.department}
              </option>
            ))}
          </select>
        </div>

        {/* Patient Name Input */}
        <div>
          <label className="block font-medium">Patient Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="E.g., Ali Khan"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>

        {/* Time Slot Dropdown (Dynamically Updates) */}
        <div>
          <label className="block font-medium">Select Time Slot:</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            disabled={!availableSlots.length}
          >
            <option value="">-- Select a Time Slot --</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          disabled={!selectedDoctor || !timeSlot}
        >
          Book Appointment
        </button>
      </form>

      {/* Dummy Data Display */}
      {submittedData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Submitted Data:</h3>
          <p><strong>Doctor ID:</strong> {submittedData.doctorId}</p>
          <p><strong>Patient Name:</strong> {submittedData.patientName}</p>
          <p><strong>Time Slot:</strong> {submittedData.timeSlot}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
