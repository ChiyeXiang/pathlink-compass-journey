import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { GraduationCap, Clock, Quote } from "lucide-react";

const MentorSetup = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // 暂时不跳转，等待后续功能实现
    console.log('开始建立档案按钮被点击');
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧：主要内容 */}
          <div className="flex-1">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">让我们开始建立你的导师档案</h1>
              <p className="text-muted-foreground mb-6">
                我们很高兴你能加入我们的导师团队！你将通过一系列问题来设置基本档案。完成后，你的档案将由我们的团队成员审核。
              </p>
            </div>

            <div className="text-center">
              <Button 
                onClick={handleGetStarted} 
                className="rounded-xl px-8 py-3 text-lg bg-primary hover:bg-primary-dark"
              >
                开始建立档案
              </Button>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-2" />
                  这通常需要5-7分钟
                </p>
              </div>
            </div>
          </div>

          {/* 右侧：导师评价 */}
          <div className="w-full lg:w-80">
            <div className="sticky top-8">
              <Card className="shadow-soft border-0">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <Quote className="w-8 h-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "成为导师让我重新审视了自己的职业道路，也让我有机会帮助他人避免我曾经的错误。这是一个非常有意义的经历。"
                    </p>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-foreground">M</span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">Mike L.</p>
                        <p className="text-xs text-muted-foreground">资深产品经理</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSetup; 