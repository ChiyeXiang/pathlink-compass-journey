import nodemailer from 'nodemailer';

export async function sendVerificationCode(email: string, code: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    transporter.verify((err, success) => {
      if (err) {
        console.error('SMTP 连接失败:', err);
      } else {
        console.log('SMTP 连接成功');
      }
    });

    await transporter.sendMail({
      from: `"PathLink 验证服务" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '【PathLink】注册验证码',
      html: `<p>您的验证码是：<b>${code}</b>，5分钟内有效。</p>`,
    });

    console.log('邮件发送成功');

  } catch (err) {
    console.error('发送邮件失败:', err);
    throw new Error('发送验证码失败，请稍后重试');
  }
}
