import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [200, "Title cannot exceed 200 characters"]
    },
    Announcement: {
      type: String,
      required: [true, "Announcement content is required"],
      trim: true,
      minlength: [1, "Announcement content cannot be empty"],
      maxlength: [1000, "Announcement content cannot exceed 1000 characters"]
    },
    order: {
      type: Number,
      required: [true, "Order is required"],
      min: [1, "Order must be a positive number"],
      default: 1
    },
  },
  {
    timestamps: true,
    strict: true // Enforce strict schema
  }
);

// Add index for order field to improve sorting performance
announcementSchema.index({ order: 1 });

// Pre-save middleware to ensure order is an integer
announcementSchema.pre('save', function(next) {
  if (this.order) {
    this.order = Math.floor(Number(this.order));
    if (this.order < 1) this.order = 1;
  }
  next();
});

// Pre-update middleware to ensure order is an integer
announcementSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.order) {
    update.order = Math.floor(Number(update.order));
    if (update.order < 1) update.order = 1;
  }
  next();
});

// Add error handling for validation
announcementSchema.post('save', function(error, doc, next) {
  if (error.name === 'ValidationError') {
    next(new Error(Object.values(error.errors).map(err => err.message).join(', ')));
  } else {
    next(error);
  }
});

announcementSchema.post('findOneAndUpdate', function(error, doc, next) {
  if (error.name === 'ValidationError') {
    next(new Error(Object.values(error.errors).map(err => err.message).join(', ')));
  } else {
    next(error);
  }
});

// Create and compile the model
const AnnouncementModel = mongoose.model("Announcement", announcementSchema);

// Export the model
export default AnnouncementModel;
