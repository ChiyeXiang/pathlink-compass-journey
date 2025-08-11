// export interface User {
//   name: string;
//   email: string;
//   password: string;
// }

// 现在已经将User写成了interface（IUser），IUser可以分为student和mentor等类型；所以，这个文件其实可以删除了。暂时保留。
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
