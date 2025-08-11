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

