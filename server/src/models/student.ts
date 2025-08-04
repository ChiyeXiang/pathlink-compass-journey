import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';

const StudentSchema = new mongoose.Schema<IUser & {
  goal?: string; // Student 专属字段
}>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String, unique: true }, // 替代 studentId，更通用
    userType: { type: String, enum: ['student'], default: 'student' },
    goal: { type: String },
  },
  { timestamps: true } 
);

export const Student = mongoose.model('Student', StudentSchema);
