import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowLeft, Star, Award, CheckCircle, Calendar, Clock, DollarSign } from "lucide-react";
import mentorLiAvatar from "@/assets/mentor-li.jpg";


type Slot = { start: string; end: string };
type AvailabilityItem = { date: string; slots: Slot[] };

// —— 后端 Mentor 模型里已有的字段 —— //
type MentorFromDB = {
  userId: string;
  displayName: string;
  education?: string;
  summary?: string;
  expertise?: string[];
  tags?: string[];
  availability?: AvailabilityItem[];
  updatedAt?: string;
};

const singleServices = [
  {
    id: "school-consulting",
    name: "精准选校咨询",
    description: "基于你的背景和目标，制定个性化选校策略",
    deliverables: ["选校清单(10-15所)", "申请难度分析", "专业匹配报告", "时间规划表"],
    duration: "2-3天",
    price: 1299,
    originalPrice: 1599,
    sessions: 1
  }
];

const packages = [
  {
    id: "basic",
    name: "基础成长包",
    description: "适合有一定准备基础的同学",
    includes: ["精准选校咨询", "核心文书共创", "推荐信策略设计"],
    originalPrice: 5097,
    price: 3999,
    savings: 1098,
    suitable: "已有初步规划，需要专业指导完善申请材料",
    badge: "热门选择"
  },
  {
    id: "premium",
    name: "多校执行包",
    description: "全方位申请支持，适合申请多个项目",
    includes: ["精准选校咨询", "核心文书共创", "推荐信策略设计", "面试技巧训练", "网申检查服务"],
    originalPrice: 7396,
    price: 5699,
    savings: 1697,
    suitable: "申请5+学校，需要全流程专业支持",
    badge: "推荐"
  },
  {
    id: "elite",
    name: "名校挑战包",
    description: "冲刺顶尖院校的全方位定制服务",
    includes: ["所有单项服务", "背景提升指导", "奖学金申请策略", "个人品牌包装", "全程1对1陪伴"],
    originalPrice: 12999,
    price: 8999,
    savings: 4000,
    suitable: "目标Top 10院校，需要深度定制化服务",
    badge: "限量"
  }
];

