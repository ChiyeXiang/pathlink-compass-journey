import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Experience = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    industryYears: '',
    coachingExperience: 'just-started'
  });

  const coachingOptions = [
    {
      value: 'just-started',
      title: '刚刚开始',
      subtitle: '还没有指导过任何人'
    },
    {
      value: 'new-coach',
      title: '我是新教练',
      subtitle: '指导过1-10人'
    },
    {
      value: 'some-coaching',
      title: '我做过一些指导',
      subtitle: '指导过11-25人'
    },
    {
      value: 'experienced-coach',
      title: '我是有经验的教练',
      subtitle: '指导过26-99人'
    },
    {
      value: 'expert',
      title: '我是专家',
      subtitle: '指导过100多人'
    }
  ];

  const handleNext = () => {
    localStorage.setItem('mentorExperience', JSON.stringify(formData));
    navigate('/mentor-setup/final-questions');
  };

  const handlePrevious = () => {
    navigate('/mentor-setup/coaching-services');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            添加您的经验
          </h1>
          <p className="text-lg text-gray-600">
            告诉我们您在这个特定类别中有多少经验。
          </p>
        </div>

        {/* 行业经验 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">行业经验</h2>
          <div>
            <Label htmlFor="industryYears" className="text-base font-medium mb-2 block">
              您提供硕士课程指导多长时间了？
            </Label>
            <div className="flex items-center space-x-3">
              <Input
                id="industryYears"
                type="number"
                value={formData.industryYears}
                onChange={(e) => setFormData(prev => ({ ...prev, industryYears: e.target.value }))}
                className="w-24 h-12 text-base"
                min="0"
              />
              <span className="text-gray-600">年经验</span>
            </div>
          </div>
        </div>

        {/* 教练经验 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">教练经验</h2>
          <div>
            <Label className="text-base font-medium mb-2 block">
              在加入Leland之前，您为硕士课程指导指导过多少客户？
            </Label>
            <a href="#" className="text-green-600 hover:text-green-700 underline text-sm">
              什么算作客户？
            </a>
            
            <RadioGroup
              value={formData.coachingExperience}
              onValueChange={(value) => setFormData(prev => ({ ...prev, coachingExperience: value }))}
              className="mt-4 space-y-3"
            >
              {coachingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div className="font-medium text-gray-900">{option.title}</div>
                    <div className="text-sm text-gray-600">{option.subtitle}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between">
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

export default Experience;
