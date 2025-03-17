import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['volunteer', 'intern'], 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other'], 
    required: true 
  },
  dob: { 
    type: Date, 
    required: true 
  },
  interests: [String],
  availability: { 
    type: String, 
    required: true 
  },
  reference: { 
    type: String 
  },
  // Volunteer-specific
  experience: { 
    type: String 
  },
  // Intern-specific
  course: { 
    type: String 
  },
  college: { 
    type: String 
  },
  duration: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['pending', 'interview', 'onboarded', 'rejected'], 
    default: 'pending' 
  },
  interviewDate: { 
    type: Date 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Applicant = mongoose.model('Applicant', applicantSchema);
export default Applicant; 