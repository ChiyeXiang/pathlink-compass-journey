import mongoose from 'mongoose';
import { ALL_TAGS } from "../../../shared/constants/tags";

const TimeSlotSchema = new mongoose.Schema(
  {
    start: { type: String, match: /^\d{2}:\d{2}$/, required: true }, // HH:mm
    end:   { type: String, match: /^\d{2}:\d{2}$/, required: true },
  },
  { _id: false }
);

const DateAvailabilitySchema = new mongoose.Schema(
  {
    date:  { type: String, match: /^\d{4}-\d{2}-\d{2}$/, required: true }, // YYYY-MM-DD
    slots: { type: [TimeSlotSchema], default: [] },
  },
  { _id: false }
);

const MentorSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true }, // 关联 User 表
    displayName: { type: String, required: true },          // 称呼
    expertise: { type: [String], default: [] },             // 擅长科目/方向
    education: { type: String, default: '' },               // 学历或专业背景
    summary: { type: String, default: '' },                 // 一句个人概括（如：有什么优势，有多少年，多少学生的从业经验）（示例：专注于商科申请5年+，累计帮助120+学生成功申请梦校）
    tags: { type: [String], enum: ALL_TAGS, default: [] },  // 标签
    availability: { type: [DateAvailabilitySchema], default: [] },  // 有空的时间

      // 向量与文本
      embedText: { type: String, default: '' },
      embedding: { type: [Number], default: [] },
  },
  { timestamps: true }
);

export const Mentor = mongoose.model('Mentor', MentorSchema);
