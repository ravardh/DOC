import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  certificateName: {
    type: String,
    required: true
  },
  issuedBy: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    default: null
  },
  documentUrl: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);