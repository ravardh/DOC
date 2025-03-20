import mongoose from "mongoose";

const coreTeamSchema = new mongoose.Schema(
  {
    profilePhotoPath: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CoreTeam = mongoose.model("CoreTeam", coreTeamSchema);
export default CoreTeam;
