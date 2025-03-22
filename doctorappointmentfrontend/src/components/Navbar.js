import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token"); // Check if user is logged in
  const userRole = localStorage.getItem("role"); // Check user role (admin or doctor)

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Clear role on logout
    alert("Logged Out Successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      {/* Logo / Home Link */}
      <Link to="/" className="text-lg font-bold">Clinic</Link>

      {/* Navigation Links */}
      <div className="space-x-4">
        <Link to="/book-appointment" className="hover:text-gray-300">Book Appointment</Link>
        {token && userRole === "admin" && (
          <Link to="/admin" className="hover:text-gray-300">Admin Panel</Link>
        )}

        {/* Only show Register Doctor if user is an Admin */}
        {token && userRole === "admin" && (
          <Link to="/register-doctor" className="bg-purple-500 px-3 py-1 rounded hover:bg-purple-600">
            Register Doctor
          </Link>
        )}

        {/* Show Doctor Dashboard if user is a Doctor */}
        {token && userRole === "doctor" && (
          <Link to="/doctor-dashboard" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
            Doctor Dashboard
          </Link>
        )}

        {/* Show Login/Register if user is not logged in */}
        {!token ? (
          <>
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Login</Link>
            <Link to="/register" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
