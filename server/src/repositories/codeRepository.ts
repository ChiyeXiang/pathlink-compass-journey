// server/repositories/codeRepository.ts

import fs from 'fs/promises';
import path from 'path';
import { EmailCode } from '../models/code';

const codeFile = path.join(__dirname, '../data/codes.json');

async function getAllCodes(): Promise<EmailCode[]> {
  try {
    const data = await fs.readFile(codeFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveCode(email: string, code: string, ttl = 5 * 60 * 1000): Promise<void> {
  const expiresAt = Date.now() + ttl;
  let codes = await getAllCodes();

  // 删除旧的该 email 验证码
  codes = codes.filter(c => c.email !== email);

  // 添加新验证码
  codes.push({ email, code, expiresAt });

  await fs.writeFile(codeFile, JSON.stringify(codes, null, 2), 'utf-8');
}

// 验证验证码是否正确且未过期
export async function verifyCode(email: string, code: string): Promise<boolean> {
  const codes = await getAllCodes();
  const record = codes.find(c => c.email === email && c.code === code);
  if (!record) return false;
  if (Date.now() > record.expiresAt) return false;
  return true;
}
