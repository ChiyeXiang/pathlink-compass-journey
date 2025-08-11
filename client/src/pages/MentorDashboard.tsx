import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import MentorProfileCard from '@/components/MentorProfileCard';
import { 
  User, 
  Edit, 
  Save, 
  Calendar as CalendarIcon,
  Clock,
  Upload,
  Eye,
  X
} from 'lucide-react';

const MentorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  // Profile数据
  const [profile, setProfile] = useState({
    title: '资深商科申请导师',
    expertise: 'MBA申请、商科硕士申请、文书撰写',
    education: '哈佛商学院 MBA',
    summary: '专注于商科申请5年+，累计帮助120+学生成功申请梦校',
    serviceTypes: ['MBA申请', '文书撰写', '选校与专业建议'],
    serviceStyles: ['高效结果导向型', '个性化定制策略', '严谨务实风格'],
    specialAdvantages: ['顶尖院校录取经验丰富', '高额奖学金获取经验', '曾任招生官/面试官']
  });

  // 统计数据
  const [stats] = useState({
    rating: 4.9,
    students: 120,
    experience: 5
  });

  // 标签选项
  const tagOptions = {
    serviceTypes: [
      'MBA申请', '本科申请', '硕士申请', '博士申请', '转专业申请',
      '文书撰写', '背景提升规划', '奖学金申请', '选校与专业建议'
    ],
    serviceStyles: [
      '强逻辑规划型', '情绪稳定陪伴型', '高效结果导向型', '善于挖掘故事',
      '个性化定制策略', '亲和耐心风格', '严谨务实风格', '快速反馈型',
      '适合长期辅导', '适合短期冲刺'
    ],
    specialAdvantages: [
      '顶尖院校录取经验丰富', '高额奖学金获取经验', '低背景逆袭案例多',
      '多国/跨体系申请经验', '四大/投行/大厂经历', '海外名校毕业',
      '曾任招生官/面试官', '案例库丰富', '实习/科研资源对接', '面试辅导命中率高'
    ]
  };

  // 时间槽选项
  const timeSlots = [
    '09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00',
    '15:00-16:00', '16:00-17:00', '17:00-18:00', '19:00-20:00',
    '20:00-21:00', '21:00-22:00'
  ];

  // 处理头像上传
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setAvatarPreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理标签选择
  const handleTagToggle = (category, tag) => {
    setProfile(prev => {
      const currentTags = prev[category];
      
      // 如果标签已存在，则移除
      if (currentTags.includes(tag)) {
        return { ...prev, [category]: currentTags.filter(t => t !== tag) };
      }
      
      // 如果标签不存在且已达到上限，显示提示
      if (currentTags.length >= 5) {
        toast({
          title: "达到上限啦！",
          description: `每个类别最多只能选择5个标签`,
          duration: 1000,
        });
        return prev;
      }
      
      // 添加新标签
      return { ...prev, [category]: [...currentTags, tag] };
    });
  };

  // 处理时间槽选择
  const handleTimeSlotToggle = (timeSlot) => {
    setSelectedTimeSlots(prev => 
      prev.includes(timeSlot)
        ? prev.filter(t => t !== timeSlot)
        : [...prev, timeSlot]
    );
  };

  // 保存profile
  const handleSaveProfile = () => {
    // 这里可以添加保存到后端的逻辑
    console.log('保存profile:', profile);
    setIsEditing(false);
    setShowPreview(false);
  };

  // 保存时间安排
  const handleSaveSchedule = () => {
    // 这里可以添加保存到后端的逻辑
    console.log('保存时间安排:', { date: selectedDate, timeSlots: selectedTimeSlots });
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <PageHeader showHomeButton={true} showProfileButtons={true} />
        
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">导师仪表板</h1>
            <p className="text-gray-600 mt-2">管理您的个人资料和预约时间</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">个人资料</TabsTrigger>
              <TabsTrigger value="schedule">时间安排</TabsTrigger>
            </TabsList>

            {/* 个人资料标签页 */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>个人资料</CardTitle>
                  <div className="flex items-center space-x-2">
                    {isEditing && (
                      <Button
                        variant="outline"
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        {showPreview ? '隐藏预览' : '预览'}
                      </Button>
                    )}
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      className="flex items-center gap-2"
                    >
                      {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      {isEditing ? '保存' : '编辑'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 头像上传 */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={avatarPreview} />
                      <AvatarFallback>
                        <User className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div>
                        <Label htmlFor="avatar-upload" className="cursor-pointer">
                          <Button variant="outline" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              上传头像
                            </span>
                          </Button>
                        </Label>
                        <Input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>

                  {/* 基本信息 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title">称呼</Label>
                      <Input
                        id="title"
                        value={profile.title}
                        onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expertise">擅长科目/方向</Label>
                      <Input
                        id="expertise"
                        value={profile.expertise}
                        onChange={(e) => setProfile(prev => ({ ...prev, expertise: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="education">学历或专业背景</Label>
                      <Input
                        id="education"
                        value={profile.education}
                        onChange={(e) => setProfile(prev => ({ ...prev, education: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="summary">个人概括</Label>
                      <Textarea
                        id="summary"
                        value={profile.summary}
                        onChange={(e) => setProfile(prev => ({ ...prev, summary: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                        placeholder="例如：专注于商科申请5年+，累计帮助120+学生成功申请梦校"
                      />
                    </div>
                  </div>

                  {/* 标签选择 */}
                  {isEditing && (
                    <div className="space-y-6">
                      {Object.entries(tagOptions).map(([category, tags]) => (
                        <div key={category}>
                          <Label className="text-base font-medium">
                            {category === 'serviceTypes' && '擅长服务类型'}
                            {category === 'serviceStyles' && '服务风格类'}
                            {category === 'specialAdvantages' && '特殊优势类'}
                            <span className="text-sm text-gray-500 ml-2">
                              (已选择 {profile[category].length}/5)
                            </span>
                          </Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant={profile[category].includes(tag) ? "default" : "outline"}
                                className={`cursor-pointer ${
                                  profile[category].includes(tag) 
                                    ? 'bg-green-600 hover:bg-green-700' 
                                    : 'hover:bg-gray-100'
                                }`}
                                onClick={() => handleTagToggle(category, tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 已选择的标签展示 */}
                  {!isEditing && (
                    <div className="space-y-4">
                      {Object.entries(tagOptions).map(([category, tags]) => (
                        profile[category].length > 0 && (
                          <div key={category}>
                            <Label className="text-base font-medium">
                              {category === 'serviceTypes' && '擅长服务类型'}
                              {category === 'serviceStyles' && '服务风格类'}
                              {category === 'specialAdvantages' && '特殊优势类'}
                            </Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {profile[category].map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Profile预览 */}
              {showPreview && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profile 预览</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MentorProfileCard 
                      profile={{ ...profile, avatar: avatarPreview }}
                      stats={stats}
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* 时间安排标签页 */}
            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    Coffee Chat 时间安排
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 日历选择 */}
                    <div>
                      <Label className="text-base font-medium mb-4 block">选择日期</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </div>

                    {/* 时间槽选择 */}
                    <div>
                      <Label className="text-base font-medium mb-4 block">选择时间段</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((timeSlot) => (
                          <Button
                            key={timeSlot}
                            variant={selectedTimeSlots.includes(timeSlot) ? "default" : "outline"}
                            onClick={() => handleTimeSlotToggle(timeSlot)}
                            className="justify-start"
                            disabled={!selectedDate}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            {timeSlot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 保存按钮 */}
                  <div className="mt-6">
                    <Button
                      onClick={handleSaveSchedule}
                      disabled={!selectedDate || selectedTimeSlots.length === 0}
                      className="w-full"
                    >
                      保存时间安排
                    </Button>
                  </div>

                  {/* 已安排的时间展示 */}
                  {selectedDate && selectedTimeSlots.length > 0 && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">已安排的时间：</h4>
                      <p className="text-green-700">
                        {selectedDate.toLocaleDateString('zh-CN')} - {selectedTimeSlots.join(', ')}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default MentorDashboard;
