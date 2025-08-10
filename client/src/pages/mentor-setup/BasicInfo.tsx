import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageHeader } from '@/components/ui/page-header';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';

const BasicInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: 'Chiye',
    lastName: 'Xiang',
    location: '温州, 浙江, 中国',
    gender: '女',
    ethnicity: '',
    languages: []
  });

  const handleNext = () => {
    // 保存数据到localStorage或context
    localStorage.setItem('mentorBasicInfo', JSON.stringify(formData));
    navigate('/mentor-setup/education');
  };

  const handlePrevious = () => {
    navigate('/mentor-setup');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            告诉我们一些关于您的情况
          </h1>
          <p className="text-lg text-gray-600">
            让我们更好地了解您。这些信息有助于我们为您连接客户。
          </p>
        </div>

        {/* 表单区域 */}
        <div className="space-y-8">
          {/* 姓名 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-base font-medium mb-2 block">
                名字
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="h-12 text-base"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-base font-medium mb-2 block">
                姓氏
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="h-12 text-base"
              />
            </div>
          </div>

          {/* 位置 */}
          <div>
            <Label htmlFor="location" className="text-base font-medium mb-2 block">
              您在世界上的哪个地方？
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="h-12 text-base pl-10"
                placeholder="搜索您的位置"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              我们需要这些信息用于支付和税务目的。
            </p>
          </div>

          {/* 性别 */}
          <div>
            <Label htmlFor="gender" className="text-base font-medium mb-2 block">
              性别
            </Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="女">女</SelectItem>
                <SelectItem value="男">男</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
                <SelectItem value="不愿透露">不愿透露</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 种族/民族 */}
          <div>
            <Label htmlFor="ethnicity" className="text-base font-medium mb-2 block">
              种族/民族
            </Label>
            <Select value={formData.ethnicity} onValueChange={(value) => setFormData(prev => ({ ...prev, ethnicity: value }))}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="选择一个选项..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="亚裔">亚裔</SelectItem>
                <SelectItem value="非裔">非裔</SelectItem>
                <SelectItem value="拉丁裔">拉丁裔</SelectItem>
                <SelectItem value="白人">白人</SelectItem>
                <SelectItem value="原住民">原住民</SelectItem>
                <SelectItem value="太平洋岛民">太平洋岛民</SelectItem>
                <SelectItem value="多种族">多种族</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
                <SelectItem value="不愿透露">不愿透露</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 语言 */}
          <div>
            <Label htmlFor="languages" className="text-base font-medium mb-2 block">
              语言
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="languages"
                type="text"
                className="h-12 text-base pl-10"
                placeholder="搜索您的语言"
              />
            </div>
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between mt-12">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="px-8 py-3 text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            上一步
          </Button>
          <Button
            onClick={handleNext}
            className="px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white"
          >
            下一步
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
