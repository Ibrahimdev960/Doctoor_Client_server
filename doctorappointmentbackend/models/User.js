const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'user', 'doctor'], default: 'user' }  // ✅ Doctor Role Added
});

module.exports = mongoose.model('User', userSchema);
