import { Request, Response } from 'express';
import { Student } from '../models/student';

export const upsertWelcomeSurvey = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; 
    const { formData } = req.body;
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
