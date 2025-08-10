import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { User, Lock, ArrowLeft } from "lucide-react";

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
              navigate('/mentor-chain');
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
              {isLoginMode ? "用户登录" : "用户注册"}
            </h1>
            <p className="text-lg text-gray-600">
              {isLoginMode ? "登录您的账号开始智能申请之旅" : "创建账号，开启您的申请之路"}
            </p>
          </div>
          
                    <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {!isLoginMode && (
                  <div>
                    <Label htmlFor="name" className="text-base font-medium mb-2 block">姓名</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="请输入您的姓名"
                      value={loginData.name}
                      onChange={(e) => setLoginData(prev => ({ ...prev, name: e.target.value }))}
                      className="h-12 text-base"
                    />
                  </div>
                )}

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
                  <>
                    <div>
                      <Label htmlFor="confirmPassword" className="text-base font-medium mb-2 block">确认密码</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="请再次输入密码"
                        value={loginData.confirmPassword}
                        onChange={(e) => setLoginData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="h-12 text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="code" className="text-base font-medium mb-2 block">验证码</Label>
                      <Input
                        id="code"
                        type="text"
                        placeholder="请输入验证码"
                        value={loginData.code}
                        onChange={(e) => setLoginData(prev => ({ ...prev, code: e.target.value }))}
                        className="h-12 text-base"
                      />
                    </div>
                  </>
                )}

                                 <Button
                   type="submit"
                   className="w-full h-12 text-lg font-medium bg-gradient-to-r from-[#15b078] to-[#394b41] hover:from-[#394b41] hover:to-[#15b078] text-white"
                   disabled={!canProceed()}
                 >
                  <Lock className="w-5 h-5 mr-3" />
                  {isLoginMode ? "登录" : "注册"}
                </Button>
              </form>

                            <div className="flex justify-center pt-4">
                               <Button
                 variant="link"
                 onClick={() => setIsLoginMode(!isLoginMode)}
                 className="text-[#15b078] hover:text-[#394b41] text-base"
               >
                  {isLoginMode ? "还没有账号？立即注册" : "已有账号？立即登录"}
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