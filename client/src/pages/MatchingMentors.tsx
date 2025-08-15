import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, Users, Target, CheckCircle } from 'lucide-react';

const MatchingMentors: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      title: "分析您的需求",
      description: "正在分析您的背景、目标和偏好",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "筛选合适导师",
      description: "从导师库中筛选最匹配的专家",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "生成推荐路径",
      description: "为您定制专属的申请路径",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  useEffect(() => {
    // 模拟匹配过程 - 在2.5秒内完成
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          // 匹配完成后，延迟0.5秒跳转到mentor-chain
          setTimeout(() => {
            console.log('MatchingMentors: 匹配完成，准备跳转到 /mentor-chain');
            console.log('MatchingMentors: 当前登录状态:', isAuthenticated);
            try {
              // 跳转到mentor-chain页面
              console.log('MatchingMentors: 跳转到 /mentor-chain');
              window.location.href = '/mentor-chain';
              console.log('MatchingMentors: 跳转命令已执行');
            } catch (error) {
              console.error('MatchingMentors: 跳转失败:', error);
            }
          }, 500);
          return 100;
        }
        return prev + 4; // 加快进度
      });
    }, 100);

    // 更新当前步骤 - 每0.8秒更新一次
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PageHeader showHomeButton={true} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* 标题区域 */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Loader2 className={`w-10 h-10 text-white ${!isComplete ? 'animate-spin' : ''}`} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {isComplete ? '匹配完成！' : '正在为您匹配最合适的导师'}
            </h1>
            <p className="text-lg text-gray-600">
              {isComplete 
                ? '匹配完成！即将跳转到推荐路径...' 
                : '请稍候，我们正在分析您的需求并筛选最匹配的导师'
              }
            </p>
          </div>

          {/* 进度条 */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">匹配进度</span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* 步骤指示器 */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <Card key={index} className={`transition-all duration-500 ${
                index <= currentStep ? 'bg-white shadow-md' : 'bg-gray-50'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index < currentStep 
                        ? 'bg-green-500 text-white' 
                        : index === currentStep 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-300 text-gray-500'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${
                        index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    {index === currentStep && !isComplete && (
                      <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 完成后的提示 */}
          {isComplete && (
            <div className="text-center mt-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-green-800 font-medium">匹配完成！</p>
                <p className="text-green-600 text-sm">即将跳转到推荐路径...</p>
              </div>
              <Button 
                onClick={() => {
                  console.log('MatchingMentors: 手动点击跳转按钮');
                  window.location.href = '/mentor-chain';
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                立即查看推荐路径
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchingMentors;
