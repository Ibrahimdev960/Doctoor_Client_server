import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
  
      console.log("🟢 Full Login Response:", response.data); // Debugging API response
  
      const { token, role, doctor } = response.data;
  
      if (!token || !role) {
        console.error("❌ Invalid Response Structure", response.data);
        alert("Invalid response from server. Please try again.");
        return;
      }
  
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
  
      // ✅ Ensure doctorEmail is stored correctly
      if (doctor && doctor.email) {
        localStorage.setItem("doctorEmail", doctor.email);
      } else {
        console.warn("⚠ doctor.email is missing from API response.");
      }
  
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      alert("Invalid Credentials. Please try again.");
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-2 border rounded-lg" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-2 border rounded-lg" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
