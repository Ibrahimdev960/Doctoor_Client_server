import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor) fetchAppointments();
  }, [selectedDoctor]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/appointments/${selectedDoctor}`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleDoctorChange = (doctorId) => {
    setSelectedDoctor(doctorId);
    const doctor = doctors.find((doc) => doc._id === doctorId);
    setAvailableSlots(doctor ? doctor.availableSlots : []);
  };

  const addSlot = () => {
    if (selectedSlot && !availableSlots.includes(selectedSlot)) {
      setAvailableSlots([...availableSlots, selectedSlot]);
      setSelectedSlot("");
    }
  };

  const removeSlot = (slot) => {
    setAvailableSlots(availableSlots.filter((s) => s !== slot));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || availableSlots.length === 0) {
      alert("Please select a doctor and add at least one slot.");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/doctors/${selectedDoctor}`, {
        availableSlots,
      });
      alert("Doctor Availability Updated!");
      fetchDoctors();
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Failed to update availability");
    }
  };

  const deleteDoctor = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${doctorId}`);
      fetchDoctors();
      alert("Doctor Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}`, { status });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Panel</h2>
      
      <h3 className="text-xl font-semibold">Total Doctors: {doctors.length}</h3>
      <h3 className="text-xl font-semibold">Total Appointments: {appointments.length}</h3>
      
      <form onSubmit={handleUpdate} className="space-y-4 mt-4">
        <label>Select Doctor:</label>
        <select value={selectedDoctor} onChange={(e) => handleDoctorChange(e.target.value)}>
          <option value="">-- Select a Doctor --</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name} - {doctor.department}
            </option>
          ))}
        </select>

        <div>
          <h4>Available Slots:</h4>
          {availableSlots.map((slot, index) => (
            <div key={index} className="flex justify-between p-1 border rounded">
              {slot} <button onClick={() => removeSlot(slot)} className="text-red-500">✖</button>
            </div>
          ))}
        </div>

        <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
          <option value="">-- Select Time Slot --</option>
          {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        <button type="button" onClick={addSlot} disabled={!selectedSlot}>+ Add Slot</button>
        <button type="submit">Update Availability</button>
      </form>

      <h3 className="text-xl font-semibold mt-6">Doctors List</h3>
      {doctors.map((doctor) => (
        <div key={doctor._id} className="flex justify-between p-2 border">
          <p>{doctor.name} - {doctor.department}</p>
          <button onClick={() => deleteDoctor(doctor._id)} className="text-red-500">Delete</button>
        </div>
      ))}

      <h3 className="text-xl font-semibold mt-6">Appointments List</h3>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div key={appointment._id} className="flex justify-between p-2 border">
            <p>Doctor: {appointment.doctorId?.name || "Unknown"} | Date: {appointment.date} | Time: {appointment.timeSlot}</p>
            <div>
              <button onClick={() => updateAppointmentStatus(appointment._id, "approved")} className="text-green-500">Approve</button>
              <button onClick={() => updateAppointmentStatus(appointment._id, "rejected")} className="text-red-500 ml-2">Reject</button>
            </div>
          </div>
        ))
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default AdminPanel;
