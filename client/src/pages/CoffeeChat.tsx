import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { DateAvailability } from "@/components/DateAvailabilityPicker";

type MentorFromDB = {
  userId: string;
  displayName: string;
  education?: string;
  summary?: string;
  expertise?: string[];
  tags?: string[];
  availability?: DateAvailability[];
};

function ymd(date: Date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseYmd(ymdStr: string) {
  const [y, m, d] = ymdStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const CoffeeChat = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); 
  const [mentor, setMentor] = useState<MentorFromDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [questions, setQuestions] = useState<string>("");

  // const mentor = {
  //   name: "李导师",
  //   avatar: mentorLiAvatar,
  //   title: "美国商科申请专家",
  //   specialties: ["MBA申请", "金融硕士", "咨询行业"]
  // };

  // const availableTimes = [
  //   "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "19:00", "20:00"
  // ];

  const chatBenefits = [
    "了解你的背景和申请目标",
    "初步评估申请竞争力", 
    "推荐合适的申请策略",
    "解答申请相关疑问",
    "体验导师的专业度"
  ];


  // 拉取mentor信息
  useEffect(() => {
    const run = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }
        const res = await fetch(`/api/mentor/profile/${userId}`);
        if (!res.ok) {
          console.error("加载导师失败：", await res.text());
          setLoading(false);
          return;
        }
        const data = (await res.json()) as MentorFromDB;
        setMentor(data);
      } catch (e) {
        console.error("加载导师失败：", e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [userId]);

  // 可用日期集合（用于日历禁用逻辑）
  const availableDateSet = useMemo(() => {
    const set = new Set<string>();
    (mentor?.availability || []).forEach(a => set.add(a.date));
    return set;
  }, [mentor]);


  // 当前选中日期对应的时间段
  const timesForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    const d = ymd(selectedDate);
    const day = (mentor?.availability || []).find(a => a.date === d);
    if (!day) return [];
    // 这里用“start-end”作为每个按钮的显示
    return day.slots.map(s => `${s.start} - ${s.end}`);
  }, [mentor, selectedDate]);

  const handleBooking = async () => {
  if (!mentor || !selectedDate || !selectedTime) return;

  try {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/coffeechat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        mentorUserId: mentor.userId,
        date: ymd(selectedDate),         // "YYYY-MM-DD"
        time: selectedTime,              // "HH:mm - HH:mm"
        questions
      })
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error('创建预约失败：', txt);
      alert('创建预约失败：' + txt);
      return;
    }

    const data = await res.json(); // { message, chat }
    // 你可以根据 data.chat.meetingUrl 展示“加入会议”入口
    localStorage.setItem('coffeeChatBooking', JSON.stringify(data.chat));

    navigate('/booking-success'); // 成功页自己渲染 chat 信息即可
  } catch (e) {
    console.error(e);
    alert('创建预约失败，请稍后重试');
  }
};

  const isBookingValid = selectedDate && selectedTime;

// UI 开始
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <PageHeader />
        <div className="container max-w-2xl mx-auto px-4 py-10">加载中…</div>
      </div>
    );
  }

  if (loadError || !mentor) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <PageHeader />
        <div className="container max-w-2xl mx-auto px-4 py-10">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="text-destructive">{loadError || "未找到导师资料"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <h1 className="text-xl font-bold text-foreground">预约 CoffeeChat</h1>
        </div>

        {/* Mentor Info（只展示 DB 有的字段） */}
        <Card className="mb-6 shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              {/* <Avatar className="w-16 h-16">
                <AvatarImage src={mentorPlaceholder} alt={mentor.displayName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {mentor.displayName?.charAt(0) || "导"}
                </AvatarFallback>
              </Avatar> */}

              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">{mentor.displayName}</h2>
                {mentor.summary && <p className="text-muted-foreground mb-2">{mentor.summary}</p>}
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise?.map((e) => (
                    <Badge key={e} variant="secondary" className="text-xs">
                      {e}
                    </Badge>
                  ))}
                  {mentor.tags?.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
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
              30 分钟免费咨询
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                "了解你的背景和申请目标",
                "初步评估申请竞争力",
                "推荐合适的申请策略",
                "解答申请相关疑问",
                "体验导师的专业度",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-success" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-primary-light rounded-lg">
              <p className="text-sm text-primary-dark">💡 首次咨询完全免费，无任何隐藏费用</p>
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
              onSelect={(d) => {
                setSelectedDate(d);
                setSelectedTime(""); // 切换日期时清空已选时间段
              }}
              // 仅允许：今天以后 && 在导师 availability 中的日期
              disabled={(date) => {
                const today = new Date();
                // 把当天 00:00 作为界限（避免时区小时差）
                const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const inPast = dateOnly < todayOnly;
                const notAvailable = !availableDateSet.has(ymd(date));
                return inPast || notAvailable;
              }}
              // 高亮可用日期（可选）
              modifiers={{
                available: (date) => availableDateSet.has(ymd(date)),
              }}
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
              {timesForSelectedDate.length === 0 ? (
                <div className="text-sm text-muted-foreground">该日期暂无可约时间，请选择其他日期</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timesForSelectedDate.map((time) => (
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
              )}
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
                  <span className="text-foreground font-semibold">{mentor.displayName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">日期：</span>
                  <span className="text-foreground font-semibold">
                    {selectedDate?.toLocaleDateString("zh-CN")}
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
          确认预约 CoffeeChat
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          预约成功后，我们会通过微信联系你确认具体的通话方式
        </p>
      </div>
    </div>
  );
};

export default CoffeeChat;