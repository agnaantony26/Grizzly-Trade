const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  ouID: { type: String, required: true, unique: true }, // New field for OU ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  university: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
