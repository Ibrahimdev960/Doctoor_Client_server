import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ For redirecting unauthorized users

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [error, setError] = useState(""); // ✅ Error message state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("doctorEmail");

        console.log("🟢 Token from localStorage:", token);
        console.log("🟢 Doctor Email from localStorage:", email);

        if (!token || !email) {
          console.error("❌ Unauthorized - No Token or Email Found");
          setError("Unauthorized! Please log in again.");
          setLoading(false);
          setTimeout(() => navigate("/login"), 2000); // ⏳ Redirect after 2 seconds
          return;
        }

        const apiURL = `http://localhost:5000/api/doctors/me/${email}`;
        console.log("📢 Sending Request to:", apiURL);

        const response = await axios.get(apiURL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ API Response:", response.data);

        if (!response.data.doctor) {
          throw new Error("Invalid response - doctor data missing.");
        }

        setDoctor(response.data.doctor);
        setAppointments(response.data.appointments || []);
      } catch (error) {
        console.error("❌ Error fetching doctor details", error.response?.data || error.message);
        setError("Failed to load doctor details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [navigate]);

  if (loading) return <p className="text-center text-blue-600">Fetching data...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-700">Welcome, Dr. {doctor.name}</h2>
      <p className="text-gray-700">Department: {doctor.department}</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h3>
        <ul className="mt-3">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li key={appointment._id} className="p-4 border rounded-lg shadow-sm bg-white mb-3">
                <p><strong>Patient:</strong> {appointment.patientName}</p>
                <p><strong>Date & Time:</strong> {appointment.date} - {appointment.time}</p>
                <p><strong>Status:</strong> <span className="text-blue-600">{appointment.status}</span></p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No upcoming appointments.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;
