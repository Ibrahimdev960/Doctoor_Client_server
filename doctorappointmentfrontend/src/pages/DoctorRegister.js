import React, { useState } from "react";
import axios from "axios";

const DoctorRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotInput, setSlotInput] = useState("");

  const handleAddSlot = () => {
    if (slotInput.trim() !== "") {
      setAvailableSlots([...availableSlots, slotInput.trim()]);
      setSlotInput(""); 
    }
  };

  const handleRemoveSlot = (slot) => {
    setAvailableSlots(availableSlots.filter((s) => s !== slot));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register-doctor", {
        name,
        email,
        password,
        department,
        availableSlots,
      });

      alert("Doctor registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setDepartment("");
      setAvailableSlots([]);
    } catch (error) {
      console.error("Error registering doctor:", error.response?.data || error);
      alert("Error registering doctor. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Register Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Doctor Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Available Slots */}
        <div className="mb-4">
          <label className="block text-gray-700">Available Slots:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={slotInput}
              onChange={(e) => setSlotInput(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g. 10:00 AM"
            />
            <button type="button" onClick={handleAddSlot} className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
              Add
            </button>
          </div>
          <div className="mt-2 space-x-2">
            {availableSlots.map((slot, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded inline-flex items-center">
                {slot}
                <button type="button" className="ml-2 text-red-600" onClick={() => handleRemoveSlot(slot)}>
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Register Doctor
        </button>
      </form>
    </div>
  );
};

export default DoctorRegister;
