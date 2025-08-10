import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MentorSquare = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={handleBackClick}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </div>
            <div className="flex items-center">
              <img 
                src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/20333cb4-3f98-418b-97b4-6084401c6291" 
                alt="Leland Logo" 
                className="h-8"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#15b078] to-[#394b41] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">导师广场</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            连接顶级导师，开启你的成功之路。在这里找到最适合你的专业导师，获得个性化的指导和支持。
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg"
              className="bg-white text-[#15b078] hover:bg-gray-100"
              onClick={() => navigate('/welcome')}
            >
              开始匹配导师
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#15b078]"
            >
              浏览所有导师
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">热门导师分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">MBA申请</h3>
              <p className="text-gray-600">顶级商学院申请指导</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">职业发展</h3>
              <p className="text-gray-600">职场规划与技能提升</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">学术研究</h3>
              <p className="text-gray-600">学术论文与研究方法</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">创业指导</h3>
              <p className="text-gray-600">创业项目与商业规划</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">推荐导师</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mentor Card 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e185d7ba-3bdc-4abe-ab42-f6ce9ff65c77" 
                    alt="Mentor" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">Sarah M.</h3>
                    <p className="text-gray-600">MBA申请专家</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="text-sm text-gray-500 ml-2">4.9 (128评价)</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  前麦肯锡咨询师，沃顿商学院MBA，专注MBA申请5年+，帮助200+学生成功申请顶级商学院。
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#15b078]">¥299/小时</span>
                  <Button 
                    className="bg-[#15b078] hover:bg-[#394b41]"
                    onClick={() => navigate('/mentor-detail')}
                  >
                    查看详情
                  </Button>
                </div>
              </div>
            </div>

            {/* Mentor Card 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/89ceadb9-64f1-4ad9-a87c-9eb6f86f7ad8" 
                    alt="Mentor" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">Michael R.</h3>
                    <p className="text-gray-600">职业发展导师</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="text-sm text-gray-500 ml-2">4.8 (95评价)</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  谷歌产品经理，斯坦福大学计算机硕士，专注科技行业职业发展，帮助150+学生获得理想offer。
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#15b078]">¥399/小时</span>
                  <Button 
                    className="bg-[#15b078] hover:bg-[#394b41]"
                    onClick={() => navigate('/mentor-detail')}
                  >
                    查看详情
                  </Button>
                </div>
              </div>
            </div>

            {/* Mentor Card 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d9eef30c-4e5f-4e8a-a753-c779448ef3c7" 
                    alt="Mentor" 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">Emily L.</h3>
                    <p className="text-gray-600">学术研究导师</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="text-sm text-gray-500 ml-2">4.9 (76评价)</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  哈佛大学博士，MIT博士后，发表论文50+篇，专注学术写作与研究设计指导。
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#15b078]">¥499/小时</span>
                  <Button 
                    className="bg-[#15b078] hover:bg-[#394b41]"
                    onClick={() => navigate('/mentor-detail')}
                  >
                    查看详情
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default MentorSquare; 