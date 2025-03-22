import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Available Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            {doctor.name} - {doctor.department}
            <br />
            Available Slots: {doctor.availableSlots.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
