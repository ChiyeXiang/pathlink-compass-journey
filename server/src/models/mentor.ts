import mongoose from 'mongoose';

const MentorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  expertise: [String],
  hourlyRate: Number,
  mentorId: String,
  userType: { type: String, default: 'mentor' }
}, { timestamps: true });

export const Mentor = mongoose.model('Mentor', MentorSchema);
