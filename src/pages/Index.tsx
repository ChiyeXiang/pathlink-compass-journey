import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Calendar, Clock, CheckCircle, Play, Users, Target, Sparkles } from "lucide-react";
import mentorLiAvatar from "@/assets/mentor-li.jpg";
import mentorWangAvatar from "@/assets/mentor-wang.jpg";
import mentorZhangAvatar from "@/assets/mentor-zhang.jpg";

const Index = () => {
  const navigate = useNavigate();

  const executionPath = [
    { 
      id: 1, 
      title: "选校策略", 
      description: "精准定位目标院校", 
      mentor: "李导师",
      status: "waiting",
      price: "¥1,299",
      originalPrice: "¥1,599"
    },
    { 
      id: 2, 
      title: "文书创作", 
      description: "深度挖掘个人故事", 
      mentor: "李导师",
      status: "waiting",
      price: "¥2,599", 
      originalPrice: "¥3,199"
    },
    { 
      id: 3, 
      title: "推荐信规划", 
      description: "推荐人匹配与内容设计", 
      mentor: "李导师",
      status: "waiting",
      price: "¥899",
      originalPrice: "¥1,099" 
    },
    { 
      id: 4, 
      title: "面试训练", 
      description: "专业面试技巧培训", 
      mentor: "李导师",
      status: "waiting",
      price: "¥1,899",
      originalPrice: "¥2,299"
    }
  ];

  const packages = [
    {
      id: "basic",
      name: "基础成长包",
      description: "适合有明确目标的申请者",
      price: "¥3,999",
      originalPrice: "¥5,097",
      savings: "¥1,098",
      popular: true
    },
    {
      id: "premium", 
      name: "多校执行包",
      description: "全方位申请支持方案",
      price: "¥5,699",
      originalPrice: "¥7,396", 
      savings: "¥1,697",
      recommended: true
    },
    {
      id: "elite",
      name: "名校挑战包", 
      description: "冲刺顶尖院校定制服务",
      price: "¥8,999",
      originalPrice: "¥12,999",
      savings: "¥4,000",
      exclusive: true
    }
  ];

  // Simulated current student progress
  const currentProgress = {
    student: "张同学",
    task: "Why School文书",
    mentor: "李老师", 
    status: "进行中",
    version: "1/3 稿",
    dueDate: "8月10日",
    progress: 33
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-primary rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-medium">
            <span className="text-3xl font-bold text-primary-foreground">P+</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">PathLink Apply+</h1>
          <p className="text-xl text-primary font-semibold mb-2">不只是推荐服务，而是为你找到最合适的引路人</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            基于智能匹配算法，为每位学生定制专属申请路径，让顶尖导师全程陪伴你的留学申请之旅
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card 
            className="shadow-soft border-0 cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => navigate('/welcome')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-light rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">个性化路径问卷</h3>
              <p className="text-sm text-muted-foreground mb-4">60秒定制专属申请路径</p>
              <Button className="w-full rounded-xl">
                开始智能匹配
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="shadow-soft border-0 cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => navigate('/recommendations')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-success/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">查看执行链</h3>
              <p className="text-sm text-muted-foreground mb-4">组合包方案与路径规划</p>
              <Button variant="outline" className="w-full rounded-xl border-success text-success hover:bg-success hover:text-success-foreground">
                查看服务路径
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="shadow-soft border-0 cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => navigate('/coffee-chat')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-warning/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">预约免费CoffeeChat</h3>
              <p className="text-sm text-muted-foreground mb-4">30分钟专业咨询</p>
              <Button variant="outline" className="w-full rounded-xl border-warning text-warning hover:bg-warning hover:text-warning-foreground">
                立即预约
                <Calendar className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Execution Path Visualization */}
        <Card className="mb-12 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-center text-2xl mb-2">你的专属申请执行链</CardTitle>
            <p className="text-center text-muted-foreground">点击查看每个环节的负责导师、服务详情和组合包优惠</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative">
              {/* Path Line */}
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-border"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {executionPath.map((step, index) => (
                  <Card 
                    key={step.id} 
                    className="relative bg-white shadow-soft border-0 cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2"
                    onClick={() => navigate('/mentor-detail')}
                  >
                    <CardContent className="p-6 text-center">
                      {/* Step Number */}
                      <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-medium">
                        {step.id}
                      </div>
                      
                      <h4 className="font-bold text-foreground mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={mentorLiAvatar} alt={step.mentor} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {step.mentor.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{step.mentor}</span>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <span className="text-xs text-muted-foreground line-through">{step.originalPrice}</span>
                          <span className="text-sm font-bold text-primary">{step.price}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="text-xs border-primary text-primary"
                        >
                          {step.status === 'waiting' ? '可预约' : step.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package Options */}
        <Card className="mb-12 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-center text-2xl mb-2">精选组合包方案</CardTitle>
            <p className="text-center text-muted-foreground">根据不同申请需求，为你推荐最优性价比方案</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card 
                  key={pkg.id}
                  className={`relative shadow-soft border-0 cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 ${
                    pkg.recommended ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => navigate('/mentor-detail')}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 rounded-full shadow-medium">
                        推荐选择
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-lg text-muted-foreground line-through">{pkg.originalPrice}</span>
                          <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                        </div>
                        <Badge className="bg-success text-success-foreground">
                          立省 {pkg.savings}
                        </Badge>
                      </div>
                    </div>

                    <Button 
                      className={`w-full rounded-xl ${
                        pkg.recommended ? 'bg-primary hover:bg-primary/90' : ''
                      }`}
                      variant={pkg.recommended ? 'default' : 'outline'}
                    >
                      {pkg.popular && '🔥 '}
                      {pkg.exclusive && '⭐ '}
                      查看详情
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Float */}
        <div className="fixed bottom-6 right-6 z-50">
          <Card className="shadow-medium border-0 w-80 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground text-sm">当前执行进度</h4>
                <Badge className="bg-primary text-primary-foreground text-xs">实时更新</Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={mentorLiAvatar} alt={currentProgress.mentor} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {currentProgress.mentor.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{currentProgress.task}</span>
                      <span className="text-xs text-muted-foreground">{currentProgress.version}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{currentProgress.mentor}</span>
                      <span>•</span>
                      <span className="text-primary">{currentProgress.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">预计交付</span>
                    <span className="text-foreground font-medium">{currentProgress.dueDate}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${currentProgress.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full rounded-xl text-xs"
                  onClick={() => navigate('/tasks')}
                >
                  查看详细进度
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;