const MentorDetail = () => {
  const navigate = useNavigate();
  const { userId: paramUserId } = useParams();
  const [selectedService, setSelectedService] = useState<string>("");
  const [mentor, setMentor] = useState<MentorFromDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // 拉取逻辑：优先 token -> /api/mentor/profile/me；否则 /api/mentor/profile/:userId
  useEffect(() => {
    const run = async () => {
      try {
        const token = localStorage.getItem("token");

        // 1) 优先用 token 获取当前登录用户的导师档案
        if (token) {
          const meRes = await fetch("/api/mentor-detail/:userId", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (meRes.ok) {
            const raw = (await meRes.json()) as MentorFromDB;
            setMentor(toView(raw));
            return;
          }
          if (meRes.status !== 404) {
            throw new Error(await meRes.text());
          }
        }

        // 2) 兜底：用 URL 的 :userId
        if (paramUserId) {
          const res = await fetch(`/api/mentor/profile/${paramUserId}`);
          if (res.status === 404) { setNotFound(true); return; }
          if (!res.ok) throw new Error(await res.text());
          const raw = (await res.json()) as MentorFromDB;
          setMentor(toView(raw));
        } else {
          setNotFound(true);
        }
      } catch (e) {
        console.error("加载导师详情失败：", e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [paramUserId]);

  // DB -> 视图模型：把缺失字段用固定/派生值补全
  const toView = (m: MentorFromDB) => {
    const displayName = m.displayName || "导师";
    const expertise = m.expertise ?? [];
    const tags = m.tags ?? [];
    const availability = m.availability ?? [];

    // 头衔优先取 tag 或 expertise 的第一项，否则固定文案
    const title =
      (tags[0] ? `${tags[0]}专家` : "") ||
      (expertise[0] ? `${expertise[0]}专家` : "") ||
      "美国商科申请专家";

    return {
      userId: m.userId,
      displayName,
      education: m.education,
      summary: m.summary,
      expertise,
      tags,
      availability,

      // 不在 DB 的展示字段：按你的默认值
      avatarUrl: mentorLiAvatar,
      title,
      rating: 4.9,
      experience: "5年+",
      background:
        m.summary ||
        "曾任高盛投资银行分析师，专注于商科申请5年+，累计帮助120+学生成功申请梦校",
      specialties: expertise.length ? expertise : ["MBA申请", "金融硕士", "咨询行业", "背景提升"],
      achievements: [
        "95%学生获得Top 20商学院录取",
        "平均每位学生获得3+录取",
        "帮助学生获得奖学金总额超过$500万"
      ]
    };
  };

  const onSelectService = (id: string) => {
    setSelectedService(id);
    localStorage.setItem("selectedService", id);
  };

  const handleCoffeeChat = () => {
    // 你后续可以在这里把 mentor.userId 传入预约页
    navigate("/coffee-chat");
  };

  const handlePurchase = () => {
    if (!selectedService) return;
    localStorage.setItem("purchaseService", selectedService);
    navigate("/tasks");
  };

  // 展示用的派生字段：名字/称呼、标题（没有就用标签/擅长方向拼一个）
  const displayName = mentor?.displayName ?? "导师";
  const titleText = useMemo(() => {
    if (mentor?.tags?.length) return mentor.tags.slice(0, 1).join("、");
    if (mentor?.expertise?.length) return mentor.expertise.slice(0, 1).join("、") + "专家";
    return "专业导师";
  }, [mentor]);

  // 头像：后端没有头像字段时，用占位
  const avatarSrc =
    `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(displayName)}`;

  // “最近可约日期”简单取最早一条
  const nextAvailableDate = useMemo(() => {
    const dates = (mentor?.availability || []).map(a => a.date).sort();
    return dates[0] || "";
  }, [mentor]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <PageHeader />
        <div className="container max-w-4xl mx-auto px-4 py-10">加载中…</div>
      </div>
    );
  }

  if (notFound || !mentor) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <PageHeader />
        <div className="container max-w-4xl mx-auto px-4 py-10">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          未找到导师资料
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">导师详情</h1>
        </div>

        {/* Mentor Profile */}
        <Card className="mb-6 shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage alt={mentor.displayName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {mentor.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Award className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-semibold text-foreground">{mentor.education}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">

                </div>

                <div className="space-y-1">
                  
                </div>
              </div>


            <div className="mt-6 pt-6 border-t">
              <Button onClick={handleCoffeeChat} variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                预约免费CoffeeChat（30分钟）
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="single">单项服务</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-4 mt-6">
            {singleServices.map((service) => (
              <Card
                key={service.id}
                className={`shadow-soft border-0 cursor-pointer transition-all duration-200 ${selectedService === service.id ? 'ring-2 ring-primary' : 'hover:shadow-medium'
                  }`}
                onClick={() => onSelectService(service.id)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{service.name}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground line-through">¥{service.originalPrice}</span>
                        <span className="text-xl font-bold text-primary">¥{service.price}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">交付内容：</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.deliverables.map((item, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 mr-2 text-success" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>包含 {service.sessions} 次1对1服务</span>
                    <span className="text-success">立省 ¥{service.originalPrice - service.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

        </Tabs>

        {/* Purchase Buttons */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>包含 4 次1对1服务</span>
            <span className="text-success">立省 ¥400</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-14 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => {
                if (!selectedService) return;
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                cart.push({
                  id: selectedService,
                  type: 'service',
                  name: selectedService,
                  price: 1299,
                  mentor: '李导师'
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                // Show success message and don't navigate
                const event = new CustomEvent('cartAdded');
                window.dispatchEvent(event);
                // 触发购物车数量更新
                window.dispatchEvent(new CustomEvent('cartUpdate'));
              }}
              disabled={!selectedService}
            >
              <DollarSign className="w-5 h-5 mr-2" />
              加入购物车
            </Button>

            <Button
              className="h-14 text-lg"
              onClick={handlePurchase}
              disabled={!selectedService}
            >
              <DollarSign className="w-5 h-5 mr-2" />
              立即购买服务
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetail;