// server/repositories/userRepository.ts
import fs from 'fs/promises';
import path from 'path';
import { User } from '../models/user';

const usersFile = path.join(__dirname, '../data/users.json');

// 读取所有用户
export async function getAllUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// 根据邮箱查找用户
export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getAllUsers();
  return users.find(u => u.email === email);
}

// 添加新用户
export async function addUser(user: User): Promise<void> {
  const users = await getAllUsers();
  users.push(user);
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}
