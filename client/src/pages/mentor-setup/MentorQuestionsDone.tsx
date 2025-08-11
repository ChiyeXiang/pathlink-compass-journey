import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { CheckCircle, Clock, Home, User } from 'lucide-react';

const MentorQuestionsDone = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToMentorDashboard = () => {
    navigate('/mentor-dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 成功图标和标题 */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            档案设置完成！
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            感谢您完成导师档案设置。我们的团队将审核您的信息。
          </p>
        </div>

        {/* 下一步信息 */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <div className="flex items-start space-x-4">
            <Clock className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                接下来会发生什么？
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>• 我们的团队将在1-3个工作日内审核您的档案</p>
                <p>• 审核通过后，您将收到电子邮件通知</p>
                <p>• 然后您就可以开始接受学生预约了</p>
              </div>
            </div>
          </div>
        </div>

        {/* 联系信息 */}
        <div className="bg-blue-50 rounded-lg p-6 mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            有问题吗？
          </h3>
          <p className="text-gray-600 mb-4">
            如果您在设置过程中遇到任何问题，请随时联系我们的支持团队。
          </p>
          <a 
            href="mailto:support@leland.com" 
            className="text-blue-600 hover:text-blue-700 underline"
          >
            support@leland.com
          </a>
        </div>

        {/* 操作按钮 */}
        <div className="text-center space-y-4">
          <Button
            onClick={handleGoToMentorDashboard}
            className="px-8 py-3 text-base bg-green-600 hover:bg-green-700 text-white"
          >
            <User className="w-4 h-4 mr-2" />
            进入导师个人界面
          </Button>
          
          <div>
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="px-8 py-3 text-base"
            >
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorQuestionsDone;
