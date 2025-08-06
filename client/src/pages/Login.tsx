import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, ArrowLeft } from "lucide-react";
import { ShineBorder } from "@/components/magicui/shine-border";

const Login = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    code: ""
  });

  const canProceed = () => {
    if (isLoginMode) {
      return loginData.email !== "" && loginData.password !== "";
    } else {
      return loginData.email !== "" && loginData.password !== "" && loginData.confirmPassword !== "" && loginData.name !== "" && loginData.password === loginData.confirmPassword && loginData.code !== "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed()) {
      // 模拟登录成功
      localStorage.setItem('token', 'dummy-token');
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
                  <>
                    <div>
                      <Label htmlFor="confirmPassword">确认密码</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="请再次输入密码"
                        value={loginData.confirmPassword}
                        onChange={(e) => setLoginData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="code">验证码</Label>
                      <Input
                        id="code"
                        type="text"
                        placeholder="请输入验证码"
                        value={loginData.code}
                        onChange={(e) => setLoginData(prev => ({ ...prev, code: e.target.value }))}
                      />
                    </div>
                  </>
                )}

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