import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { useAuth } from "@/contexts/AuthContext";
import { User, Lock, ArrowLeft, ArrowRight, Mail } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: ""
  });
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 如果用户已经登录，重定向到目标页面或默认页面
  const from = location.state?.from?.pathname || '/welcome';

  // 如果用户已经登录，自动重定向
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

  const canProceed = () => {
    return registerData.email !== "" && 
           registerData.password !== "" && 
           registerData.confirmPassword !== "" && 
           registerData.name !== "" && 
           registerData.password === registerData.confirmPassword && 
           registerData.code !== "";
  };

  const canSendCode = () => {
    return registerData.email !== "" && 
           registerData.password !== "" && 
           registerData.confirmPassword !== "" && 
           registerData.password === registerData.confirmPassword && 
           countdown === 0;
  };

  const getPasswordError = () => {
    if (registerData.confirmPassword !== "" && registerData.password !== registerData.confirmPassword) {
      return "两次输入的密码不一致";
    }
    return "";
  };

  const handleSendCode = async () => {
    if (!canSendCode()) {
      const passwordError = getPasswordError();
      if (passwordError) {
        alert(passwordError);
      } else if (!registerData.email) {
        alert('请先填写邮箱');
      } else if (!registerData.password) {
        alert('请先填写密码');
      } else if (!registerData.confirmPassword) {
        alert('请先填写确认密码');
      }
      return;
    }
    
    setIsSendingCode(true);
    try {
      // 模拟发送验证码的API调用
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: registerData.email
        })
      });

      if (res.ok) {
        alert('验证码已发送到您的邮箱');
        // 开始倒计时
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        const data = await res.json();
        alert(data.message || '发送验证码失败');
      }
    } catch (err) {
      console.error('发送验证码失败:', err);
      alert('网络错误，请稍后重试');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed()) {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registerData)
        });

        const data = await res.json();

        if (res.ok) {
          login(data.token);
          alert('注册成功：' + data.message);
          navigate(from);
        } else {
          alert('注册失败：' + data.message || '未知错误');
          // 注册失败时保留在注册界面，不跳转
          return;
        }
      } catch (err) {
        console.error('注册失败:', err);
        alert('网络错误，请稍后重试');
        // 注册失败时保留在注册界面，不跳转
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
      <PageHeader showHomeButton={true} showProfileButtons={false} />

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-lg">
          {/* Register Form */}
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center mb-4">
                <User className="w-8 h-8 mr-4 text-[#15b078]" />
                用户注册
              </h1>
              <p className="text-lg text-gray-600">
                创建账号，开启您的申请之路
              </p>
            </div>
            
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base font-medium mb-2 block">姓名</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="请输入您的姓名"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-medium mb-2 block">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入您的邮箱"
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-base font-medium mb-2 block">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-base font-medium mb-2 block">确认密码</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="请再次输入密码"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className={`h-12 text-base ${getPasswordError() ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {getPasswordError() && (
                    <p className="text-red-500 text-sm mt-1">{getPasswordError()}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="code" className="text-base font-medium mb-2 block">验证码</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="code"
                      type="text"
                      placeholder="请输入验证码"
                      value={registerData.code}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, code: e.target.value }))}
                      className="h-12 text-base flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleSendCode}
                      disabled={!canSendCode() || isSendingCode}
                      className="h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {countdown > 0 ? `${countdown}s` : isSendingCode ? '发送中...' : '获取验证码'}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {getPasswordError() 
                      ? "请确保两次输入的密码一致" 
                      : !registerData.email 
                        ? "请先填写邮箱" 
                        : !registerData.password 
                          ? "请先填写密码" 
                          : !registerData.confirmPassword 
                            ? "请先填写确认密码" 
                            : "点击获取验证码"
                    }
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-medium bg-gradient-to-r from-[#15b078] to-[#394b41] hover:from-[#394b41] hover:to-[#15b078] text-white"
                  disabled={!canProceed()}
                >
                  <Lock className="w-5 h-5 mr-3" />
                  注册
                </Button>
              </form>

              {/* 跳转到登录界面的提示 */}
              <div className="text-center">
                <p className="text-gray-600 mb-2">
                  已经有账号？
                </p>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="text-[#15b078] hover:text-[#394b41] hover:bg-[#15b078]/10"
                >
                  <span>点击直接登录</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
