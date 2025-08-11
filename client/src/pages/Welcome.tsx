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
  AppDegree: string[];
  multipleCountries: string[];
  scholarshipInterested: string[];
  field: string[];
  DreamCountrySchool: string[];
  targetDetails: string;
  budgetPreference: string[];
}
interface MatchStats {
  projects: number;
  mentors: number;
}
const Welcome = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // Start with questionnaire step
  const [user, setUser] = useState<any>(null);

  const [formData, setFormData] = useState<FormData>({
    AppDegree: [],
    multipleCountries: [],
    scholarshipInterested: [],
    field: [],
    DreamCountrySchool: [],
    targetDetails: "",
    budgetPreference: []
  });
  const [matchStats, setMatchStats] = useState<MatchStats>({
    projects: 0,
    mentors: 0
  });
  const AppDegrees = [{
    id: "no-direction",
    label: "本科项目"
  }, {
    id: "find-programs",
    label: "研究生项目",
  }, {
    id: "school-selection",
    label: "博士项目",
  }, {
    id: "scholarship",
    label: "MBA项目"
  }];
  const fields = [{
    id: "business",
    label: "商科",
    examples: "工商管理、金融、会计、市场营销、战略管理、供应链管理、商业分析、人力资源管理、创业学等"
  }, {
    id: "engineering",
    label: "理工科",
    examples: "计算机科学、数据科学、人工智能、统计学、数学、电子工程、机械工程、土木工程、材料科学、化学、化工、物理、生物技术、环境科学和信息系统等"
  }, {
    id: "social",
    label: "社会科学",
    examples: "经济学、社会学、心理学、政治学、国际关系、公共政策、教育学、人类学、传播学和城市规划等"
  }, {
    id: "arts",
    label: "人文艺术",
    examples: "哲学、历史、文学、语言学、戏剧与表演、视觉艺术、艺术史、摄影、电影研究、各类设计专业（如用户体验、产品设计、工业设计）以及音乐与音乐学等"
  }];
  const totalSteps = 5; // Questionnaire steps only

  // 获取当前登录用户
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    (async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('无法获取用户信息');
        const data = await res.json();
        setUser(data); // 期望包含 userId, name, email, createdAt
      } catch (e) {
        console.error('获取用户信息失败:', e);
      }
    })();
  }, []);

  // Calculate match stats based on answers
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
    if (formData.scholarshipInterested.length > 0) {
      projects += 5;
      mentors += 2;
    }
    setMatchStats({
      projects,
      mentors
    });
  }, [formData]);
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleSubmit = async () => {
    localStorage.setItem('applicationData', JSON.stringify(formData));

    const token = localStorage.getItem('token');
    if (!token || !user?.userId) {
      console.error('缺少 token 或 userId，无法提交问卷');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/student/welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 若后端未校验可临时去掉
        },
        body: JSON.stringify({
          userId: user.userId,
          formData
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || '提交失败');
      }

      // 成功：跳转
      navigate('/mentor-chain');
    } catch (e) {
      console.error('提交问卷失败:', e);
      setIsLoading(false);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.AppDegree.length > 0;
      case 2:
        return formData.field.length > 0;
      case 3:
        return formData.DreamCountrySchool.length > 0;
      case 4:
        return formData.multipleCountries.length > 0;
      case 5:
        return formData.budgetPreference.length > 0;
      default:
        return false;
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-primary" />
                选择你正在准备申请的学位👇（可多选）
              </CardTitle>
              <p className="text-muted-foreground"> </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {AppDegrees.map(problem => <div key={problem.id} className="p-4 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id={problem.id} 
                        checked={formData.AppDegree.includes(problem.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData(prev => ({
                              ...prev,
                              AppDegree: [...prev.AppDegree, problem.id]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              AppDegree: prev.AppDegree.filter(item => item !== problem.id)
                            }));
                          }
                        }}
                        className="mt-1" 
                      />
                      <div className="flex-1">
                        <Label htmlFor={problem.id} className="text-base font-medium cursor-pointer">
                          {problem.label}
                        </Label>
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>;
      case 2:
        return <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Users className="w-6 h-6 mr-3 text-primary" />
                有没有感兴趣的专业方向？*（可多选）
              </CardTitle>
              <p className="text-muted-foreground"> （MBA申请跳过此题） </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fields.map(field => <div key={field.id} className="p-4 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id={field.id} 
                        checked={formData.field.includes(field.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData(prev => ({
                              ...prev,
                              field: [...prev.field, field.id]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              field: prev.field.filter(item => item !== field.id)
                            }));
                          }
                        }}
                        className="mt-1" 
                      />
                      <div className="flex-1">
                        <Label htmlFor={field.id} className="text-base font-medium cursor-pointer">
                          {field.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">{field.examples}</p>
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>;
      case 3:
        return <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl">有没有想去的国家/地区？（可多选）</CardTitle>
              <p className="text-muted-foreground"> </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Target Program */}
              <div>
                <Label className="text-base font-medium mb-3 block">国家/地区？</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <Checkbox 
                      id="target-yes" 
                      checked={formData.DreamCountrySchool.includes("yes")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({
                            ...prev,
                            DreamCountrySchool: [...prev.DreamCountrySchool, "yes"]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            DreamCountrySchool: prev.DreamCountrySchool.filter(item => item !== "yes")
                          }));
                        }
                      }}
                    />
                    <Label htmlFor="target-yes" className="cursor-pointer">美国/加拿大</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <Checkbox 
                      id="target-partial" 
                      checked={formData.DreamCountrySchool.includes("partial")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({
                            ...prev,
                            DreamCountrySchool: [...prev.DreamCountrySchool, "partial"]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            DreamCountrySchool: prev.DreamCountrySchool.filter(item => item !== "partial")
                          }));
                        }
                      }}
                    />
                    <Label htmlFor="target-partial" className="cursor-pointer">英国/澳洲/欧洲</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <Checkbox 
                      id="target-no" 
                      checked={formData.DreamCountrySchool.includes("no")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({
                            ...prev,
                            DreamCountrySchool: [...prev.DreamCountrySchool, "no"]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            DreamCountrySchool: prev.DreamCountrySchool.filter(item => item !== "no")
                          }));
                        }
                      }}
                    />
                    <Label htmlFor="target-no" className="cursor-pointer">香港/新加坡/亚洲其他地区</Label>
                  </div>
                </div>

                {(formData.DreamCountrySchool.includes("yes") || formData.DreamCountrySchool.includes("partial") || formData.DreamCountrySchool.includes("no")) && (
                  <div className="mt-4 space-y-3">
                    <Label> * 大胆说出你的梦校！</Label>
                    <Label>为你推荐有相关成功案例的导师+该校校友导师～</Label>
                    <Textarea placeholder="输入文字，AI自动分析关键词。
示例（供参考）：我对牛津大学数学系/美国top30院校/大城市的学校...很感兴趣

" value={formData.targetDetails} onChange={e => setFormData(prev => ({
                      ...prev,
                      targetDetails: e.target.value
                    }))} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>;
      case 4:
        return <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Target className="w-6 h-6 mr-3 text-primary" />
                你希望我们在哪些方面帮你出谋划策？
              </CardTitle>
              <p className="text-muted-foreground"> </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Checkbox 
                    id="strategy" 
                    checked={formData.multipleCountries.includes("strategy")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData(prev => ({
                          ...prev,
                          multipleCountries: [...prev.multipleCountries, "strategy"]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          multipleCountries: prev.multipleCountries.filter(item => item !== "strategy")
                        }));
                      }
                    }}
                  />
                  <Label htmlFor="strategy" className="cursor-pointer">整体申请策略怎么定？</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Checkbox 
                    id="essay" 
                    checked={formData.multipleCountries.includes("essay")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData(prev => ({
                          ...prev,
                          multipleCountries: [...prev.multipleCountries, "essay"]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          multipleCountries: prev.multipleCountries.filter(item => item !== "essay")
                        }));
                      }
                    }}
                  />
                  <Label htmlFor="essay" className="cursor-pointer">文书怎么写更打动人？</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Checkbox 
                    id="resume" 
                    checked={formData.multipleCountries.includes("resume")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData(prev => ({
                          ...prev,
                          multipleCountries: [...prev.multipleCountries, "resume"]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          multipleCountries: prev.multipleCountries.filter(item => item !== "resume")
                        }));
                      }
                    }}
                  />
                  <Label htmlFor="resume" className="cursor-pointer">简历怎么写更有亮点？</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Checkbox 
                    id="interview" 
                    checked={formData.multipleCountries.includes("interview")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData(prev => ({
                          ...prev,
                          multipleCountries: [...prev.multipleCountries, "interview"]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          multipleCountries: prev.multipleCountries.filter(item => item !== "interview")
                        }));
                      }
                    }}
                  />
                  <Label htmlFor="interview" className="cursor-pointer">面试怎么准备？</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Checkbox 
                    id="recommendation" 
                    checked={formData.multipleCountries.includes("recommendation")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData(prev => ({
                          ...prev,
                          multipleCountries: [...prev.multipleCountries, "recommendation"]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          multipleCountries: prev.multipleCountries.filter(item => item !== "recommendation")
                        }));
                      }
                    }}
                  />
                  <Label htmlFor="recommendation" className="cursor-pointer">推荐信怎么找/怎么准备？</Label>
                </div>
              </div>
            </CardContent>
          </Card>;
      case 5:
        return <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl">我们了解下你的预算偏好～（可多选）</CardTitle>
              <p className="text-muted-foreground">根据你的预算情况，为你推荐最合适的导师和服务方案</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Checkbox 
                    id="budget-high" 
                    checked={formData.budgetPreference.includes("high")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData(prev => ({
                          ...prev,
                          budgetPreference: [...prev.budgetPreference, "high"]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          budgetPreference: prev.budgetPreference.filter(item => item !== "high")
                        }));
                      }
                    }}
                  />
                  <Label htmlFor="budget-high" className="cursor-pointer">预算较高：我愿意为靠谱导师多花一些</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Checkbox 
                    id="budget-medium" 
                    checked={formData.budgetPreference.includes("medium")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData(prev => ({
                          ...prev,
                          budgetPreference: [...prev.budgetPreference, "medium"]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          budgetPreference: prev.budgetPreference.filter(item => item !== "medium")
                        }));
                      }
                    }}
                  />
                  <Label htmlFor="budget-medium" className="cursor-pointer">中等预算：想找到性价比高的好导师</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Checkbox 
                    id="budget-low" 
                    checked={formData.budgetPreference.includes("low")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData(prev => ({
                          ...prev,
                          budgetPreference: [...prev.budgetPreference, "low"]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          budgetPreference: prev.budgetPreference.filter(item => item !== "low")
                        }));
                      }
                    }}
                  />
                  <Label htmlFor="budget-low" className="cursor-pointer">预算有限：希望在控制花费的同时也能提升</Label>
                </div>
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
                    第 {currentStep} 页，共 {totalSteps} 页
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(currentStep/ totalSteps * 100)}% 完成
                  </span>
                </div>
                <Progress value={currentStep / totalSteps * 100} className="h-2" />
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
                {currentStep === totalSteps ? '查看推荐路径' : '下一页'}
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