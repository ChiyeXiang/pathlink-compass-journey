import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, ArrowLeft } from "lucide-react";
import { ShineBorder } from "@/components/magicui/shine-border";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    code: ""
  });

    // 页面加载时检查 token 是否存在
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);
  
  

  const canProceed = () => {
    if (isLoginMode) {
      return loginData.email !== "" && loginData.password !== "";
    } else {
      return loginData.email !== "" && loginData.password !== "" && loginData.confirmPassword !== "" && loginData.name !== "" && loginData.password === loginData.confirmPassword && loginData.code !== "";
    }
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
            navigate('/mentor-marketplace');
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
      navigate('/mentor-marketplace');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回首页
        </Button>

        {/* Login Card */}
        <ShineBorder shineColor="#15B078" duration={2000}>
          <Card className="shadow-soft border-0 relative overflow-hidden rounded-xl">
            <CardHeader>
                             <CardTitle className="text-xl flex items-center justify-center">
                 <User className="w-6 h-6 mr-3 text-[#15b078]" />
                 {isLoginMode ? "用户登录" : "用户注册"}
               </CardTitle>
              <p className="text-muted-foreground text-center">
                {isLoginMode ? "登录您的账号开始智能申请之旅" : "创建账号，开启您的申请之路"}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="请输入您的姓名"
                      value={loginData.name}
                      onChange={(e) => setLoginData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入您的邮箱"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
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
                   className="w-full bg-gradient-to-r from-[#15b078] to-[#394b41] hover:from-[#394b41] hover:to-[#15b078] text-white"
                   disabled={!canProceed()}
                 >
                  <Lock className="w-4 h-4 mr-2" />
                  {isLoginMode ? "登录" : "注册"}
                </Button>
              </form>

              <div className="flex justify-center">
                               <Button
                 variant="link"
                 onClick={() => setIsLoginMode(!isLoginMode)}
                 className="text-[#15b078] hover:text-[#394b41]"
               >
                  {isLoginMode ? "还没有账号？立即注册" : "已有账号？立即登录"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </ShineBorder>
      </div>
    </div>
  );
};

export default Login; 