import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowLeft, Clock, Calendar as CalendarIcon, Gift, CheckCircle } from "lucide-react";
import mentorLiAvatar from "@/assets/mentor-li.jpg";

const CoffeeChat = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [questions, setQuestions] = useState<string>("");

  const mentor = {
    name: "李导师",
    avatar: mentorLiAvatar,
    title: "美国商科申请专家",
    specialties: ["MBA申请", "金融硕士", "咨询行业"]
  };

  const availableTimes = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "19:00", "20:00"
  ];

  const chatBenefits = [
    "了解你的背景和申请目标",
    "初步评估申请竞争力", 
    "推荐合适的申请策略",
    "解答申请相关疑问",
    "体验导师的专业度"
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;
    
    // Store booking info
    localStorage.setItem('coffeeChatBooking', JSON.stringify({
      date: selectedDate,
      time: selectedTime,
      questions: questions,
      mentor: mentor.name
    }));

    navigate('/booking-success');
  };

  const isBookingValid = selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <h1 className="text-xl font-bold text-foreground">预约CoffeeChat</h1>
        </div>

        {/* Mentor Info */}
        <Card className="mb-6 shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {mentor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">{mentor.name}</h2>
                <p className="text-muted-foreground mb-2">{mentor.title}</p>
                <div className="flex flex-wrap gap-1">
                  {mentor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Benefits */}
        <Card className="mb-6 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="w-5 h-5 mr-2 text-primary" />
              30分钟免费咨询
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {chatBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-success" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-primary-light rounded-lg">
              <p className="text-sm text-primary-dark">
                💡 首次咨询完全免费，无任何隐藏费用
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card className="mb-6 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
              选择日期
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Time Selection */}
        {selectedDate && (
          <Card className="mb-6 shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                选择时间
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="h-10"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questions */}
        <Card className="mb-6 shadow-soft border-0">
          <CardHeader>
            <CardTitle>想要咨询的问题（可选）</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="例如：我的背景适合申请哪些学校？如何提升申请竞争力？"
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-2">
              提前告诉我们你的问题，导师可以做更充分的准备
            </p>
          </CardContent>
        </Card>

        {/* Booking Summary */}
        {isBookingValid && (
          <Card className="mb-6 shadow-soft border-0">
            <CardHeader>
              <CardTitle>预约信息确认</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">导师：</span>
                  <span className="text-foreground font-semibold">{mentor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">日期：</span>
                  <span className="text-foreground font-semibold">
                    {selectedDate?.toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">时间：</span>
                  <span className="text-foreground font-semibold">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">时长：</span>
                  <span className="text-foreground font-semibold">30分钟</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">费用：</span>
                  <span className="text-success font-semibold">免费</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Book Button */}
        <Button 
          className="w-full h-14 text-lg"
          onClick={handleBooking}
          disabled={!isBookingValid}
        >
          确认预约CoffeeChat
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          预约成功后，我们会通过微信联系你确认具体的通话方式
        </p>
      </div>
    </div>
  );
};

export default CoffeeChat;