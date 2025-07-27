import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowLeft, Download, FileText, Calendar, Award, TrendingUp, Share } from "lucide-react";
import studentAvatar from "@/assets/student-avatar.jpg";

const Profile = () => {
  const navigate = useNavigate();

  const userProfile = {
    name: "张同学",
    avatar: studentAvatar,
    target: "美国商科硕士",
    startDate: "2024-01-10",
    completedTasks: 3,
    totalTasks: 6,
    completionRate: 50
  };

  const achievements = [
    {
      category: "文书材料",
      items: [
        { 
          name: "Personal Statement", 
          version: "v3.0", 
          date: "2024-01-20", 
          mentor: "李导师", 
          type: "essay",
          reusableCount: 5,
          fileId: "PS001",
          isReusable: true
        },
        { 
          name: "推荐信模板", 
          version: "v1.0", 
          date: "2024-01-18", 
          mentor: "李导师", 
          type: "template",
          reusableCount: 5,
          fileId: "RL001",
          isReusable: true
        },
        { 
          name: "简历优化版", 
          version: "v2.0", 
          date: "2024-01-15", 
          mentor: "李导师", 
          type: "resume",
          reusableCount: 5,
          fileId: "CV001",
          isReusable: true
        }
      ]
    },
    {
      category: "申请策略",
      items: [
        { 
          name: "精准选校清单", 
          version: "v1.0", 
          date: "2024-01-16", 
          mentor: "李导师", 
          type: "strategy",
          reusableCount: 5,
          fileId: "SC001",
          isReusable: true
        },
        { 
          name: "申请时间规划", 
          version: "v1.0", 
          date: "2024-01-16", 
          mentor: "李导师", 
          type: "timeline",
          reusableCount: 3,
          fileId: "TL001",
          isReusable: true
        },
        { 
          name: "背景提升建议", 
          version: "v1.0", 
          date: "2024-01-12", 
          mentor: "李导师", 
          type: "advice",
          reusableCount: 5,
          fileId: "BG001",
          isReusable: true
        }
      ]
    },
    {
      category: "面试准备",
      items: [
        { 
          name: "面试反馈报告", 
          version: "v1.0", 
          date: "2024-01-22", 
          mentor: "李导师", 
          type: "feedback",
          reusableCount: 2,
          fileId: "IV001",
          isReusable: true
        }
      ]
    }
  ];

  const milestones = [
    { date: "2024-01-10", title: "开始申请旅程", description: "完成背景评估，制定申请计划", status: "completed" },
    { date: "2024-01-16", title: "确定选校清单", description: "基于背景分析完成15所院校选择", status: "completed" },
    { date: "2024-01-20", title: "文书初稿完成", description: "Personal Statement第一版完成", status: "completed" },
    { date: "2024-01-25", title: "推荐信准备", description: "推荐人确认，推荐信内容规划", status: "current" },
    { date: "2024-02-01", title: "文书定稿", description: "所有文书材料最终确认", status: "upcoming" },
    { date: "2024-02-15", title: "网申提交", description: "完成所有学校网申提交", status: "upcoming" }
  ];

  const stats = [
    { label: "已完成任务", value: userProfile.completedTasks, total: userProfile.totalTasks },
    { label: "申请进度", value: `${userProfile.completionRate}%`, color: "text-primary" },
    { label: "合作导师", value: "1位", color: "text-success" },
    { label: "目标院校", value: "15所", color: "text-warning" }
  ];

  const handleExportPDF = () => {
    console.log("Exporting growth profile to PDF");
    // Handle PDF export
  };

  const handleShare = () => {
    console.log("Sharing growth profile");
    // Handle sharing
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "essay": return "📝";
      case "template": return "📄";
      case "resume": return "📋";
      case "strategy": return "🎯";
      case "timeline": return "📅";
      case "advice": return "💡";
      case "feedback": return "📊";
      default: return "📁";
    }
  };

  const getMilestoneStatus = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "current": return "bg-primary text-primary-foreground";
      case "upcoming": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">成长档案</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share className="w-4 h-4 mr-2" />
              分享
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              导出PDF
            </Button>
          </div>
        </div>

        {/* Profile Summary */}
        <Card className="mb-6 shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {userProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">{userProfile.name}</h2>
                <p className="text-muted-foreground mb-3">目标：{userProfile.target}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>开始时间：{userProfile.startDate}</span>
                  <span>申请周期：{Math.ceil((new Date().getTime() - new Date(userProfile.startDate).getTime()) / (1000 * 3600 * 24))} 天</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft border-0">
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${stat.color || 'text-foreground'}`}>
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="achievements">成果汇总</TabsTrigger>
            <TabsTrigger value="timeline">成长轨迹</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6 mt-6">
            {achievements.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="shadow-soft border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getFileIcon(item.type)}</span>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-foreground">{item.name}</h4>
                                <Badge variant="outline" className="text-xs border-primary text-primary">
                                  {item.version}
                                </Badge>
                                <Badge className="text-xs bg-primary text-primary-foreground">
                                  {item.fileId}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <span>{item.date}</span>
                                <span>•</span>
                                <span>{item.mentor}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <FileText className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Reusability Information */}
                        <></>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6 mt-6">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  申请进程时间线
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-3 h-3 rounded-full mt-2 ${getMilestoneStatus(milestone.status)} flex-shrink-0`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                          <Badge className={getMilestoneStatus(milestone.status)}>
                            {milestone.status === 'completed' ? '已完成' : 
                             milestone.status === 'current' ? '进行中' : '待开始'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{milestone.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {milestone.date}
                        </div>
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-px h-8 bg-border ml-1.5 mt-6"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Info */}
        <Card className="mt-6 shadow-soft border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground mb-1">导出成长档案</h4>
                <p className="text-sm text-muted-foreground">
                  可用于奖学金申请、交换项目申请等场景
                </p>
              </div>
              <Button onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                导出完整档案
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;