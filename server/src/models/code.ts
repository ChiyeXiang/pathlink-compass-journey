// export interface EmailCode {
//   email: string;
//   code: string;
//   expiresAt: number; // 时间戳
// }


import mongoose from 'mongoose';

const EmailCodeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Number, required: true }
});

export const EmailCode = mongoose.model('EmailCode', EmailCodeSchema);
