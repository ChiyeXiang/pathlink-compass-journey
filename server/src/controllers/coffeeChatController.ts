import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { CoffeeChat } from '../models/coffeeChat';
import { Mentor } from '../models/mentor';

type CreateBody = {
  mentorUserId: string;
  date: string;        // YYYY-MM-DD
  time: string;        // "HH:mm - HH:mm"
  questions?: string;
};

// 简单的“创建腾讯会议”占位方法（未来换成真实 API）
async function createTencentMeetingPlaceholder(startISO: string, endISO: string, topic: string) {
  // TODO: 使用腾讯会议开放平台创建会议，拿到真正的 join_url
  // 现在先返回一个占位链接，避免前端卡住
  return `https://meeting.tencent.com/dummy?topic=${encodeURIComponent(topic)}&start=${encodeURIComponent(startISO)}`;
}

// 帮助函数：把 "2025-08-20" + "19:00 - 19:30" 转换为 UTC Date
function toUtcDate(dateYmd: string, hm: string, tz = 'Asia/Shanghai') {
  // 这里用原生 Date 简化：转本地再 toISOString；
  // 更严谨可用 luxon/dayjs-timezone
  const [hour, minute] = hm.split(':').map(Number);
  const [y, m, d] = dateYmd.split('-').map(Number);
  const local = new Date(y, (m - 1), d, hour, minute, 0);
  return new Date(local.getTime() - local.getTimezoneOffset() * 60000); // 近似转 UTC
}

export const createCoffeeChat = async (req: Request<{}, {}, CreateBody>, res: Response) => {
  try {
    const studentUserId = req.userId;
    if (!studentUserId) {
      return res.status(401).json({ message: '无效Token（没有userId）' });
    }

    const { mentorUserId, date, time, questions } = req.body;
    if (!mentorUserId || !date || !time) {
      return res.status(400).json({ message: '缺少必填字段：mentorUserId / date / time' });
    }

    // 校验导师是否存在
    const mentor = await Mentor.findOne({ userId: mentorUserId });
    if (!mentor) return res.status(404).json({ message: '导师不存在' });

    // 解析时间段
    const [startHm, endHm] = time.split('-').map(s => s.trim()); // "19:00" / "19:30"
    const start = toUtcDate(date, startHm);
    const end   = toUtcDate(date, endHm);

    if (!(start instanceof Date) || isNaN(+start) || !(end instanceof Date) || isNaN(+end)) {
      return res.status(400).json({ message: '时间格式错误' });
    }
    if (end <= start) {
      return res.status(400).json({ message: '结束时间必须晚于开始时间' });
    }

    // （可选）校验传入时间是否在导师的 availability 中
    // 只做“包含”校验的简化：date 匹配 && 有任一 slot 覆盖
    const availableDay = (mentor.availability || []).find(a => a.date === date);
    const isCovered = availableDay?.slots?.some(s => {
      return s.start <= startHm && s.end >= endHm;
    });
    if (!isCovered) {
      // 你可以选择允许“非可约时间也允许预约”，此处我选择拒绝，避免脏数据
      return res.status(400).json({ message: '所选时间不在导师可约时间内' });
    }

    // 创建腾讯会议（占位）
    const meetingUrl = await createTencentMeetingPlaceholder(start.toISOString(), end.toISOString(), `CoffeeChat-${studentUserId}-${mentorUserId}`);

    // 入库
    const chat = await CoffeeChat.create({
      studentUserId,
      mentorUserId,
      startTime: start,
      endTime: end,
      questions: questions || '',
      meetingUrl
    });

    return res.status(201).json({ message: '已创建 CoffeeChat', chat });
  } catch (err: any) {
    console.error('创建 CoffeeChat 失败:', err);
    return res.status(500).json({ message: '服务器错误', detail: err?.message });
  }
};
