import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/userRepository';
import { Student } from '../models/student';
import { Mentor } from '../models/mentor';
import { User } from '../models/user';

// 获取当前用户的基本信息（User）
export const getCurrentUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未提供Token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };

    const user = await findUserByEmail(decoded.email);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    return res.json({
      name: user.name,
      email: user.email,
      userId: user.userId,
      createdAt: user.createdAt,
    });
  } catch {
    return res.status(401).json({ message: 'Token无效或过期' });
  }
};

// 获取学生信息
export const getStudentProfile = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const student = await Student.findOne({ userId });
    if (!student) {
      return res.status(404).json({ message: '未找到该学生' });
    }

    return res.json(student);
  } catch (error) {
    console.error('获取学生信息失败:', error);
    return res.status(500).json({ message: '服务器错误' });
  }
};

// 获取导师信息
export const getMentorProfile = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const mentor = await Mentor.findOne({ userId });
    if (!mentor) {
      return res.status(404).json({ message: '未找到该导师' });
    }

    return res.json(mentor);
  } catch (error) {
    console.error('获取导师信息失败:', error);
    return res.status(500).json({ message: '服务器错误' });
  }
};
