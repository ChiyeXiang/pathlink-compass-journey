import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

const PhoneNumber = () => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const countries = [
    { code: '+1', name: '美国', flag: '🇺🇸' },
    { code: '+86', name: '中国', flag: '🇨🇳' },
    { code: '+44', name: '英国', flag: '🇬🇧' },
    { code: '+81', name: '日本', flag: '🇯🇵' },
    { code: '+82', name: '韩国', flag: '🇰🇷' },
    { code: '+33', name: '法国', flag: '🇫🇷' },
    { code: '+49', name: '德国', flag: '🇩🇪' },
    { code: '+39', name: '意大利', flag: '🇮🇹' },
    { code: '+34', name: '西班牙', flag: '🇪🇸' },
    { code: '+7', name: '俄罗斯', flag: '🇷🇺' }
  ];

  const handleSendCode = () => {
    if (phoneNumber) {
      setCodeSent(true);
      // 这里可以添加发送验证码的逻辑
      console.log('发送验证码到:', countryCode + phoneNumber);
    }
  };

  const handleNext = () => {
    localStorage.setItem('phoneNumber', JSON.stringify({
      countryCode,
      phoneNumber
    }));
    navigate('/mentor-setup/mentor-questions-done');
  };

  const handlePrevious = () => {
    navigate('/mentor-setup/final-questions');
  };

  const handleSkip = () => {
    navigate('/mentor-setup/mentor-questions-done');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            添加您的电话号码
          </h1>
          <p className="text-lg text-gray-600">
            添加您的电话号码以获取即将到来的教练课程提醒。
          </p>
        </div>

        {/* 电话号码输入区域 */}
        <div className="mb-8">
          <div className="space-y-4">
            {/* 国家代码选择 */}
            <div>
              <Label className="text-base font-medium mb-2 block">
                国家代码
              </Label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center space-x-2">
                        <span>{country.flag}</span>
                        <span>{country.name} {country.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 电话号码输入 */}
            <div>
              <Label htmlFor="phoneNumber" className="text-base font-medium mb-2 block">
                电话号码
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1XXX-XXX-XXXX"
                className="h-12 text-base"
              />
            </div>
          </div>
        </div>

        {/* 发送验证码按钮 */}
        <div className="mb-8">
          <Button
            onClick={handleSendCode}
            disabled={!phoneNumber}
            className="w-full h-12 text-base bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {codeSent ? '验证码已发送' : '发送验证码'}
          </Button>
        </div>

        {/* 跳过选项 */}
        <div className="text-center mb-12">
          <button
            onClick={handleSkip}
            className="text-green-600 hover:text-green-700 underline text-base"
          >
            我稍后再做
          </button>
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

export default PhoneNumber;
