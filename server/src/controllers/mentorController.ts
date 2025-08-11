// src/controllers/mentorController.ts
import { Request, Response } from 'express';
import { Mentor } from '../models/mentor';
import { ALL_TAGS } from '../../../shared/constants/tags';

const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
const isTime = (s: string) => /^\d{2}:\d{2}$/.test(s);

export const upsertMentorProfile = async (req: Request, res: Response) => {
  try {
    const { userId, payload } = req.body as {
      userId?: string;
      payload?: {
        displayName?: string;
        education?: string;
        summary?: string;
        expertise?: string[];
        tags?: string[];
        availability?: Array<{
          date: string; // YYYY-MM-DD
          slots: Array<{ start: string; end: string }>;
        }>;
        yearsExperience?: number;
        studentsHelped?: number;
      };
    };

    if (!userId || !payload) return res.status(400).json({ message: '缺少 userId 或 payload' });

    const clean: any = { userId };
    if (payload.displayName !== undefined) clean.displayName = String(payload.displayName).trim();
    if (payload.education   !== undefined) clean.education   = String(payload.education).trim();
    if (payload.summary     !== undefined) clean.summary     = String(payload.summary).trim();
    if (Array.isArray(payload.expertise))  clean.expertise   = payload.expertise.map(s => String(s).trim()).filter(Boolean);
    if (Array.isArray(payload.tags))       clean.tags        = payload.tags.filter(t => ALL_TAGS.includes(t)).slice(0, 3);

    if (Array.isArray(payload.availability)) {
      clean.availability = payload.availability
        .filter(d => d && typeof d.date === 'string' && isDate(d.date) && Array.isArray(d.slots))
        .map(d => ({
          date: d.date,
          slots: d.slots
            .filter(s => s && isTime(s.start) && isTime(s.end))
            .map(s => ({ start: s.start, end: s.end })),
        }));
    }

    if (typeof payload.yearsExperience === 'number') clean.yearsExperience = payload.yearsExperience;
    if (typeof payload.studentsHelped  === 'number') clean.studentsHelped  = payload.studentsHelped;

    const mentor = await Mentor.findOneAndUpdate(
      { userId },
      { $set: clean },
      { new: true, upsert: true }
    );

    return res.json({ message: '导师资料已保存', mentor });
  } catch (err: any) {
    console.error('保存导师资料失败:', err);
    return res.status(500).json({ message: '保存导师资料失败', detail: err?.message });
  }
};
