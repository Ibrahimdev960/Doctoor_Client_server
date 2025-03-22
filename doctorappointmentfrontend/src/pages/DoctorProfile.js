import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Navigation Hook
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/doctors/${id}`)
      .then((res) => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching doctor:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!doctor) return <p className="text-center text-red-500">Doctor not found!</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Doctor Image */}
      <div className="flex justify-center mb-4">
        <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-full border shadow-md" />
      </div>

      {/* Doctor Name & Specialization */}
      <h2 className="text-3xl font-bold text-center">{doctor.name}</h2>
      <p className="text-gray-500 text-center">{doctor.department}</p>

      {/* Experience & Qualifications */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">Experience: {doctor.experience} years</p>
        <p className="text-gray-700">Qualifications: {doctor.qualifications}</p>
      </div>

      {/* Ratings */}
      <div className="mt-4 text-center">
        <p className="text-yellow-500 text-xl">⭐ {doctor.ratings} / 5</p>
      </div>

      {/* Available Slots */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold">Available Slots:</h4>
        <p>{doctor.availableSlots.join(", ")}</p>
      </div>

      {/* Book Appointment Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate(`/book-appointment/${id}`)} // ✅ Redirect to Booking Page
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorProfile;
