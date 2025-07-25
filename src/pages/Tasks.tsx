import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowLeft, Upload, Download, FileText, Clock, CheckCircle, Play, Pause, Calendar, User, HelpCircle, Coffee, Archive } from "lucide-react";
import mentorLiAvatar from "@/assets/mentor-li.jpg";

const Tasks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("current");

  const currentTasks = [
    {
      id: "task1",
      title: "精准选校咨询",
      description: "基于你的背景制定选校策略",
      status: "in-progress",
      progress: 60,
      phase: "执行中",
      mentor: "李导师",
      mentorAvatar: "/assets/mentor-li.jpg",
      version: "v2.0",
      hasMeetingNote: true,
      coffeeChatRemaining: 2,
      deliverables: [
        { name: "选校清单", status: "completed", url: "#", version: "v2.0", reusable: true },
        { name: "申请难度分析", status: "in-progress", url: "", version: "v1.0", reusable: true },
        { name: "专业匹配报告", status: "pending", url: "", version: "", reusable: true },
        { name: "时间规划表", status: "pending", url: "", version: "", reusable: true }
      ],
      timeline: [
        { phase: "启动", status: "completed", date: "2024-01-15" },
        { phase: "执行", status: "current", date: "2024-01-18" },
        { phase: "交付", status: "pending", date: "2024-01-22" }
      ],
      nextAction: "",
      dueDate: "2024-01-22",
      reusabilityNote: "该阶段成果会作为档案长期留存，未来可用于研究生申请/奖学金/交换，免费调取 5 次"
    },
    {
      id: "task2", 
      title: "核心文书共创",
      description: "1对1文书指导和修改",
      status: "scheduled",
      progress: 0,
      phase: "即将开始",
      mentor: "李导师",
      mentorAvatar: "/assets/mentor-li.jpg",
      version: "",
      hasMeetingNote: false,
      coffeeChatRemaining: 3,
      deliverables: [
        { name: "Personal Statement初稿", status: "pending", url: "", version: "", reusable: true },
        { name: "Essay结构优化", status: "pending", url: "", version: "", reusable: true },
        { name: "语言润色", status: "pending", url: "", version: "", reusable: true },
        { name: "无限次修改", status: "pending", url: "", version: "", reusable: true }
      ],
      timeline: [
        { phase: "启动", status: "pending", date: "2024-01-25" },
        { phase: "执行", status: "pending", date: "2024-01-28" },
        { phase: "交付", status: "pending", date: "2024-02-10" }
      ],
      nextAction: "",
      dueDate: "2024-02-10",
      reusabilityNote: "文书成果可复用于多个申请项目，支持长期保存和调取"
    }
  ];

  const completedTasks = [
    {
      id: "task0",
      title: "背景评估报告",
      description: "全面分析申请背景和竞争力",
      status: "completed",
      progress: 100,
      phase: "已完成",
      mentor: "李导师",
      completedDate: "2024-01-12",
      rating: 5,
      deliverables: [
        { name: "背景分析报告", status: "completed", url: "#" },
        { name: "竞争力评估", status: "completed", url: "#" },
        { name: "提升建议", status: "completed", url: "#" }
      ]
    }
  ];

  const handleTaskAction = (taskId: string, action: string) => {
    console.log(`Task ${taskId} action: ${action}`);
    // Handle task actions
  };

  const handleUpload = (taskId: string, deliverableId: string) => {
    console.log(`Upload for task ${taskId}, deliverable ${deliverableId}`);
    // Handle file upload
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success";
      case "in-progress": return "text-primary";
      case "current": return "text-primary";
      case "pending": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "in-progress": return <Play className="w-4 h-4" />;
      case "current": return <Play className="w-4 h-4" />;
      case "pending": return <Pause className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-4xl mx-auto px-4 py-6">
        {/* User Profile Section */}
        <Card className="mb-6 shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/assets/student-avatar.jpg" alt="张同学" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  张
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-1">张同学</h2>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <span>账号ID: STU2024001</span>
                  <span>•</span>
                  <span>目标: 美国商科硕士</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>注册时间: 2024-01-10</span>
                  <span>•</span>
                  <span>服务状态: 进行中</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">个人中心</h1>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">进行中 ({currentTasks.length})</TabsTrigger>
            <TabsTrigger value="completed">已完成 ({completedTasks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6 mt-6">
            {currentTasks.map((task) => (
              <Card key={task.id} className="shadow-soft border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <p className="text-muted-foreground">{task.description}</p>
                    </div>
                    <Badge 
                      className={`${
                        task.status === 'in-progress' ? 'bg-primary text-primary-foreground' :
                        task.status === 'scheduled' ? 'bg-warning text-warning-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}
                    >
                      {task.phase}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                   {/* Mentor Info with Avatar */}
                  <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={task.mentorAvatar} 
                        alt={task.mentor}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-accent-foreground">执行负责人</p>
                        <p className="text-sm text-foreground">{task.mentor}</p>
                    
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        {task.hasMeetingNote && (
                          <></>
                        )}
                        {task.version && (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      {/* <span>整体进度</span>
                      <span>{task.progress}%</span> */}
                    </div>
                    {/* <Progress value={task.progress} className="h-2" /> */}
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="font-semibold mb-3">任务流程</h4>
                    <div className="flex items-center space-x-4">
                      {task.timeline.map((phase, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`flex items-center space-x-2 ${getStatusColor(phase.status)}`}>
                            {getStatusIcon(phase.status)}
                            <div className="text-center">
                              <p className="text-sm font-medium">{phase.phase}</p>
                              <p className="text-xs text-muted-foreground">{phase.date}</p>
                            </div>
                          </div>
                          {index < task.timeline.length - 1 && (
                            <div className="w-8 h-px bg-border ml-4 mr-4"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">交付成果</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {task.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className={getStatusColor(deliverable.status)}>
                              {getStatusIcon(deliverable.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{deliverable.name}</span>
                                {deliverable.version && (
                                  <></>
                                )}
                              </div>
                              {deliverable.reusable && (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {deliverable.status === "completed" && deliverable.url && (
                              <Button size="sm" variant="ghost" className="h-8 px-2">
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                            {deliverable.status === "in-progress" && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2"
                                onClick={() => handleUpload(task.id, deliverable.name)}
                              >
                                <Upload className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Action */}
                  <div className="flex items-center justify-between p-4 bg-primary-light rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-primary-dark">接下来要执行的任务</p>
                      <p className="text-sm text-primary-dark">{task.nextAction}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">预计交付</p>
                      <p className="text-sm font-semibold text-foreground">{task.dueDate}</p>
                    </div>
                  </div>

                  {/* Actions
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      查看详情
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      联系导师
                    </Button>
                  </div> */}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6 mt-6">
            {completedTasks.map((task) => (
              <Card key={task.id} className="shadow-soft border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <p className="text-muted-foreground">{task.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-success text-success-foreground mb-2">
                        已完成
                      </Badge>
                      <p className="text-xs text-muted-foreground">完成日期: {task.completedDate}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Deliverables */}
                  <div>
                    <h4 className="font-semibold mb-3">交付成果</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {task.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span className="text-sm font-medium">{deliverable.name}</span>
                          </div>
                          <Button size="sm" variant="ghost" className="h-8 px-2">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-success">任务已完成</p>
                      <p className="text-sm text-muted-foreground">导师：{task.mentor}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < task.rating! ? 'text-warning' : 'text-muted-foreground'}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Tasks;