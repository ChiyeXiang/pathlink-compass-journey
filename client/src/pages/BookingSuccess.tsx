import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { CheckCircle, Calendar, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const [chat, setChat] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem('coffeeChatBooking');
    if (raw) setChat(JSON.parse(raw));
  }, []);

  // const bookingInfo = JSON.parse(localStorage.getItem('coffeeChatBooking') || '{}');
  // const nextSteps = [
  //   {
  //     title: "微信联系确认",
  //     description: "我们会在1小时内通过微信联系你，确认通话方式",
  //     time: "1小时内"
  //   },
  //   {
  //     title: "导师准备", 
  //     description: "导师会根据你的问题做针对性准备",
  //     time: "咨询前1天"
  //   },
  //   {
  //     title: "正式咨询",
  //     description: "30分钟1对1专业咨询，解答申请疑问",
  //     time: bookingInfo.date ? new Date(bookingInfo.date).toLocaleDateString('zh-CN') : ''
  //   }
  // ];

  const handleContinue = () => {
    navigate('/mentor-detail');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  if (!chat) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <PageHeader />
        <div className="container max-w-2xl mx-auto px-4 py-10">没有预约信息</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-2xl mx-auto px-4 py-10">
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle>预约成功</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>导师：{chat.mentorUserId}</div>
            <div>开始时间：{new Date(chat.startTime).toLocaleString('zh-CN')}</div>
            <div>结束时间：{new Date(chat.endTime).toLocaleString('zh-CN')}</div>
            {chat.meetingUrl && (
              <div className="mt-4">
                <a href={chat.meetingUrl} target="_blank" rel="noreferrer">
                  <Button className="w-full">进入腾讯会议</Button>
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

//   return (
//     <div className="min-h-screen bg-gradient-soft">
//       <PageHeader />
//       <div className="container max-w-4xl mx-auto px-4 py-8">
//         {/* Success Message Row */}
//         <div className="text-center mb-8">
//           <div className="w-20 h-20 bg-success rounded-full mx-auto mb-4 flex items-center justify-center">
//             <CheckCircle className="w-10 h-10 text-success-foreground" />
//           </div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">预约成功！</h1>
//           <p className="text-muted-foreground">你的CoffeeChat已经预约成功</p>
//         </div>

//         {/* Booking Details Row */}
//         <div className="mb-8">
//           <Card className="shadow-soft border-0">
//             <CardHeader>
//               <CardTitle>预约详情</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <Calendar className="w-5 h-5 text-primary" />
//                     <span className="font-semibold">日期</span>
//                   </div>
//                   <span className="text-foreground">
//                     {bookingInfo.date ? new Date(bookingInfo.date).toLocaleDateString('zh-CN') : '2025/8/8'}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <Clock className="w-5 h-5 text-primary" />
//                     <span className="font-semibold">时间</span>
//                   </div>
//                   <span className="text-foreground">{bookingInfo.time || '10:00'}</span>
//                 </div>

//                 <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <Clock className="w-5 h-5 text-primary" />
//                     <span className="font-semibold">咨询时长</span>
//                   </div>
//                   <span className="text-foreground">30分钟</span>
//                 </div>

//                 <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <MessageCircle className="w-5 h-5 text-primary" />
//                     <span className="font-semibold">导师</span>
//                   </div>
//                   <span className="text-foreground">{bookingInfo.mentor || '李导师'}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Next Steps Row */}
//         <div className="mb-8">
//           <Card className="shadow-soft border-0">
//             <CardHeader>
//               <CardTitle>接下来会发生什么？</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {nextSteps.map((step, index) => (
//                   <div key={index} className="flex items-start space-x-3">
//                     <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0">
//                       {index + 1}
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
//                       <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{step.description}</p>
//                       <p className="text-sm text-primary font-medium">{step.time}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Tips and Actions Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Tips */}
//           <Card className="shadow-soft border-0">
//             <CardContent className="p-6">
//               <div className="bg-primary-light rounded-lg p-4">
//                 <h4 className="font-semibold text-primary-dark mb-4 text-lg flex items-center">
//                   <span className="mr-2">💡</span>
//                   咨询小贴士
//                 </h4>
//                 <ul className="text-sm text-primary-dark space-y-3">
//                   <li>• 准备好你的简历和成绩单</li>
//                   <li>• 列出具体的申请疑问</li>
//                   <li>• 提前考虑你的申请目标</li>
//                   <li>• 准备一个安静的通话环境</li>
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Action Buttons */}
//           <div className="space-y-4">
//             <Button className="w-full h-12 text-base" onClick={handleContinue}>
//               查看导师服务详情
//               <ArrowRight className="w-4 h-4 ml-2" />
//             </Button>
//             <Button variant="outline" className="w-full h-12 text-base" onClick={handleBackHome}>
//               返回首页
//             </Button>
            
//             {/* Contact Info */}
//             <div className="text-center pt-4">
//               <p className="text-sm text-muted-foreground">
//                 如有疑问，请联系客服微信：<br />
//                 <span className="font-semibold">PathLinkHelper</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default BookingSuccess;