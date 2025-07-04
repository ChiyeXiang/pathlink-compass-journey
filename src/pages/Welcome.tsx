import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowRight, ArrowLeft, Sparkles, Target, Users, User, Lock } from "lucide-react";
interface FormData {
  mainProblem: string;
  multipleCountries: string;
  scholarshipInterested: string;
  field: string;
  hasTarget: string;
  targetDetails: string;
  hasResume: string;
  hasRecommender: string;
}
interface MatchStats {
  projects: number;
  mentors: number;
}
const Welcome = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // Start with login/register step
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  const [formData, setFormData] = useState<FormData>({
    mainProblem: "",
    multipleCountries: "",
    scholarshipInterested: "",
    field: "",
    hasTarget: "",
    targetDetails: "",
    hasResume: "",
    hasRecommender: ""
  });
  const [matchStats, setMatchStats] = useState<MatchStats>({
    projects: 0,
    mentors: 0
  });
  const mainProblems = [{
    id: "no-direction",
    label: "没有明确方向",
    description: "还不确定具体想申请什么"
  }, {
    id: "find-programs",
    label: "想找合适项目",
    description: "需要帮助选择具体项目"
  }, {
    id: "school-selection",
    label: "不确定选校",
    description: "已有方向但需要选校建议"
  }, {
    id: "scholarship",
    label: "想拿奖学金",
    description: "希望获得奖学金支持"
  }, {
    id: "essay-help",
    label: "文书不会写",
    description: "文书写作遇到困难"
  }];
  const fields = [{
    id: "business",
    label: "商科",
    examples: "MBA、金融、会计等"
  }, {
    id: "engineering",
    label: "理工科",
    examples: "CS、EE、机械等"
  }, {
    id: "social",
    label: "社会科学",
    examples: "经济、政治、心理等"
  }, {
    id: "arts",
    label: "人文艺术",
    examples: "设计、文学、历史等"
  }, {
    id: "medicine",
    label: "医学",
    examples: "临床、公卫、生物等"
  }, {
    id: "law",
    label: "法学",
    examples: "JD、LLM等"
  }];
  const totalSteps = 5; // Including login step

  // Calculate match stats based on answers
  useEffect(() => {
    let projects = 15;
    let mentors = 8;
    if (formData.mainProblem) {
      projects += 10;
      mentors += 2;
    }
    if (formData.field) {
      projects += 20;
      mentors += 5;
    }
    if (formData.multipleCountries === "yes") {
      projects += 15;
      mentors += 3;
    }
    if (formData.scholarshipInterested === "yes") {
      projects += 5;
      mentors += 2;
    }
    setMatchStats({
      projects,
      mentors
    });
  }, [formData]);
  const handleNext = () => {
    if (currentStep === 0) {
      handleLogin();
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };
  const handleLogin = () => {
    // Simple validation for demo
    if (isLoginMode) {
      if (loginData.email && loginData.password) {
        setIsLoggedIn(true);
        setCurrentStep(1);
      }
    } else {
      if (loginData.email && loginData.password && loginData.confirmPassword && loginData.name) {
        setIsLoggedIn(true);
        setCurrentStep(1);
      }
    }
  };
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleSubmit = () => {
    localStorage.setItem('applicationData', JSON.stringify(formData));
    // Add loading animation
    setIsLoading(true);
    setTimeout(() => {
      navigate('/recommendations');
    }, 3000);
  };
  const [isLoading, setIsLoading] = useState(false);
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        if (isLoginMode) {
          return loginData.email !== "" && loginData.password !== "";
        } else {
          return loginData.email !== "" && loginData.password !== "" && loginData.confirmPassword !== "" && loginData.name !== "" && loginData.password === loginData.confirmPassword;
        }
      case 1:
        return formData.mainProblem !== "";
      case 2:
        return formData.multipleCountries !== "" && formData.scholarshipInterested !== "";
      case 3:
        return formData.field !== "";
      case 4:
        return formData.hasTarget !== "";
      default:
        return false;
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <User className="w-6 h-6 mr-3 text-primary" />
                {isLoginMode ? "学生登录" : "学生注册"}
              </CardTitle>
              <p className="text-muted-foreground">
                {isLoginMode ? "登录您的账号开始智能申请之旅" : "创建账号，开启您的申请之路"}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isLoginMode && <div>
                  <Label htmlFor="name">姓名</Label>
                  <Input id="name" type="text" placeholder="请输入您的姓名" value={loginData.name} onChange={e => setLoginData(prev => ({
                ...prev,
                name: e.target.value
              }))} />
                </div>}
              
              <div>
                <Label htmlFor="email">邮箱</Label>
                <Input id="email" type="email" placeholder="请输入您的邮箱" value={loginData.email} onChange={e => setLoginData(prev => ({
                ...prev,
                email: e.target.value
              }))} />
              </div>

              <div>
                <Label htmlFor="password">密码</Label>
                <Input id="password" type="password" placeholder="请输入密码" value={loginData.password} onChange={e => setLoginData(prev => ({
                ...prev,
                password: e.target.value
              }))} />
              </div>

              {!isLoginMode && <div>
                  <Label htmlFor="confirmPassword">确认密码</Label>
                  <Input id="confirmPassword" type="password" placeholder="请再次输入密码" value={loginData.confirmPassword} onChange={e => setLoginData(prev => ({
                ...prev,
                confirmPassword: e.target.value
              }))} />
                  {loginData.password !== loginData.confirmPassword && loginData.confirmPassword && <p className="text-sm text-destructive mt-1">密码不匹配</p>}
                </div>}

              <div className="flex justify-center">
                <Button variant="link" onClick={() => setIsLoginMode(!isLoginMode)} className="text-primary">
                  {isLoginMode ? "还没有账号？立即注册" : "已有账号？立即登录"}
                </Button>
              </div>
            </CardContent>
          </Card>;
      case 1:
        return <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-primary" />
                你最想解决的问题是？
              </CardTitle>
              <p className="text-muted-foreground">告诉我们你的主要困扰，我们会为你匹配最合适的解决方案</p>
            </CardHeader>
            <CardContent>
              <RadioGroup value={formData.mainProblem} onValueChange={value => setFormData(prev => ({
              ...prev,
              mainProblem: value
            }))}>
                <div className="space-y-4">
                  {mainProblems.map(problem => <div key={problem.id} className="p-4 rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value={problem.id} id={problem.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={problem.id} className="text-base font-medium cursor-pointer">
                            {problem.label}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">{problem.description}</p>
                        </div>
                      </div>
                    </div>)}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>;
      case 2:
        return <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Target className="w-6 h-6 mr-3 text-primary" />
                申请偏好设置
              </CardTitle>
              <p className="text-muted-foreground">了解你的申请偏好，为你提供更精准的建议</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Multiple Countries */}
              <div>
                <Label className="text-base font-medium mb-3 block">是否考虑多个国家？</Label>
                <RadioGroup value={formData.multipleCountries} onValueChange={value => setFormData(prev => ({
                ...prev,
                multipleCountries: value
              }))}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="yes" id="multi-yes" />
                      <Label htmlFor="multi-yes" className="cursor-pointer">是，希望申请多个国家</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="no" id="multi-no" />
                      <Label htmlFor="multi-no" className="cursor-pointer">否，专注单一国家</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Scholarship Interest */}
              <div>
                <Label className="text-base font-medium mb-3 block">是否考虑奖学金路径？</Label>
                <RadioGroup value={formData.scholarshipInterested} onValueChange={value => setFormData(prev => ({
                ...prev,
                scholarshipInterested: value
              }))}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="yes" id="scholarship-yes" />
                      <Label htmlFor="scholarship-yes" className="cursor-pointer">是，希望获得奖学金支持</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="no" id="scholarship-no" />
                      <Label htmlFor="scholarship-no" className="cursor-pointer">否，主要关注录取</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>;
      case 3:
        return <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Users className="w-6 h-6 mr-3 text-primary" />
                大致专业领域
              </CardTitle>
              <p className="text-muted-foreground">选择你感兴趣的专业方向</p>
            </CardHeader>
            <CardContent>
              <RadioGroup value={formData.field} onValueChange={value => setFormData(prev => ({
              ...prev,
              field: value
            }))}>
                <div className="space-y-4">
                  {fields.map(field => <div key={field.id} className="p-4 rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value={field.id} id={field.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={field.id} className="text-base font-medium cursor-pointer">
                            {field.label}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">{field.examples}</p>
                        </div>
                      </div>
                    </div>)}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>;
      case 4:
        return <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl">补充信息（可选）</CardTitle>
              <p className="text-muted-foreground">这些信息将帮助我们为你提供更个性化的服务</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Target Program */}
              <div>
                <Label className="text-base font-medium mb-3 block">是否已有目标项目？</Label>
                <RadioGroup value={formData.hasTarget} onValueChange={value => setFormData(prev => ({
                ...prev,
                hasTarget: value
              }))}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="yes" id="target-yes" />
                      <Label htmlFor="target-yes" className="cursor-pointer">是，已有明确目标</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="partial" id="target-partial" />
                      <Label htmlFor="target-partial" className="cursor-pointer">有一些想法，需要确认</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="no" id="target-no" />
                      <Label htmlFor="target-no" className="cursor-pointer">完全没有头绪</Label>
                    </div>
                  </div>
                </RadioGroup>

                {formData.hasTarget === "yes" && <div className="mt-4 space-y-3">
                    <Label>项目详情</Label>
                    <Textarea placeholder="请简单描述你的目标项目，如学校名称、专业等..." value={formData.targetDetails} onChange={e => setFormData(prev => ({
                  ...prev,
                  targetDetails: e.target.value
                }))} />
                  </div>}
              </div>

              {/* Resume */}
              <div>
                <Label className="text-base font-medium mb-3 block">是否已有简历？</Label>
                <RadioGroup value={formData.hasResume} onValueChange={value => setFormData(prev => ({
                ...prev,
                hasResume: value
              }))}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="yes" id="resume-yes" />
                      <Label htmlFor="resume-yes" className="cursor-pointer">有，且比较完整</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="partial" id="resume-partial" />
                      <Label htmlFor="resume-partial" className="cursor-pointer">有，但需要优化</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="no" id="resume-no" />
                      <Label htmlFor="resume-no" className="cursor-pointer">没有，需要从头制作</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Recommender */}
              <div>
                <Label className="text-base font-medium mb-3 block">是否已有推荐人？</Label>
                <RadioGroup value={formData.hasRecommender} onValueChange={value => setFormData(prev => ({
                ...prev,
                hasRecommender: value
              }))}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="yes" id="recommender-yes" />
                      <Label htmlFor="recommender-yes" className="cursor-pointer">有，且已确认</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="partial" id="recommender-partial" />
                      <Label htmlFor="recommender-partial" className="cursor-pointer">有想法，需要确认</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value="no" id="recommender-no" />
                      <Label htmlFor="recommender-no" className="cursor-pointer">没有，需要帮助</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>;
      default:
        return null;
    }
  };

  // Loading state component
  if (isLoading) {
    return <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <Card className="shadow-soft border-0 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center animate-pulse">
            <span className="text-2xl font-bold text-primary-foreground">P+</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">正在为你匹配导师与路径...</h2>
          <div className="w-64 mx-auto">
            <Progress value={66} className="h-2 mb-4" />
          </div>
          <p className="text-muted-foreground mb-4">基于你的回答，我们正在筛选最合适的专业导师</p>
          <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
            <span>✓ 分析申请偏好</span>
            <span>✓ 匹配导师背景</span>
            <span className="text-primary">• 生成专属路径</span>
          </div>
        </Card>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-soft">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex">
          {/* Left Column - Form */}
          <div className="flex-1 pr-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">P+</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">智能申请路径匹配</h1>
              <p className="text-muted-foreground">60秒智能问卷，为你定制专属申请方案</p>
            </div>

            {/* Progress */}
            <Card className="mb-8 shadow-soft border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">
                    第 {currentStep + 1} 步，共 {totalSteps} 步
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((currentStep + 1) / totalSteps * 100)}% 完成
                  </span>
                </div>
                <Progress value={(currentStep + 1) / totalSteps * 100} className="h-2" />
              </CardContent>
            </Card>

            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0} className="rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                上一步
              </Button>
              
              <Button onClick={handleNext} disabled={!canProceed()} className="rounded-xl px-8">
                {currentStep === 0 ? isLoginMode ? '登录' : '注册' : currentStep === totalSteps - 1 ? '查看推荐路径' : '下一步'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Column - Match Stats */}
          <div className="w-80">
            <div className="sticky top-8">
              <Card className="shadow-soft border-0 mb-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-primary" />
                    实时匹配结果
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="p-4 bg-primary-light rounded-xl">
                      
                      <p className="text-sm text-primary-dark">？
个匹配项目</p>
                    </div>
                    
                    <div className="p-4 bg-success/10 rounded-xl">
                      
                      <p className="text-sm text-success">？
位专业导师</p>
                    </div>

                    <div className="p-3 bg-accent rounded-lg">
                      <p className="text-xs text-accent-foreground">
                        💡 答题越多，匹配越精准！已为你筛选出最适合的导师和项目
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="shadow-soft border-0">
                <CardHeader>
                  <CardTitle className="text-lg">💡 小贴士</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• 回答越详细，匹配结果越精准</p>
                    <p>• 可以随时返回修改答案</p>
                    <p>• 所有信息都将保密处理</p>
                    <p>• 完成问卷后即可查看专属路径</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Welcome;