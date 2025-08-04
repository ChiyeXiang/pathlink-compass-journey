import { Student } from '../models/student';
import { IUser } from '../interfaces/IUser';

// 添加学生（用 IUser 结构+扩展）
export async function addStudent(student: IUser & { goal?: string }) {
  const newStudent = new Student(student);
  await newStudent.save();
}

// 获取所有学生
export async function getAllStudents(): Promise<(IUser & { goal?: string })[]> {
  return await Student.find();
}

// 通过邮箱查找学生
export async function findStudentByEmail(email: string): Promise<(IUser & { goal?: string }) | null> {
  return await Student.findOne({ email });
}


// // 查找所有用户（可选）
// export async function getAllUsers() {
//   return await User.find();
// }

// // 根据邮箱查找用户
// export async function findUserByEmail(email: string) {
//   return await User.findOne({ email });
// }

// // 添加新用户
// export async function addUser(user: { email: string, password: string }) {
//   const newUser = new User(user);
//   await newUser.save();
// }
