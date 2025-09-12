import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowRight, ArrowLeft, Sparkles, Target, Users } from "lucide-react";

interface FormData {
  AppDegree: string[];
  multipleCountries: string[];
  needs: string[];
  field: string[];
  targetDetails: string;
  budgetPreference: string[];
}

interface MatchStats {
  projects: number;
  mentors: number;
}

const Welcome = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  const [user, setUser] = useState<any>(null);

  const [formData, setFormData] = useState<FormData>({
    AppDegree: [],
    multipleCountries: [],
    needs: [],
    field: [],
    targetDetails: "",
    budgetPreference: [],
  });

  const [matchStats, setMatchStats] = useState<MatchStats>({
    projects: 0,
    mentors: 0,
  });

  const appDegrees = [
    { id: "undergraduate", label: "本科项目" },
    { id: "graduate", label: "研究生项目" },
    { id: "phd", label: "博士项目" },
    { id: "mba", label: "MBA项目" },
  ];

  const fields = [
    {
      id: "business",
      label: "商科",
      examples:
        "工商管理、金融、会计、市场营销、战略管理、供应链管理、商业分析、人力资源管理、创业学等",
    },
    {
      id: "engineering",
      label: "理工科",
      examples:
        "计算机科学、数据科学、人工智能、统计学、数学、电子工程、机械工程、土木工程、材料科学、化学、化工、物理、生物技术、环境科学和信息系统等",
    },
    {
      id: "social",
      label: "社会科学",
      examples:
        "经济学、社会学、心理学、政治学、国际关系、公共政策、教育学、人类学、传播学和城市规划等",
    },
    {
      id: "arts",
      label: "人文艺术",
      examples:
        "哲学、历史、文学、语言学、戏剧与表演、视觉艺术、艺术史、摄影、电影研究、各类设计专业（如用户体验、产品设计、工业设计）以及音乐与音乐学等",
    },
  ];

  const multipleCountries = [
    { id: "northAmerica", label: "美国/加拿大" },
    { id: "UK/Australia/Europe", label: "英国/澳洲/欧洲" },
    { id: "asia", label: "香港/新加坡/亚洲其他地区" },
  ];

  const needs = [
    { id: "strategy", label: "整体申请策略怎么定？" },
    { id: "essay", label: "文书怎么写更打动人？" },
    { id: "resume", label: "简历怎么写更有亮点？" },
    { id: "interview", label: "面试怎么准备？" },
    { id: "recommendation", label: "推荐信怎么找/怎么准备？" },
  ];

  const budgetPreference = [
    { id: "high", label: "预算较高：我愿意为靠谱导师多花一些" },
    { id: "medium", label: "中等预算：想找到性价比高的好导师" },
    { id: "low", label: "预算有限：希望在控制花费的同时也能提升" },
  ];

  const totalSteps = 5;

  const isSurveyComplete = (d: Pick<FormData,
    "AppDegree"|"multipleCountries"|"needs"|"field"|"budgetPreference"
  >) => {
    return (
      d.AppDegree?.length > 0 &&
      d.field?.length > 0 &&
      d.multipleCountries?.length > 0 &&
      d.needs?.length > 0 &&
      d.budgetPreference?.length > 0
    );
  };

  // 如果未登录，跳回首页/登录；已登录则可顺便展示用户信息
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // 未登录
      return;
    }
    (async () => {
      try {
        const me = await fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } });
        if (!me.ok) return;
        const meData = await me.json();
        setUser(meData);

        // 拉取该 userId 的问卷
        const s = await fetch(`/api/student/profile/${meData.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (s.ok) {
          const student = await s.json();

          // 兼容后端字段名与前端一致时直接赋值；若后端命名稍有差异请在此做映射
          const restored: FormData = {
            AppDegree: student.AppDegree ?? [],
            multipleCountries: student.multipleCountries ?? [],
            needs: student.needs ?? student.needs ?? [],  
            field: student.field ?? [],
            targetDetails: student.targetDetails ?? "",
            budgetPreference: student.budgetPreference ?? [],
          };

          // 回填
          setFormData(restored);
          setPrefilled(true);

          // 若已完整，直接跳
          if (isSurveyComplete(restored)) {
            navigate("/mentor-chain");
            return;
          }
        }
      } catch (e) {
        console.error("初始化失败:", e);
      }
    })();
  }, [navigate]);

  // 实时匹配结果（示例规则）
  useEffect(() => {
    let projects = 15;
    let mentors = 8;
    if (formData.AppDegree.length > 0) {
      projects += 10;
      mentors += 2;
    }
    if (formData.field.length > 0) {
      projects += 20;
      mentors += 5;
    }
    if (formData.multipleCountries.length > 0) {
      projects += 15;
      mentors += 3;
    }
    if (formData.needs.length > 0) {
      projects += 5;
      mentors += 2;
    }
    setMatchStats({ projects, mentors });
  }, [formData]);

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(s => s + 1);
    else handleSubmit();
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  // 🔑 提交问卷：只发 formData，后端从 Token 中读 userId
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("缺少 token，无法提交问卷");
      return;
    }

    // 本地留档
    localStorage.setItem("applicationData", JSON.stringify(formData));

    setIsLoading(true);
    try {
      const res = await fetch("/api/student/welcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 后端用中间件解析 userId
        },
        body: JSON.stringify({ formData }), // ✅ 不再传 userId
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "提交失败");
      }

      // 成功：跳转到匹配导师页面
      navigate('/matching-mentors');
    } catch (e) {
      console.error("提交问卷失败:", e);
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.AppDegree.length > 0;
      case 2:
        return formData.field.length > 0;
      case 3:
        return formData.multipleCountries.length > 0;
      case 4:
        return formData.needs.length > 0;
      case 5:
        return formData.budgetPreference.length > 0;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-primary" />
                选择你正在准备申请的学位👇（可多选）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appDegrees.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={item.id}
                        checked={formData.AppDegree.includes(item.id)}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            AppDegree: checked
                              ? [...prev.AppDegree, item.id]
                              : prev.AppDegree.filter((v) => v !== item.id),
                          }));
                        }}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={item.id} className="text-base font-medium cursor-pointer">
                          {item.label}
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Users className="w-6 h-6 mr-3 text-primary" />
                有没有感兴趣的专业方向？*（可多选）
              </CardTitle>
              <p className="text-muted-foreground">（MBA申请可跳过）</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fields.map((f) => (
                  <div key={f.id} className="p-4 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={f.id}
                        checked={formData.field.includes(f.id)}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            field: checked
                              ? [...prev.field, f.id]
                              : prev.field.filter((v) => v !== f.id),
                          }));
                        }}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={f.id} className="text-base font-medium cursor-pointer">
                          {f.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">{f.examples}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl">有没有想去的国家/地区？（可多选）</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">国家/地区？</Label>
                <div className="space-y-3">
                  {multipleCountries.map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <Checkbox
                        id={`target-${opt.id}`}
                        checked={formData.multipleCountries.includes(opt.id)}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            multipleCountries: checked
                              ? [...prev.multipleCountries, opt.id]
                              : prev.multipleCountries.filter((v) => v !== opt.id),
                          }))
                        }
                      />
                      <Label htmlFor={`target-${opt.id}`} className="cursor-pointer">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </div>

                {(formData.field.length > 0) && (
                  <div className="mt-4 space-y-3">
                    <Label>* 大胆说出你的梦校！我们会优先匹配该校/相近背景的导师</Label>
                    <Textarea
                      placeholder={`示例：我对牛津大学数学系 / 美国top30院校 / 大城市的学校…`}
                      value={formData.targetDetails}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, targetDetails: e.target.value }))
                      }
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Target className="w-6 h-6 mr-3 text-primary" />
                你希望我们在哪些方面帮你出谋划策？
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {needs.map((opt) => (
                <div key={opt.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Checkbox
                    id={opt.id}
                    checked={formData.needs.includes(opt.id)}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        needs: checked
                          ? [...prev.needs, opt.id]
                          : prev.needs.filter((v) => v !== opt.id),
                      }))
                    }
                  />
                  <Label htmlFor={opt.id} className="cursor-pointer">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl">我们了解下你的预算偏好～（可多选）</CardTitle>
              <p className="text-muted-foreground">根据你的预算情况，为你推荐最合适的导师和服务方案</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {budgetPreference.map((opt) => (
                <div key={opt.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Checkbox
                    id={`budget-${opt.id}`}
                    checked={formData.budgetPreference.includes(opt.id)}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        budgetPreference: checked
                          ? [...prev.budgetPreference, opt.id]
                          : prev.budgetPreference.filter((v) => v !== opt.id),
                      }))
                    }
                  />
                  <Label htmlFor={`budget-${opt.id}`} className="cursor-pointer">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex">
          {/* 左侧问卷 */}
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
                    第 {currentStep} 页，共 {totalSteps} 页
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((currentStep / totalSteps) * 100)}% 完成
                  </span>
                </div>
                <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
              </CardContent>
            </Card>

            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1} className="rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                上一步
              </Button>

              <Button onClick={handleNext} disabled={!canProceed()} className="rounded-xl px-8">
                {currentStep === totalSteps ? "查看推荐路径" : "下一页"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* 右侧实时匹配 */}
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
                      <p className="text-2xl font-bold text-primary-dark">{matchStats.projects}</p>
                      <p className="text-sm text-primary-dark">个匹配项目</p>
                    </div>
                    <div className="p-4 bg-success/10 rounded-xl">
                      <p className="text-2xl font-bold text-success">{matchStats.mentors}</p>
                      <p className="text-sm text-success">位专业导师</p>
                    </div>
                    <div className="p-3 bg-accent rounded-lg">
                      <p className="text-xs text-accent-foreground">
                        💡 答题越多，匹配越精准！已为你筛选出最适合的导师和项目
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
          {/* 右侧结束 */}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
