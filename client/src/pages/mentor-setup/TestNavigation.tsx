import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

const TestNavigation = () => {
  const navigate = useNavigate();

  const pages = [
    { path: '/mentor-setup', name: '开始页面' },
    { path: '/mentor-setup/basic-info', name: '基本信息' },
    { path: '/mentor-setup/education', name: '教育经历' },
    { path: '/mentor-setup/work-experience', name: '工作经历' },
    { path: '/mentor-setup/coaching-category', name: '教练类别' },
    { path: '/mentor-setup/program-selection', name: '项目选择' },
    { path: '/mentor-setup/coaching-services', name: '教练服务' },
    { path: '/mentor-setup/experience', name: '经验' },
    { path: '/mentor-setup/final-questions', name: '最终问题' },
    { path: '/mentor-setup/phone-number', name: '电话号码' },
    { path: '/mentor-setup/mentor-questions-done', name: '档案完成' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Mentor Setup 页面测试
          </h1>
          <p className="text-lg text-gray-600">
            点击下面的按钮来测试各个页面
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pages.map((page) => (
            <Button
              key={page.path}
              onClick={() => navigate(page.path)}
              variant="outline"
              className="h-16 text-base"
            >
              {page.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestNavigation;
