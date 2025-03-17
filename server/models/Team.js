import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  contactNumber: { 
    type: String, 
    required: true 
  },
  whatsappNumber: { 
    type: String 
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
  reference: { 
    type: String 
  },
  availability: { 
    type: String, 
    required: true 
  },
  ngoExperience: { 
    type: Boolean, 
    default: false 
  },
  identityProofPath: { 
    type: String 
  },
  passportPhotoPath: { 
    type: String 
  },
  workMode: { 
    type: String, 
    enum: ['online', 'offline', 'hybrid'], 
    required: true 
  },
  teamType: { 
    type: String, 
    enum: ['volunteer', 'intern'], 
    required: true 
  },
  department: { 
    type: String, 
    required: true 
  },
  joiningDate: { 
    type: Date, 
    required: true 
  }
});

const Team = mongoose.model('Team', teamSchema);
export default Team; 