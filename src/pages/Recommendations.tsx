import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, CheckCircle, Calendar, Star, Award } from "lucide-react";
import mentorLiAvatar from "@/assets/mentor-li.jpg";
import mentorWangAvatar from "@/assets/mentor-wang.jpg";
import mentorZhangAvatar from "@/assets/mentor-zhang.jpg";

const Recommendations = () => {
  const navigate = useNavigate();
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);

  const applicationPath = [
    { id: 1, title: "选校建议", status: "current", description: "基于你的背景精准匹配院校" },
    { id: 2, title: "文书写作", status: "upcoming", description: "个性化文书指导与修改" },
    { id: 3, title: "网申检查", status: "upcoming", description: "确保申请材料完整准确" },
    { id: 4, title: "模拟面试", status: "upcoming", description: "专业面试技巧训练" },
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
      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">为你推荐专属申请路径</h1>
          <p className="text-muted-foreground">基于你的需求，我们为你匹配了最合适的导师和服务路径</p>
        </div>

        {/* Application Path */}
        <Card className="mb-6 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-primary" />
              推荐申请路径
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applicationPath.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    step.status === 'current' 
                      ? 'bg-primary text-primary-foreground' 
                      : step.status === 'completed'
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < applicationPath.length - 1 && (
                    <div className="w-px h-8 bg-border ml-4 mr-4"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Mentors */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">推荐导师</h2>
          <div className="space-y-4">
            {mentors.map((mentor) => (
              <Card 
                key={mentor.id} 
                className="shadow-soft border-0 cursor-pointer hover:shadow-medium transition-all duration-200"
                onClick={() => handleMentorSelect(mentor.id)}
              >
                <CardContent className="p-6">
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

                      <div className="flex flex-wrap gap-2 mb-3">
                        {mentor.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>已帮助 {mentor.students}+ 学生</span>
                          <span>成功率 {mentor.successRate}</span>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => handleCoffeeChat(mentor.id, e)}
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          CoffeeChat
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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