import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowRight, CheckCircle, Users, Star, Clock, DollarSign, Target } from "lucide-react";

// 导入图片
import coachHero from "@/assets/coach-hero.jpg";
import jesseL from "@/assets/jesse-l.jpg";
import samA from "@/assets/sam-a.jpg";
import tile1 from "@/assets/tile-1.jpg";
import tile2 from "@/assets/tile-2.jpg";
import tile3 from "@/assets/tile-3.jpg";
import tile4 from "@/assets/tile-4.jpg";
import bigCardImage from "@/assets/big-card-image.jpg";
import unlockOpportunityGraphic from "@/assets/unlock-opportunity-graphic.png";
import beYourOwnBoss from "@/assets/be-your-own-boss.jpg";
import keepMoreOfWhatsYours from "@/assets/keep-more-of-whats-yours.jpg";
import focusOnThingsThatMatter from "@/assets/focus-on-things-that-matter.jpg";

const MentorRegistration = () => {
  const navigate = useNavigate();

  const handleBecomeCoach = () => {
    // 跳转到导师详细设置页面
    navigate('/mentor-setup');
  };

  const steps = [
    {
      icon: <CheckCircle className="w-11 h-11 text-purple-500" />,
      title: "Apply",
      description: "Build your coach profile and tell us about your expertise"
    },
    {
      icon: <CheckCircle className="w-9 h-10 text-green-500" />,
      title: "Get approved",
      description: "Our team reviews your profile to ensure the best coaches join Leland"
    },
    {
      icon: <Users className="w-10 h-10 text-blue-500" />,
      title: "Start coaching",
      description: "We'll review your information and give you the green light to start coaching!"
    },
    {
      icon: <Star className="w-11 h-11 text-yellow-500" />,
      title: "Build your business",
      description: "Earn money, build your brand, and guide the next generation of leaders"
    }
  ];

  const benefits = [
    {
      image: beYourOwnBoss,
      title: "Be your own boss",
      description: "Here, you work for yourself. You choose the services you offer and define your working hours."
    },
    {
      image: keepMoreOfWhatsYours,
      title: "Keep more of what's yours",
      description: "On Leland, our take is among the most favorable in the industry."
    },
    {
      image: focusOnThingsThatMatter,
      title: "Focus on the things that matter",
      description: "We take care of payment, scheduling, and more, so you can focus on being a fantastic coach."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-gray-800">Leland</div>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">Free events</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">成为导师</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-gray-300 text-gray-700">
            登录
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex items-center px-12 py-12 max-w-7xl mx-auto">
        <div className="flex-1 pr-12">
          <div className="mb-10">
            <h1 className="text-6xl font-semibold text-gray-800 leading-tight mb-10">
              释放你的专业价值，<br />
              影响全球高潜学生。
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
              7 分钟完成导师申请，<br />
              开启知识变现与人生影响力的双重旅程
            </p>
            <Button 
              onClick={handleBecomeCoach}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 text-lg font-medium rounded-lg"
            >
              成为导师
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <img 
            src={coachHero} 
            alt="Coach Hero" 
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-12 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">
            Join hundreds of coaches growing their business on Leland.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jesse L. Testimonial */}
            <Card className="bg-gray-50 border-0">
              <CardContent className="p-6">
                <div className="flex items-start mb-5">
                  <img 
                    src={jesseL} 
                    alt="Jesse L." 
                    className="w-12 h-12 rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">Jesse L.</h4>
                    <p className="text-gray-600 text-sm">MBA Coach</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-5">
                  "When I heard about Leland, I felt an immediate calling to get involved. 
                  Education, and the opportunities that it affords, is so vital, especially 
                  in bridging the gap between the privileged few and the non-quite-as-privileged many. 
                  That is why I coach."
                </p>
                <div className="flex items-center">
                  <a href="#" className="text-green-600 font-medium mr-2">View Jesse's Profile</a>
                  <ArrowRight className="w-5 h-5 text-green-600" />
                </div>
              </CardContent>
            </Card>

            {/* Sam A. Testimonial */}
            <Card className="bg-gray-50 border-0">
              <CardContent className="p-6">
                <div className="flex items-start mb-5">
                  <img 
                    src={samA} 
                    alt="Sam A." 
                    className="w-12 h-12 rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">Sam A.</h4>
                    <p className="text-gray-600 text-sm">Management Consulting Coach</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-5">
                  "Building relationships with individuals from outside my typical circle, 
                  hearing about their paths and how they're preparing for careers is inspiring 
                  and motivating. A little extra money on the side is never a bad perk either."
                </p>
                <div className="flex items-center">
                  <a href="#" className="text-green-600 font-medium mr-2">View Sam's Profile</a>
                  <ArrowRight className="w-5 h-5 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-12 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mb-8">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="px-12 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <img src={tile1} alt="Community 1" className="w-full rounded-3xl" />
                <img src={tile2} alt="Community 2" className="w-full rounded-3xl" />
              </div>
              <div className="space-y-5 pt-12">
                <img src={tile3} alt="Community 3" className="w-full rounded-3xl" />
                <img src={tile4} alt="Community 4" className="w-full rounded-3xl" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-800">
                我们相信，每一位认真做教育的人都值得被支持
              </h2>
              <p className="text-gray-600 leading-relaxed">
              你或许曾是：
在校/在职的世界名校毕业生，却苦于没有合适平台去影响学生；
在小红书上被低价咨询消耗、被流量平台压价；
在留学机构承担大量撰写任务，却无法建立属于自己的导师品牌；
想认真陪伴学生，却被当作“写手”使用；
怀有教育初心，但找不到能支持你长期发展的舞台。
              </p>
              <div className="flex items-center">
                <a href="#" className="text-green-600 font-medium mr-2">Browse Leland coaches</a>
                <ArrowRight className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <div className="relative h-[702px] rounded-3xl overflow-hidden">
          <img 
            src={bigCardImage} 
            alt="Your clients are waiting" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-12">
            <div className="text-white">
              <h2 className="text-6xl font-semibold mb-8 leading-tight">
                Your clients are<br />waiting for you.
              </h2>
              <Button 
                onClick={handleBecomeCoach}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 text-lg font-medium rounded-lg"
              >
                Become a Coach
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Unlock Opportunity Section */}
      <section className="px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-black">
                Unlock opportunity
              </h2>
              <p className="text-gray-600 leading-relaxed">
                There's no better feeling than helping someone accomplish their goals. 
                Come change lives with us.
              </p>
              <div className="flex items-center">
                <a href="#" className="text-green-600 font-medium mr-2">Become a coach</a>
                <ArrowRight className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div>
              <img 
                src={unlockOpportunityGraphic} 
                alt="Unlock Opportunity" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-6">
              <div className="text-2xl font-bold">Leland</div>
              <div className="flex space-x-6">
                <a href="#" className="opacity-70 hover:opacity-100">
                  <Users className="w-6 h-6" />
                </a>
                <a href="#" className="opacity-70 hover:opacity-100">
                  <Star className="w-6 h-6" />
                </a>
                <a href="#" className="opacity-70 hover:opacity-100">
                  <Clock className="w-6 h-6" />
                </a>
              </div>
              <p className="text-sm opacity-70">© Leland 2025. All rights reserved.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Welcome</h3>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#" className="hover:opacity-100">Get started</a></li>
                <li><a href="#" className="hover:opacity-100">Log in</a></li>
                <li><a href="#" className="hover:opacity-100">Become a coach</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Library</h3>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#" className="hover:opacity-100">Content Library</a></li>
                <li><a href="#" className="hover:opacity-100">MBA</a></li>
                <li><a href="#" className="hover:opacity-100">College</a></li>
                <li><a href="#" className="hover:opacity-100">Management Consulting</a></li>
                <li><a href="#" className="hover:opacity-100">Product Management</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm opacity-70">
                <li><a href="#" className="hover:opacity-100">Careers</a></li>
                <li><a href="#" className="hover:opacity-100">Partnerships</a></li>
                <li><a href="#" className="hover:opacity-100">Terms of Service</a></li>
                <li><a href="#" className="hover:opacity-100">Privacy Policy</a></li>
                <li><a href="#" className="hover:opacity-100">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MentorRegistration; 