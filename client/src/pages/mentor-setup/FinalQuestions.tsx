import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FinalQuestions = () => {
  const navigate = useNavigate();
  const [isProfessionalCoach, setIsProfessionalCoach] = useState(false);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);

  const specializations = [
    '第一代',
    '国际学生',
    'LGBTQ+',
    '低收入',
    '退伍军人'
  ];

  const handleSpecializationToggle = (specialization) => {
    setSelectedSpecializations(prev => 
      prev.includes(specialization)
        ? prev.filter(s => s !== specialization)
        : [...prev, specialization]
    );
  };

  const handleNext = () => {
    localStorage.setItem('finalQuestions', JSON.stringify({
      isProfessionalCoach,
      selectedSpecializations
    }));
    navigate('/mentor-setup/phone-number');
  };

  const handlePrevious = () => {
    navigate('/mentor-setup/experience');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            回答一些最终问题
          </h1>
          <p className="text-lg text-gray-600">
            在您提交档案进行审核之前，我们只需要几个细节。
          </p>
        </div>

        {/* 问题区域 */}
        <div className="space-y-8">
          {/* 专业教练问题 */}
          <div className="border-b border-gray-200 pb-8">
            <div className="text-sm text-gray-500 mb-4">可选</div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                您是专业教练吗？
              </h2>
              <p className="text-gray-600">
                如果您将教练作为主要收入来源，每周有20+小时专门用于教练工作，或者您已接受过专业培训或认证，请勾选此框。
              </p>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="professional-coach"
                  checked={isProfessionalCoach}
                  onCheckedChange={setIsProfessionalCoach}
                />
                <label
                  htmlFor="professional-coach"
                  className="text-base text-gray-900 cursor-pointer"
                >
                  我是专业教练
                </label>
              </div>
            </div>
          </div>

          {/* 专业领域问题 */}
          <div>
            <div className="text-sm text-gray-500 mb-4">可选</div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                我专门指导以下人群：
              </h2>
              <div className="flex flex-wrap gap-3">
                {specializations.map((specialization) => (
                  <button
                    key={specialization}
                    onClick={() => handleSpecializationToggle(specialization)}
                    className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                      selectedSpecializations.includes(specialization)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {specialization}
                  </button>
                ))}
              </div>
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

export default FinalQuestions;
