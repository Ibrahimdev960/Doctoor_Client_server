import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookAppointment from "./pages/BookAppointment";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorDashboard from "./pages/DoctorDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ Footer import
import "./index.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen"> {/* ✅ Flexbox Layout */}
      <Router>
        <Navbar />
        <main className="flex-grow"> {/* ✅ This will push footer down */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-doctor" element={<DoctorRegister />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/book-appointment/:id" element={<BookAppointment />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
