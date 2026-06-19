import mongoose from "mongoose";

const instructorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    profilePhoto: {
      type: String,
      default: "https://res.cloudinary.com/demo/image/upload/v1583247012/user-placeholder.png",
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    expertise: {
      type: [String],
      default: [],
    },
    experience: {
      type: String, // e.g. "5 years", "10+ years"
    },
    qualification: {
      type: String,
    },
    teachingCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    city: String,
    country: String,
    payoutDetails: {
      bankName: String,
      accountNumber: String,
      routingNumber: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("InstructorProfile", instructorProfileSchema);