import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CoachingServices = () => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    '经济援助和奖学金',
    '编辑',
    '面试',
    '候补名单策略',
    '学校选择',
    '二次审查',
    '申请策略',
    '论文',
    '简历',
    '推荐信'
  ];

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSelectAll = () => {
    if (selectedServices.length === services.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices(services);
    }
  };

  const handleNext = () => {
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    navigate('/mentor-setup/experience');
  };

  const handlePrevious = () => {
    navigate('/mentor-setup/program-selection');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            您提供哪些教练服务？
          </h1>
          <p className="text-lg text-gray-600">
            选择所有适用的选项。{' '}
            <button
              onClick={handleSelectAll}
              className="text-green-600 hover:text-green-700 underline"
            >
              点击此处选择所有服务
            </button>
          </p>
        </div>

        {/* 服务选择网格 */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {services.map((service) => (
              <button
                key={service}
                onClick={() => handleServiceToggle(service)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  selectedServices.includes(service)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {service}
              </button>
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

export default CoachingServices;
