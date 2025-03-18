import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['volunteer', 'intern'],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,

    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    interests: {
      type: [String],
      required: true,
    },
    availability: {
      type: String,
      required: true,
      trim: true,
    },
    reference: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
      required: function () {
        return this.type === 'volunteer';
      },
    },
    course: {
      type: String,
      trim: true,
      required: function () {
        return this.type === 'intern';
      },
    },
    college: {
      type: String,
      trim: true,
      required: function () {
        return this.type === 'intern';
      },
    },
    duration: {
      type: String,
      trim: true,
      required: function () {
        return this.type === 'intern';
      },
    },
    status: {
      type: String,
      enum: ['pending', 'interview', 'onboarded', 'rejected'],
      default: 'pending',
    },
    interviewDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Ensure interviewDate is set only if status is "interview"
applicantSchema.pre('save', function (next) {
  if (this.interviewDate && this.status === 'pending') {
    this.status = 'interview';
  }
  next();
});

const Applicant = mongoose.model('Applicant', applicantSchema);
export default Applicant;
