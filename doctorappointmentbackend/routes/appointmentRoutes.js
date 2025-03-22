const express = require('express');
const { bookAppointment, getAppointmentsByDoctor } = require('../controller/appointmentController');

const router = express.Router();

router.post('/', bookAppointment);
router.get('/:doctorId', getAppointmentsByDoctor);

module.exports = router;
