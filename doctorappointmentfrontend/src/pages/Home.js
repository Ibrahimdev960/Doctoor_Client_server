import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);
  
  const filteredDoctors = doctors.filter((doctor) => 
    doctor.name.toLowerCase().includes(search.toLowerCase()) &&
    (departmentFilter === "" || doctor.department === departmentFilter)
  );
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Available Doctors</h2>
      
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input 
          type="text" 
          placeholder="Search by name..." 
          className="p-3 border rounded-lg w-full md:w-1/2 focus:ring-2 focus:ring-blue-400 outline-none" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="p-3 border rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-400 outline-none" 
          value={departmentFilter} 
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {[...new Set(doctors.map(doc => doc.department))].map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map((doctor) => (
          <Link to={`/doctor/${doctor._id}`} key={doctor._id}>
            <div 
              className="bg-white p-6 shadow-lg rounded-2xl flex flex-col items-center transition transform hover:scale-105 cursor-pointer"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white text-2xl font-bold rounded-full mb-4">
                {doctor.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-500">{doctor.department}</p>
              <p className="text-sm mt-2">Available Slots: {doctor.availableSlots.join(", ")}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                View Profile
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
