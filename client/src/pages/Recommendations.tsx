import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowRight, CheckCircle, Calendar, Star, Award } from "lucide-react";
import mentorLiAvatar from "@/assets/mentor-li.jpg";
import mentorWangAvatar from "@/assets/mentor-wang.jpg";
import mentorZhangAvatar from "@/assets/mentor-zhang.jpg";

const Recommendations = () => {
  const navigate = useNavigate();
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);

  const executionPath = [
    { id: 1, title: "精准选校", status: "current", duration: "1-2周", icon: "🎯", description: "基于你的背景精准匹配院校" },
    { id: 2, title: "核心文书", status: "upcoming", duration: "2-3周", icon: "✍️", description: "深度挖掘个人故事，打造独特文书" },
    { id: 3, title: "针对性文书", status: "upcoming", duration: "1-2周", icon: "📝", description: "Why School等针对性文书创作" },
    { id: 4, title: "简历优化", status: "upcoming", duration: "1周", icon: "📄", description: "专业简历设计与优化" },
    { id: 5, title: "推荐信", status: "upcoming", duration: "1-2周", icon: "💌", description: "推荐人匹配与内容设计" },
    { id: 6, title: "网申体检", status: "upcoming", duration: "1周", icon: "✅", description: "全面网申材料检查" },
    { id: 7, title: "模拟面试", status: "upcoming", duration: "1周", icon: "🎤", description: "专业面试技巧培训" },
  ];

  const mentors = [
    {
      id: "mentor1",
      name: "李导师",
      avatar: mentorLiAvatar,
      title: "美国商科申请专家",
      experience: "5年+",
      rating: 4.9,
      tags: ["MBA", "金融", "咨询"],
      specialties: ["选校策略", "文书优化", "面试辅导"],
      students: 120,
      successRate: "95%",
      intro: "毕业于沃顿商学院，曾任投资银行分析师",
    },
    {
      id: "mentor2", 
      name: "王导师",
      avatar: mentorWangAvatar,
      title: "英国理工科申请专家",
      experience: "7年+",
      rating: 4.8,
      tags: ["计算机", "工程", "数据科学"],
      specialties: ["技术背景提升", "项目包装", "奖学金申请"],
      students: 95,
      successRate: "92%",
      intro: "剑桥大学博士，Google前工程师",
    },
    {
      id: "mentor3",
      name: "张导师", 
      avatar: mentorZhangAvatar,
      title: "多国申请顾问",
      experience: "6年+",
      rating: 4.9,
      tags: ["社科", "传媒", "教育"],
      specialties: ["跨国申请", "奖学金策略", "背景提升"],
      students: 150,
      successRate: "94%",
      intro: "哥伦比亚新闻学院硕士，多国留学经验",
    }
  ];

  const handleMentorSelect = (mentorId: string) => {
    setSelectedMentor(mentorId);
    localStorage.setItem('selectedMentor', mentorId);
    navigate('/mentor-detail');
  };

  const handleCoffeeChat = (mentorId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem('coffeeRequestMentor', mentorId);
    navigate('/coffee-chat');
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">为你推荐专属申请路径</h1>
          <p className="text-muted-foreground">基于你的需求，我们为你匹配了最合适的导师和服务路径</p>
        </div>

        {/* Execution Path Timeline */}
        <Card className="mb-8 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Award className="w-5 h-5 mr-2 text-primary" />
              你的专属申请执行链
            </CardTitle>
            <p className="text-center text-muted-foreground text-sm">点击每个阶段查看详细内容与负责导师</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-border z-0"></div>
              
              <div className="flex overflow-x-auto space-x-4 pb-4">
                {executionPath.map((step, index) => (
                  <div key={step.id} className="flex-shrink-0 relative z-10">
                    <Card className={`w-40 shadow-soft border-0 cursor-pointer hover:shadow-medium transition-all duration-300 ${
                      step.status === 'current' ? 'ring-2 ring-primary' : ''
                    }`}>
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl ${
                          step.status === 'current' 
                            ? 'bg-primary text-primary-foreground' 
                            : step.status === 'completed'
                            ? 'bg-success text-success-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <span>{step.icon}</span>
                          )}
                        </div>
                        <h4 className="font-semibold text-sm text-foreground mb-1">{step.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{step.duration}</p>
                        <Badge 
                          variant={step.status === 'current' ? 'default' : 'outline'} 
                          className="text-xs"
                        >
                          {step.status === 'current' ? '进行中' : step.status === 'completed' ? '已完成' : '待开始'}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Mentors */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">为你推荐的专业导师</h2>
          <div className="space-y-4">
            {mentors.map((mentor, index) => {
              // Generate match reasons based on mentor specialties
              const getMatchReason = (mentorId: string) => {
                switch(mentorId) {
                  case "mentor1":
                    return "李导师擅长美国商科Top20申请，与你的目标完全匹配";
                  case "mentor2":
                    return "王导师有丰富的理工科申请经验，特别适合技术背景提升";
                  case "mentor3":
                    return "张导师有多国申请经验，适合需要跨国申请策略的学生";
                  default:
                    return "该导师的专业背景与你的需求高度匹配";
                }
              };

              const getRecommendedTasks = (mentorId: string) => {
                switch(mentorId) {
                  case "mentor1":
                    return ["精准选校咨询", "核心文书共创", "面试技巧训练"];
                  case "mentor2":
                    return ["技术背景提升", "项目包装指导", "奖学金申请"];
                  case "mentor3":
                    return ["多国申请策略", "奖学金规划", "背景提升指导"];
                  default:
                    return ["选校建议", "文书指导", "申请策略"];
                }
              };

              return (
                <Card 
                  key={mentor.id} 
                  className="shadow-soft border-0 cursor-pointer hover:shadow-medium transition-all duration-200 relative"
                  onClick={() => handleMentorSelect(mentor.id)}
                >
                  {index === 0 && (
                    <div className="absolute -top-3 left-6">
                      <Badge className="bg-primary text-primary-foreground px-3 py-1 rounded-full shadow-medium">
                        🎯 最佳匹配
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    {/* Match Reason */}
                    <div className="mb-4 p-3 bg-primary-light rounded-lg border-l-4 border-primary">
                      <p className="text-sm text-primary-dark font-medium">
                        💡 推荐理由：{getMatchReason(mentor.id)}
                      </p>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                          {mentor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-foreground">{mentor.name}</h3>
                            <p className="text-muted-foreground">{mentor.title}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-warning mb-1">
                              <Star className="w-4 h-4 mr-1" fill="currentColor" />
                              <span className="font-semibold">{mentor.rating}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{mentor.experience}经验</p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{mentor.intro}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {mentor.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Recommended Task Combination */}
                        <div className="mb-4 p-3 bg-accent rounded-lg">
                          <h4 className="text-sm font-semibold text-accent-foreground mb-2">
                            ✨ 该导师为你推荐的任务卡组合：
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {getRecommendedTasks(mentor.id).map((task, taskIndex) => (
                              <Badge key={taskIndex} variant="outline" className="text-xs border-primary text-primary">
                                {task}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            💡 你也可以更换导师，但价格或任务内容可能随之调整
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>已帮助 {mentor.students}+ 学生</span>
                            <span>成功率 {mentor.successRate}</span>
                            <Badge variant="outline" className="text-xs text-success border-success">
                              可选/可换
                            </Badge>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => handleCoffeeChat(mentor.id, e)}
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl"
                          >
                            <Calendar className="w-4 h-4 mr-1" />
                            CoffeeChat
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button 
            className="w-full max-w-md h-12"
            onClick={() => navigate('/tasks')}
          >
            查看所有任务服务
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;