import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page-header";
import { 
  ArrowRight, 
  CheckCircle, 
  MessageCircle, 
  TrendingUp, 
  Calendar, 
  Users, 
  Star,
  Award,
  Clock,
  DollarSign,
  UserCheck,
  Shield
} from "lucide-react";

const MentorRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "申请",
      description: "建立你的导师档案并告诉我们你的专业领域",
      icon: "📝",
      color: "border-purple-500"
    },
    {
      id: 2,
      title: "获得批准",
      description: "我们的团队会审核你的档案，确保最优秀的导师加入PathLink",
      icon: "✅",
      color: "border-green-500"
    },
    {
      id: 3,
      title: "开始指导",
      description: "我们将审核你的信息，并为你亮绿灯，开始指导！",
      icon: "💬",
      color: "border-blue-500"
    },
    {
      id: 4,
      title: "建立你的事业",
      description: "赚钱，建立你的品牌，并指导下一代申请者",
      icon: "📈",
      color: "border-yellow-500"
    }
  ];

  const testimonials = [
    {
      name: "李导师",
      title: "MBA申请专家",
      avatar: "/placeholder.svg",
      quote: "当我听说PathLink时，我立刻感到被召唤参与其中。教育及其提供的机会至关重要，尤其是在帮助学生实现留学梦想方面。这就是我成为导师的原因。",
      profile: "查看李导师档案"
    },
    {
      name: "王导师",
      title: "理工科申请顾问",
      avatar: "/placeholder.svg",
      quote: "与学生建立关系，了解他们的申请路径以及他们如何为未来做准备，这既鼓舞人心又充满动力。除了收入之外，还让我与最新的申请趋势保持联系。",
      profile: "查看王导师档案"
    }
  ];

  const benefits = [
    {
      title: "做自己的老板",
      icon: <Calendar className="w-8 h-8 text-primary" />,
      description: "在这里，你为自己工作。你选择提供的服务并定义你的工作时间。",
      details: "Categories: MBA, 理工科, 文科"
    },
    {
      title: "保留更多收益",
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      description: "在PathLink，我们的抽成是行业中最优惠的，让你获得更多收益。",
      details: "高达85%的收益分成"
    },
    {
      title: "专注于重要的事情",
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      description: "我们负责支付、日程安排等，这样你就可以专注于成为一名出色的导师。",
      details: "我们处理：沟通、评价、支付、日程安排"
    }
  ];

  const handleBecomeMentor = () => {
    // 跳转到登录/注册界面
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader />
      
      {/* Hero Section */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Image Placeholder */}
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Users className="w-24 h-24 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">导师与学生交流场景</p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              将你的专业知识变现
            </h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary leading-tight">
              帮助他人成功
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              指导可以带来额外收入，并帮助你与未来的申请者建立终身联系。
            </p>
            <Button 
              size="lg" 
              className="h-12 px-8 text-lg"
              onClick={handleBecomeMentor}
            >
              成为导师
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">成为导师的简单步骤</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <Card key={step.id} className="shadow-soft border-0 text-center">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl border-2 ${step.color} flex items-center justify-center text-2xl`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            加入数百名在PathLink上发展事业的导师
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-soft border-0">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <Button variant="link" className="p-0 text-primary">
                    {testimonial.profile} →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">为什么选择PathLink？</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="shadow-soft border-0 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-3 leading-relaxed">{benefit.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {benefit.details}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Unlock Opportunity Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="w-32 h-32 mx-auto lg:mx-0 mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-16 h-16 text-primary" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">解锁机会</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                没有什么比帮助他人实现目标更棒的感觉了。和我们一起改变生活吧。
              </p>
              <Button 
                size="lg" 
                variant="outline"
                className="h-12 px-8 text-lg"
                onClick={handleBecomeMentor}
              >
                成为导师 →
              </Button>
            </div>
          </div>
        </div>

        {/* Join Community Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">加入一个令人惊叹的社区</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                我们正在建立中国最大的导师和申请者专业社区。现在就加入，成为伟大事业的一部分。
              </p>
              <Button 
                size="lg" 
                variant="outline"
                className="h-12 px-8 text-lg"
                onClick={() => navigate('/mentor-marketplace')}
              >
                浏览PathLink导师 →
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                  <Star className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative">
          <div className="w-full h-64 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">你的学生正在等你</h2>
              <Button 
                size="lg" 
                className="h-12 px-8 text-lg"
                onClick={handleBecomeMentor}
              >
                成为导师
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorRegistration; 