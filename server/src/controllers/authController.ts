import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { Student } from '../models/student';
import { addStudent, findStudentByEmail } from '../repositories/studentRepository';
import { saveCode, verifyCode } from '../repositories/codeRepository';
import { sendVerificationCode } from '../utils/mailer';
import { IUser } from '../interfaces/IUser';

// 注册学生
export const registerStudent = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword, code, goal } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: '请填写所有字段' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: '两次输入的密码不一致' });
  }

  const isValid = await verifyCode(email, code);
  if (!isValid) {
    return res.status(400).json({ message: '验证码无效或已过期' });
  }

  const existing = await findStudentByEmail(email);
  if (existing) {
    return res.status(400).json({ message: '该邮箱已注册，请直接登录' });
  }

  // 生成 userId（studentId）
  const userId = `STU${new Date().getFullYear()}${uuidv4().slice(0, 6).toUpperCase()}`;

  const newStudent = new Student({
    name,
    email,
    password,
    userId,
    goal,
    userType: 'student'
  });

  await newStudent.save();

  const token = jwt.sign(
    { email: newStudent.email, name: newStudent.name, role: 'student' },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  return res.status(201).json({
    message: '注册成功',
    student: {
      name: newStudent.name,
      email: newStudent.email,
      goal: newStudent.goal,
      userId: newStudent.userId,
      userType: newStudent.userType,
    },
    token
  });
};

// 登录学生
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const student = await findStudentByEmail(email);
  if (!student) {
    return res.status(400).json({ message: '该邮箱尚未注册' });
  }

  if (student.password !== password) {
    return res.status(401).json({ message: '密码错误' });
  }

  const token = jwt.sign(
    { email: student.email, name: student.name, role: 'student' },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  return res.status(200).json({
    message: '登录成功',
    student: {
      name: student.name,
      email: student.email,
      userId: student.userId,
      userType: student.userType,
      goal: student.goal,
    },
    token
  });
};

// 获取当前登录学生信息
export const getCurrentStudent = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未提供Token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };

    const student = await findStudentByEmail(decoded.email);
    if (!student) {
      return res.status(404).json({ message: '用户不存在' });
    }

    return res.json({
      name: student.name,
      email: student.email,
      goal: student.goal,
      userId: student.userId,
      userType: student.userType,
      createdAt: student.createdAt,
    });
  } catch {
    return res.status(401).json({ message: 'Token无效或过期' });
  }
};

// 发送验证码
export const sendCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await sendVerificationCode(email, code);
    await saveCode(email, code);
    return res.json({ message: '验证码发送成功' });
  } catch (err) {
    console.error('发送验证码失败:', err);
    return res.status(500).json({ message: '发送验证码失败，请稍后重试' });
  }
};




// export const register = async(req: Request, res: Response) => {
//   const { name, email, password, confirmPassword, code} = req.body;

//   if (!name || !email || !password || !confirmPassword) {
//     return res.status(400).json({ message: '请填写所有字段' });
//   }

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: '两次输入的密码不一致' });
//   }

//   const isValid = verifyCode(email, code);
//   if (!isValid) {
//     return res.status(400).json({ message: '验证码无效或已过期' });
//   }

//   const existingUser = await findUserByEmail(email);
//   if (existingUser) {
//     return res.status(400).json({ message: '该邮箱已注册,请直接登陆' });
//   }

//   const shortId = uuidv4().slice(0, 6).toUpperCase(); 
//   const userId = `STU${new Date().getFullYear()}${shortId}`;
//   const newUser = new User({ name, email, password, userId});
//   await newUser.save();

//   const token = jwt.sign(
//     { email: newUser.email, name: newUser.name },
//     process.env.JWT_SECRET as string,
//     { expiresIn: '7d' }
//   );

//   return res.status(201).json({ message: '注册成功', user: newUser , token});
// };



// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: '请输入邮箱和密码' });
//   }

//   const existingUser = await findUserByEmail(email);

//   if (!existingUser) {
//     return res.status(400).json({ message: '该邮箱尚未注册' });
//   }

//   if (existingUser.password !== password) {
//     return res.status(401).json({ message: '密码错误' });
//   }

//   // JWT Token
//   const token = jwt.sign(
//     { email: existingUser.email, name: existingUser.name },
//     process.env.JWT_SECRET as string,
//     { expiresIn: '7d' } // 7 天有效
//   );

//   return res.status(200).json({
//     message: '登录成功',
//     user: {
//       name: existingUser.name,
//       email: existingUser.email
//     },
//     token
//   });
// };



// export const sendCode = async (req: Request, res: Response) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: '请提供邮箱地址' });
//   }

//   const code = Math.floor(100000 + Math.random() * 900000).toString(); // 六位数验证码

//   try {
//     await sendVerificationCode(email, code);
//     saveCode(email, code); // 存储验证码用于验证
//     return res.json({ message: '验证码发送成功' });
//   } catch (err) {
//     console.error('发送验证码失败:', err);
//     return res.status(500).json({ message: '发送验证码失败，请稍后重试' });
//   }
// };

// export const getCurrentUser = async (req: Request, res: Response) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: '未提供Token' });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
//       email: string;
//     };

//     const user = await User.findOne({ email: decoded.email });
//     if (!user) {
//       return res.status(404).json({ message: '用户不存在' });
//     }

//     return res.json({
//       name: user.name,
//       email: user.email,
//       userId: user.userId,
//       createdAt: user.createdAt,
//       // createdAt: user.createdAt,
//       // goal: user.goal || ''
//     });
//   } catch (err) {
//     return res.status(401).json({ message: 'Token无效或过期' });
//   }
// };



