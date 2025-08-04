// // server/repositories/userRepository.ts
// import fs from 'fs/promises';
// import path from 'path';
// import { User } from '../models/user';

// const usersFile = path.join(__dirname, '../data/users.json');

// // 读取所有用户
// export async function getAllUsers(): Promise<User[]> {
//   try {
//     const data = await fs.readFile(usersFile, 'utf-8');
//     return JSON.parse(data);
//   } catch {
//     return [];
//   }
// }

// // 根据邮箱查找用户
// export async function findUserByEmail(email: string): Promise<User | undefined> {
//   const users = await getAllUsers();
//   return users.find(u => u.email === email);
// }

// // 添加新用户
// export async function addUser(user: User): Promise<void> {
//   const users = await getAllUsers();
//   users.push(user);
//   await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf-8');
// }


// server/src/repositories/userRepository.ts

import { User } from '../models/user';

// 查找所有用户（可选）
export async function getAllUsers() {
  return await User.find();
}

// 根据邮箱查找用户
export async function findUserByEmail(email: string) {
  return await User.findOne({ email });
}

// 添加新用户
export async function addUser(user: { email: string, password: string }) {
  const newUser = new User(user);
  await newUser.save();
}
