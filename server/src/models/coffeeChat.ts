import mongoose from 'mongoose';

const CoffeeChatSchema = new mongoose.Schema(
  {
    studentUserId: { type: String, required: true },     // 学生 userId（从 token 解出来）
    mentorUserId:  { type: String, required: true },     // 导师 userId（前端传）
    startTime:     { type: Date,   required: true },     // 开始时间（UTC）
    endTime:       { type: Date,   required: true },     // 结束时间（UTC）
    questions:     { type: String, default: '' },        // 学生给导师的备注/问题
    meetingUrl:    { type: String, default: '' },        // 腾讯会议链接（暂用占位，后续接入）
    status:        { type: String, enum: ['scheduled','cancelled','completed'], default: 'scheduled' }
  },
  { timestamps: true }
);

export const CoffeeChat = mongoose.model('CoffeeChat', CoffeeChatSchema);
