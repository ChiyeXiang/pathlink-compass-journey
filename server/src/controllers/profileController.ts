import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/userRepository';
import { Student } from '../models/student';
import { Mentor } from '../models/mentor';
import { User } from '../models/user';

// 获取当前用户的基本信息（User）
export const getCurrentUser = async (req: Request, res: Response) => {
  if (!req.userId) return res.status(401).json({ message: '未授权' });
  const user = await User.findOne({ userId: req.userId }).lean();
  if (!user) return res.status(404).json({ message: '用户不存在' });

  res.json({
    name: user.name,
    email: user.email,
    userId: user.userId,
    createdAt: user.createdAt,
  });
};

// 获取学生信息
// export const getStudentProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = req.userId;
//     const student = await Student.findOne({ userId });
//     if (!student) {
//       return res.status(404).json({ message: '未找到该学生' });
//     }

//     return res.json(student);
//   } catch (error) {
//     console.error('获取学生信息失败:', error);
//     return res.status(500).json({ message: '服务器错误' });
//   }
// };

// 读取当前用户的学生资料（用于前端预填）
export const getStudentProfile = async (req: Request, res: Response) => {
  try {
    const uid = req.userId;
    if (!uid) return res.status(401).json({ message: '未认证' });

    const student = await Student.findOne({ userId: uid }).lean();
    if (!student) {
      return res.status(404).json({ message: '未找到该学生' });
    }
    return res.json(student || null);
  } catch (err: any) {
    console.error('getMyStudentProfile error:', err);
    return res.status(500).json({ message: '加载失败', detail: err?.message });
  }
};


// 获取导师信息
export const getMentorProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const mentor = await Mentor.findOne({ userId });
    if (!mentor) {
      return res.json({ userId, displayName: "", education: "", summary: "", expertise: [], tags: [], availability: [] });
    }

    return res.json(mentor);
  } catch (error) {
    console.error('获取导师信息失败:', error);
    return res.status(500).json({ message: '服务器错误' });
  }
};
