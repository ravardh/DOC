const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['volunteer', 'intern'], required: true },
  DOB: { type: Date, required: true },
  DOJ: { type: Date, required: true },
  DOL: { type: Date },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  qualification: { type: String, required: true },
  position: { type: String },
  department: { type: String },
  status: { type: String, default: 'active' },
  interests: { 
    type: String, 
    enum: ['teaching', 'fundraising', 'events', 'social-media', 'graphic-Designing', 'content-writing', 'administration'],
    required: true 
  },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Volunteer', volunteerSchema); 