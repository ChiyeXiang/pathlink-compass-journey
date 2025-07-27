import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page-header";
import { Star, CheckCircle, Calendar, Clock, Award } from "lucide-react";
import mentorLiAvatar from "@/assets/mentor-li.jpg";
import mentorWangAvatar from "@/assets/mentor-wang.jpg";
import mentorZhangAvatar from "@/assets/mentor-zhang.jpg";

const MentorMarketplace = () => {
  const navigate = useNavigate();
  const [hoveredMentor, setHoveredMentor] = useState<string | null>(null);

  const executionPath = [
    {
      id: "selection",
      title: "精准选校",
      description: "基于你的背景和目标，制定个性化选校策略",
      status: "current",
      mentor: {
        name: "李导师",
        avatar: mentorLiAvatar,
        title: "美国商科申请专家",
        rating: 4.9,
        experience: "5年+",
        education: "沃顿商学院 MBA",
        specialties: ["MBA申请", "金融硕士", "咨询行业"],
        achievements: [
          "95%学生获得Top 20商学院录取",
          "平均每位学生获得3+录取",
          "帮助学生获得奖学金总额超过$500万"
        ],
        successRate: "95%",
        students: "120+",
        price: "¥1,299"
      }
    },
    {
      id: "essay",
      title: "核心文书",
      description: "1对1文书指导，挖掘个人亮点，打造compelling故事",
      status: "waiting",
      mentor: {
        name: "王导师",
        avatar: mentorWangAvatar,
        title: "英国理工科申请专家",
        rating: 4.8,
        experience: "7年+",
        education: "剑桥大学 PhD",
        specialties: ["计算机", "工程", "数据科学"],
        achievements: [
          "帮助95+学生成功申请",
          "成功率92%",
          "专业匹配度100%"
        ],
        successRate: "92%",
        students: "95+",
        price: "¥2,599"
      }
    },
    {
      id: "recommendation",
      title: "推荐信策略",
      description: "推荐人选择建议和推荐信内容规划",
      status: "waiting",
      mentor: {
        name: "张导师",
        avatar: mentorZhangAvatar,
        title: "多国申请顾问",
        rating: 4.9,
        experience: "6年+",
        education: "哈佛大学 Master",
        specialties: ["社科", "传媒", "教育"],
        achievements: [
          "已帮助150+学生",
          "成功率94%",
          "跨国申请专家"
        ],
        successRate: "94%",
        students: "150+",
        price: "¥899"
      }
    },
    {
      id: "interview",
      title: "面试训练",
      description: "专业面试技巧培训和实战模拟练习",
      status: "waiting",
      mentor: {
        name: "张导师",
        avatar: mentorZhangAvatar,
        title: "多国申请顾问",
        rating: 4.9,
        experience: "6年+",
        education: "哈佛大学 Master",
        specialties: ["社科", "传媒", "教育"],
        achievements: [
          "已帮助150+学生",
          "成功率94%",
          "跨国申请专家"
        ],
        successRate: "94%",
        students: "150+",
        price: "¥1,899"
      }
    }
  ];

  const handleViewDetails = (mentorId: string) => {
    navigate('/mentor-detail', { state: { mentorId } });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-primary text-primary-foreground';
      case 'waiting': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">为你推荐专属申请路径</h1>
          <p className="text-muted-foreground">
            基于你的需求，我们为你匹配了最合适的导师和服务流程
          </p>
        </div>

        {/* Execution Path */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">你的专属申请执行链</h2>
          <p className="text-muted-foreground mb-6">
            点击每个导师查看详情，并拥有专门的咨询服务
          </p>
          
          <div className="relative">
            {/* Path Line */}
            <div className="absolute top-12 left-12 right-12 h-0.5 bg-border hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {executionPath.map((step, index) => (
                <div key={step.id} className="relative">
                  <Card 
                    className="shadow-soft border-0 cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2"
                    onMouseEnter={() => setHoveredMentor(step.id)}
                    onMouseLeave={() => setHoveredMentor(null)}
                  >
                    <CardContent className="p-6 text-center">
                      {/* Step Number */}
                      <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-medium">
                        {index + 1}
                      </div>
                      
                      <h4 className="font-bold text-foreground mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={step.mentor.avatar} alt={step.mentor.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {step.mentor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="text-sm font-semibold">{step.mentor.name}</p>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-warning mr-1" fill="currentColor" />
                            <span className="text-xs">{step.mentor.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-lg font-bold text-primary mb-2">{step.mentor.price}</p>
                        <Badge className={getStatusColor(step.status)}>
                          {step.status === 'current' ? '推荐理由' : '1-2周'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Hover Details */}
                  {hoveredMentor === step.id && (
                    <div 
                      className="absolute top-full left-0 right-0 z-10 mt-2"
                      onMouseEnter={() => setHoveredMentor(step.id)}
                      onMouseLeave={() => setHoveredMentor(null)}
                    >
                      <Card className="shadow-medium border-0 bg-white">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3 mb-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={step.mentor.avatar} alt={step.mentor.name} />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {step.mentor.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-bold text-foreground">{step.mentor.name}</h4>
                              <p className="text-sm text-muted-foreground">{step.mentor.title}</p>
                              <div className="flex items-center mt-1">
                                <Star className="w-4 h-4 text-warning mr-1" fill="currentColor" />
                                <span className="text-sm font-semibold">{step.mentor.rating}</span>
                                <span className="text-xs text-muted-foreground ml-2">{step.mentor.experience}经验</span>
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="flex items-center mb-1">
                              <Award className="w-4 h-4 mr-1 text-primary" />
                              <span className="text-sm font-semibold">{step.mentor.education}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {step.mentor.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1 mb-4">
                            {step.mentor.achievements.map((achievement, idx) => (
                              <div key={idx} className="flex items-center text-xs text-muted-foreground">
                                <CheckCircle className="w-3 h-3 mr-1 text-success" />
                                {achievement}
                              </div>
                            ))}
                          </div>

                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 text-xs"
                              onClick={() => navigate('/coffee-chat')}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              免费咨询
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 text-xs"
                              onClick={() => handleViewDetails(step.mentor.name)}
                            >
                              查看详情
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Mentors Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">导师广场</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...new Set(executionPath.map(step => step.mentor.name))].map((mentorName) => {
              const mentor = executionPath.find(step => step.mentor.name === mentorName)?.mentor;
              if (!mentor) return null;
              
              return (
                <Card key={mentorName} className="shadow-soft border-0 hover:shadow-medium transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                          {mentor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{mentor.title}</p>
                        <div className="flex items-center mb-2">
                          <Star className="w-4 h-4 text-warning mr-1" fill="currentColor" />
                          <span className="text-sm font-semibold">{mentor.rating}</span>
                          <span className="text-xs text-muted-foreground ml-2">{mentor.experience}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {mentor.specialties.slice(0, 2).map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 mb-4">
                      {mentor.achievements.slice(0, 2).map((achievement, idx) => (
                        <div key={idx} className="flex items-center text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 mr-1 text-success" />
                          {achievement}
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate('/coffee-chat')}
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        免费咨询
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewDetails(mentor.name)}
                      >
                        查看详情
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorMarketplace;