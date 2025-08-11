import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ProgramSelection = () => {
  const navigate = useNavigate();
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  const programs = [
    '公共学位',
    '教育',
    '商业',
    '工程',
    '人文',
    '自然科学',
    '数据科学',
    '环境科学'
  ];

  const handleProgramToggle = (program) => {
    setSelectedPrograms(prev => 
      prev.includes(program)
        ? prev.filter(p => p !== program)
        : [...prev, program]
    );
  };

  const handleNext = () => {
    localStorage.setItem('selectedPrograms', JSON.stringify(selectedPrograms));
    navigate('/mentor-setup/coaching-services');
  };

  const handlePrevious = () => {
    navigate('/mentor-setup/coaching-category');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            选择您有经验指导的硕士课程项目
          </h1>
          <p className="text-lg text-gray-600">
            这有助于我们向更有可能购买您指导服务的用户展示您的个人资料。
          </p>
        </div>

        {/* 项目选择列表 */}
        <div className="mb-12">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {programs.map((program, index) => (
              <div
                key={program}
                className={`flex items-center p-4 ${
                  index !== programs.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <Checkbox
                  id={program}
                  checked={selectedPrograms.includes(program)}
                  onCheckedChange={() => handleProgramToggle(program)}
                  className="mr-3"
                />
                <label
                  htmlFor={program}
                  className="text-base text-gray-900 cursor-pointer flex-1"
                >
                  {program}
                </label>
              </div>
            ))}
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

export default ProgramSelection;
