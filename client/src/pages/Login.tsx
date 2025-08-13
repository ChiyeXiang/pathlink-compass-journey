import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { useAuth } from "@/contexts/AuthContext";
import { User, Lock, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const location = useLocation();
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    code: ""
  });

  // 如果用户已经登录，重定向到目标页面或默认页面
  const from = location.state?.from?.pathname || '/welcome';

    // 页面加载时检查 token 是否存在
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);
  
  

  const canProceed = () => {
    return loginData.email !== "" && loginData.password !== "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed()) {
      if (isLoginMode) {
      if (loginData.email && loginData.password) {
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: loginData.email,
              password: loginData.password
            })
          });

          const data = await res.json();

          if (!res.ok) {
            alert(data.message || '登录失败');
          } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setIsLoggedIn(true);
            navigate('/mentor-square');
          }
        } catch (err) {
          console.error(err);
          alert('网络错误，请稍后重试');
        }
      }
    } else {
      if (
        loginData.email &&
        loginData.password &&
        loginData.confirmPassword &&
        loginData.name &&
        loginData.password === loginData.confirmPassword
      ) {
        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
          });

          const data = await res.json();

          if (res.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

            alert('注册成功：' + data.message);
            setIsLoggedIn(true);
            navigate('/welcome');
          } else {
            alert('注册失败：' + data.message || '未知错误');
          }
        } catch (err) {
          console.error('注册出错', err);
          alert('网络错误或服务器未响应');
        }
      }


    }
      navigate('/mentor-square');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
      <PageHeader showHomeButton={true} showProfileButtons={false} />

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-lg">
          {/* Login Form */}
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center mb-4">
                <User className="w-8 h-8 mr-4 text-[#15b078]" />
                用户登录
              </h1>
              <p className="text-lg text-gray-600">
                登录您的账号开始智能申请之旅
              </p>
            </div>
            
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-base font-medium mb-2 block">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入您的邮箱"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-base font-medium mb-2 block">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="h-12 text-base"
                  />
                </div>

                {!isLoginMode && (
                <div>
                  <Label htmlFor="confirmPassword">确认密码</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="请再次输入密码"
                    value={loginData.confirmPassword}
                    onChange={(e) => setLoginData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                  {loginData.password !== loginData.confirmPassword && loginData.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">密码不匹配</p>
                  )}
                </div>
              ) 
              }

                {!isLoginMode && (
                  <div>
                    <Label htmlFor="code">邮箱验证码</Label>
                    <div className="flex gap-2">
                      <Input
                        id="code"
                        type="text"
                        placeholder="请输入邮箱验证码"
                        value={loginData.code}
                        onChange={(e) => setLoginData(prev => ({ ...prev, code: e.target.value }))}
                      />
                      <Button
                        variant="secondary"
                        onClick={async () => {
                          if (!loginData.email) return alert("请先填写邮箱");
                          try {
                            const res = await fetch('/api/auth/send-code', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({ email: loginData.email })
                            });
                            const data = await res.json();
                            if (res.ok) {
                              alert("验证码已发送，请检查邮箱");
                            } else {
                              alert("发送失败：" + data.message);
                            }
                          } catch (err) {
                            console.error('验证码发送失败', err);
                            alert('网络错误，无法发送验证码');
                          }
                        }}
                      >
                        获取验证码
                      </Button>
                    </div>
                  </div>

              )

              }


                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-medium bg-gradient-to-r from-[#15b078] to-[#394b41] hover:from-[#394b41] hover:to-[#15b078] text-white"
                  disabled={!canProceed()}
                >
                  <Lock className="w-5 h-5 mr-3" />
                  登录
                </Button>
              </form>
              
              {/* 跳转到注册界面的提示 */}
              <div className="text-center">
                <p className="text-gray-600 mb-2">
                  还没有账号？
                </p>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/register')}
                  className="text-[#15b078] hover:text-[#394b41] hover:bg-[#15b078]/10"
                >
                  <span>点击注册</span>
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

export default Login; 