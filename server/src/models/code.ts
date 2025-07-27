export interface EmailCode {
  email: string;
  code: string;
  expiresAt: number; // 时间戳
}
