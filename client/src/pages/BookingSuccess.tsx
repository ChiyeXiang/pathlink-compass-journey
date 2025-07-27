import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { CheckCircle, Calendar, Clock, MessageCircle, ArrowRight } from "lucide-react";

const BookingSuccess = () => {
  const navigate = useNavigate();

  const bookingInfo = JSON.parse(localStorage.getItem('coffeeChatBooking') || '{}');

  const nextSteps = [
    {
      title: "微信联系确认",
      description: "我们会在1小时内通过微信联系你，确认通话方式",
      time: "1小时内"
    },
    {
      title: "导师准备", 
      description: "导师会根据你的问题做针对性准备",
      time: "咨询前1天"
    },
    {
      title: "正式咨询",
      description: "30分钟1对1专业咨询，解答申请疑问",
      time: bookingInfo.date ? new Date(bookingInfo.date).toLocaleDateString('zh-CN') : ''
    }
  ];

  const handleContinue = () => {
    navigate('/mentor-detail');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-2xl mx-auto px-4 py-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-success rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">预约成功！</h1>
          <p className="text-muted-foreground">你的CoffeeChat已经预约成功</p>
        </div>

        {/* Booking Details */}
        <Card className="mb-6 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-center">预约详情</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-semibold">日期时间</span>
                </div>
                <span className="text-foreground">
                  {bookingInfo.date ? new Date(bookingInfo.date).toLocaleDateString('zh-CN') : ''} {bookingInfo.time}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-semibold">咨询时长</span>
                </div>
                <span className="text-foreground">30分钟</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span className="font-semibold">导师</span>
                </div>
                <span className="text-foreground">{bookingInfo.mentor || '李导师'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 shadow-soft border-0">
          <CardHeader>
            <CardTitle>接下来会发生什么？</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{step.description}</p>
                    <p className="text-xs text-primary font-medium">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mb-8 shadow-soft border-0">
          <CardContent className="p-6">
            <div className="bg-primary-light rounded-lg p-4">
              <h4 className="font-semibold text-primary-dark mb-2">💡 咨询小贴士</h4>
              <ul className="text-sm text-primary-dark space-y-1">
                <li>• 准备好你的简历和成绩单</li>
                <li>• 列出具体的申请疑问</li>
                <li>• 提前考虑你的申请目标</li>
                <li>• 准备一个安静的通话环境</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full h-12" onClick={handleContinue}>
            查看导师服务详情
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="w-full h-12" onClick={handleBackHome}>
            返回首页
          </Button>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            如有疑问，请联系客服微信：PathLinkHelper
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;