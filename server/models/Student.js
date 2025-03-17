import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other'], 
    required: true 
  },
  fatherName: { 
    type: String, 
    required: true 
  },
  motherName: { 
    type: String, 
    required: true 
  },
  dob: { 
    type: Date, 
    required: true 
  },
  admissionDate: { 
    type: Date, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  area: { 
    type: String, 
    required: true 
  },
  contactNumber: { 
    type: String, 
    required: true 
  },
  admittedInSchool: { 
    type: Boolean, 
    default: false 
  },
  schoolName: { 
    type: String 
  },
  classStudying: { 
    type: String 
  },
  aadharCard: { 
    type: String 
  },
  endDate: { 
    type: Date 
  }
});

const Student = mongoose.model('Student', studentSchema);
export default Student; 