import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export type JwtPayload = { userId?: string; iat?: number; exp?: number };

// 扩展 Request 类型，后续控制器里可以 req.userId 直接用
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function authRequired(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未提供Token' });
  }
  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    if (!decoded.userId) {
      return res.status(401).json({ message: '无效Token（缺少userId）' });
    }
    req.userId = decoded.userId; 
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token无效或过期' });
  }
}

