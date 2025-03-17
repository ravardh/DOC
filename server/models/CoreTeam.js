import mongoose from 'mongoose';

const coreTeamSchema = new mongoose.Schema({
  profilePhotoPath: { 
    type: String 
  },
  name: { 
    type: String, 
    required: true 
  },
  position: { 
    type: String, 
    required: true 
  },
  linkedin: { 
    type: String 
  },
  instagram: { 
    type: String 
  },
  active: { 
    type: Boolean, 
    default: true 
  },
  joiningDate: { 
    type: Date, 
    required: true 
  },
  endingDate: { 
    type: Date 
  },
  order: { 
    type: Number, 
    required: true 
  }
});

const CoreTeam = mongoose.model('CoreTeam', coreTeamSchema);
export default CoreTeam; 