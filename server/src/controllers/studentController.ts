import { Request, Response } from 'express';
import { Student } from '../models/student';

// 写入：学生问卷
export const upsertWelcomeSurvey = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; 
    const { formData } = req.body || {};
    if (!userId || !formData) {
      return res.status(400).json({ message: '缺少 userId 或 formData' });
    }

    const update = {
      AppDegree: formData.AppDegree ?? [],
      multipleCountries: formData.multipleCountries ?? [],
      field: formData.field ?? [],
      DreamCountrySchool: formData.DreamCountrySchool ?? [],
      needs: formData.needs ?? [],
      targetDetails: formData.targetDetails ?? '',
      budgetPreference: formData.budgetPreference ?? [],
    };

    const student = await Student.findOneAndUpdate(
      { userId },
      { $set: update },
      { new: true, upsert: true } // 没有就创建
    );

    return res.json({ message: '问卷已保存', student });
  } catch (err:any) {
    console.error('保存问卷失败:', err);
    return res.status(500).json({ message: '保存问卷失败', detail: err?.message });
  }
};

// 写入：个人资料（profile-setup）
export const upsertStudentProfile = async (req: Request, res: Response) => {
  try {
    const uid = req.userId;
    if (!uid) return res.status(401).json({ message: '未认证' });

    const {
      name = '', phone = '',
      university = '', major = '', graduationYear = '',
      gpa = '', experience = '', interests = '', goals = '',
    } = req.body || {};

    const update = {
      name, phone,
      university, major, graduationYear,
      gpa, experience, interests, goals,
    };

    const student = await Student.findOneAndUpdate(
      { userId: uid },
      { $set: update },
      { new: true, upsert: true }
    );

    return res.json({ message: '资料已保存', student });
  } catch (err:any) {
    console.error('upsertStudentProfile error:', err);
    return res.status(500).json({ message: '保存失败', detail: err?.message });
  }
};
