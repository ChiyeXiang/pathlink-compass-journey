import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';

const Education = () => {
  const navigate = useNavigate();
  const [educations, setEducations] = useState([]);

  const handleAddEducation = () => {
    // 这里可以打开一个模态框来添加教育经历
    console.log('添加教育经历');
  };

  const handleNext = () => {
    navigate('/mentor-setup/work-experience');
  };

  const handlePrevious = () => {
    navigate('/mentor-setup/basic-info');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            添加您的教育经历
          </h1>
          <p className="text-lg text-gray-600">
            告诉Leland用户您在哪里接受的教育。
          </p>
        </div>

        {/* 教育经历区域 */}
        <div className="mb-12">
          {educations.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <div className="text-gray-700 mb-6">
                <h3 className="text-lg font-medium mb-2">您在哪里上学？</h3>
              </div>
              <Button
                onClick={handleAddEducation}
                variant="outline"
                className="bg-white border-gray-300 text-gray-900 hover:bg-gray-50 px-6 py-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                添加教育经历
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {educations.map((education, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  {/* 教育经历内容 */}
                </div>
              ))}
              <Button
                onClick={handleAddEducation}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                添加更多教育经历
              </Button>
            </div>
          )}
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

export default Education;
