import { Request, Response } from 'express';
import { Mentor } from '../models/mentor';
import { ALL_TAGS } from '../../../shared/constants/tags';
import * as jwt from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/userRepository';

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


export const listMentors = async (req: Request, res: Response) => {
  try {
    // 列表查询（可选：q 关键词、tag 标签、分页）
    const q = (req.query.q as string) || '';
    const tag = (req.query.tag as string) || '';
    const page = Math.max(parseInt((req.query.page as string) || '1', 10), 1);
    const pageSize = Math.min(Math.max(parseInt((req.query.pageSize as string) || '12', 10), 1), 50);

    const filter: any = {};
    if (q) {
      const kw = new RegExp(q, 'i');
      filter.$or = [
        { displayName: kw },
        { education: kw },
        { summary: kw },
        { expertise: kw }, // expertise 是数组，Mongo 会匹配任一元素
      ];
    }
    if (tag) {
      filter.tags = tag;
    }

    const skip = (page - 1) * pageSize;

    const [rows, total] = await Promise.all([
      Mentor.find(filter)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .select({
          _id: 0,
          userId: 1,
          displayName: 1,
          education: 1,
          summary: 1,
          expertise: 1,
          tags: 1,
          availability: 1,
          updatedAt: 1,
        })
        .lean(),
      Mentor.countDocuments(filter),
    ]);

    res.json({
      data: rows,
      total,
      page,
      pageSize,
      hasMore: page * pageSize < total,
    });
  } catch (err) {
    console.error('listMentors error:', err);
    res.status(500).json({ message: '服务器错误' });
  }
};

export const getMentorProfileFromSquare = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
      return res.status(401).json({ message: '未提供 Token' });
    }
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };

    // 通过 email 找到 User，再拿 userId
    const user = await findUserByEmail(decoded.email);
    if (!user) return res.status(404).json({ message: '用户不存在' });

    const mentor = await Mentor.findOne({ userId: user.userId });
    if (!mentor) return res.status(404).json({ message: '未找到该导师' });

    return res.json(mentor);
  } catch (err) {
    console.error('getMyMentorProfile error:', err);
    return res.status(401).json({ message: 'Token 无效或过期' });
  }
};

