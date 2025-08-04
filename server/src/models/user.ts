// export interface User {
//   name: string;
//   email: string;
//   password: string;
// }

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: {type: String, unique:true}
  },
  {timestamps: true}
);

export const User = mongoose.model('User', UserSchema);
