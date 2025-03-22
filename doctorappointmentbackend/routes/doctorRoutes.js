const express = require("express");
const { authenticate, authorizeDoctor } = require("../middleware/authMiddleware");
const { getDoctors, getDoctorById, addDoctor, getCurrentDoctor,getDoctorByEmail } = require("../controller/doctorController");

const router = express.Router();

// router.get("/", authenticate, getDoctors);
// router.get("/me", authenticate, authorizeDoctor, getCurrentDoctor); // ✅ Doctor apni details fetch karega
// router.get("/:id", authenticate, getDoctorById);
// router.post("/", authenticate, authorizeDoctor, addDoctor);  // ✅ Sirf Doctor Register karega

router.get("/",  getDoctors);
router.get("/me/:email", getDoctorByEmail);

// ✅ Doctor apni details fetch karega
router.get("/:id",  getDoctorById);
router.post("/",   addDoctor);  // ✅ Sirf Doctor Register karega


module.exports = router;
