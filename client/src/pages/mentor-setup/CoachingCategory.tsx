import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowLeft, ArrowRight, GraduationCap, TrendingUp, CheckSquare } from 'lucide-react';

const CoachingCategory = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    {
      id: 'school',
      title: '进入学校',
      description: '18个类别',
      icon: GraduationCap,
      color: 'text-blue-600'
    },
    {
      id: 'career',
      title: '发展职业',
      description: '118个类别',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      id: 'test',
      title: '参加考试',
      description: '29个类别',
      icon: CheckSquare,
      color: 'text-purple-600'
    }
  ];

  const handleNext = () => {
    if (selectedCategory) {
      localStorage.setItem('selectedCoachingCategory', selectedCategory);
      navigate('/mentor-setup/program-selection');
    }
  };

  const handlePrevious = () => {
    navigate('/mentor-setup/work-experience');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            让我们设置您的第一个教练类别
          </h1>
          <p className="text-lg text-gray-600">
            从下面的目标中选择一个来找到您的类别。您稍后可以添加更多类别。
          </p>
        </div>

        {/* 类别卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all relative ${
                  selectedCategory === category.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {/* 选择指示器 */}
                <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 ${
                  selectedCategory === category.id
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}>
                  {selectedCategory === category.id && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                
                <div className="text-center">
                  <div className={`mx-auto mb-4 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${category.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 反馈链接 */}
        <div className="text-center mb-12">
          <p className="text-gray-600">
            您有Leland应该支持的其他服务的想法吗？{' '}
            <a href="#" className="text-green-600 hover:text-green-700 underline">
              在此请求
            </a>
          </p>
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
            disabled={!selectedCategory}
            className="px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            下一步
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoachingCategory;
