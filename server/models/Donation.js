import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  screenshotPath: { 
    type: String 
  },
  email: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  mode: { 
    type: String, 
    required: true 
  },
  utr: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  receiptRequested: { 
    type: Boolean, 
    default: true 
  },
  receiptGenerated: { 
    type: Boolean, 
    default: false 
  }
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation; 