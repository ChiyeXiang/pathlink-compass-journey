import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Home, FileText, MessageCircle } from "lucide-react";
import mentorLiAvatar from "@/assets/mentor-li.jpg";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const orderInfo = {
    orderNumber: "20240124001",
    total: 384.90,
    paymentTime: "2024-01-24 14:30:25",
    mentor: {
      name: "李导师",
      avatar: mentorLiAvatar,
      title: "美国商科申请专家"
    },
    services: [
      { name: "精准选校咨询", status: "待开始" },
      { name: "核心文书共创", status: "待开始" },
      { name: "推荐信策略设计", status: "待开始" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container max-w-2xl mx-auto px-4 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-success rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">支付成功</h1>
          <p className="text-muted-foreground">
            我们已收到您的付款，导师将在24小时内联系您
          </p>
        </div>

        {/* Order Details */}
        <Card className="shadow-soft border-0 mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">订单号</span>
                <span className="font-mono text-foreground">{orderInfo.orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">支付金额</span>
                <span className="text-xl font-bold text-primary">¥{orderInfo.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">支付时间</span>
                <span className="text-foreground">{orderInfo.paymentTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mentor Info */}
        <Card className="shadow-soft border-0 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={orderInfo.mentor.avatar} alt={orderInfo.mentor.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {orderInfo.mentor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-foreground">{orderInfo.mentor.name}</h3>
                <p className="text-muted-foreground">{orderInfo.mentor.title}</p>
                <Badge className="mt-2">专属导师</Badge>
              </div>
            </div>
            <div className="p-3 bg-accent rounded-lg">
              <p className="text-sm text-accent-foreground">
                📞 导师会在24小时内主动联系您，请保持手机畅通
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Services List */}
        <Card className="shadow-soft border-0 mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">已购买服务</h3>
            <div className="space-y-3">
              {orderInfo.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="text-foreground">{service.name}</span>
                  <Badge variant="outline">{service.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>返回首页</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/tasks')}
            className="flex items-center justify-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>查看任务</span>
          </Button>
          <Button 
            onClick={() => navigate('/coffee-chat')}
            className="flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>联系导师</span>
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-sm text-muted-foreground">
            如有任何问题，请联系客服 400-123-4567
          </p>
          <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
            <span>隐私政策</span>
            <span>服务条款</span>
            <span>联系方式</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;