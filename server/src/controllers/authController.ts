import { Request, Response } from 'express';
import { User } from '../models/user';
import { addUser, findUserByEmail } from '../repositories/userRepository';
import { sendVerificationCode } from '../utils/mailer';
import { saveCode, verifyCode } from '../repositories/codeRepository';

// // test connection
// export const testController = (req: Request, res: Response) => {
//   res.json({ message: 'Auth Controller 正常' });
// };

export const register = async(req: Request, res: Response) => {
  const { name, email, password, confirmPassword, code} = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: '请填写所有字段' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: '两次输入的密码不一致' });
  }

  const isValid = verifyCode(email, code);
  if (!isValid) {
    return res.status(400).json({ message: '验证码无效或已过期' });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: '该邮箱已注册,请直接登陆' });
  }

  const newUser: User = { name, email, password };
  addUser(newUser);

  return res.status(201).json({ message: '注册成功', user: newUser });
};



export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: '请输入邮箱和密码' });
  }

  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    return res.status(400).json({ message: '该邮箱尚未注册' });
  }

  if (existingUser.password !== password) {
    return res.status(401).json({ message: '密码错误' });
  }

  return res.status(200).json({
    message: '登录成功',
    user: {
      name: existingUser.name,
      email: existingUser.email
    }
  });
};



export const sendCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: '请提供邮箱地址' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 六位数验证码

  try {
    await sendVerificationCode(email, code);
    saveCode(email, code); // 存储验证码用于验证
    return res.json({ message: '验证码发送成功' });
  } catch (err) {
    console.error('发送验证码失败:', err);
    return res.status(500).json({ message: '发送验证码失败，请稍后重试' });
  }
};


