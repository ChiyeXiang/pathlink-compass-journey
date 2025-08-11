import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Star, Clock, Users } from 'lucide-react';

interface MentorProfileCardProps {
  profile: {
    title: string;
    expertise: string;
    education: string;
    summary: string;
    serviceTypes: string[];
    serviceStyles: string[];
    specialAdvantages: string[];
    avatar?: string;
  };
  stats?: {
    rating?: number;
    students?: number;
    experience?: number;
  };
}

const MentorProfileCard = ({ profile, stats }: MentorProfileCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>
              <User className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl">{profile.title}</CardTitle>
            <p className="text-gray-600 mt-1">{profile.expertise}</p>
            <p className="text-sm text-gray-500 mt-1">{profile.education}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 个人概括 */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">个人概括</h3>
          <p className="text-gray-600">{profile.summary}</p>
        </div>

        {/* 统计数据 */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
            {stats.rating && (
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-semibold">{stats.rating}</span>
                </div>
                <p className="text-sm text-gray-500">评分</p>
              </div>
            )}
            {stats.students && (
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="font-semibold">{stats.students}+</span>
                </div>
                <p className="text-sm text-gray-500">学生</p>
              </div>
            )}
            {stats.experience && (
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="w-4 h-4 text-green-500 mr-1" />
                  <span className="font-semibold">{stats.experience}年</span>
                </div>
                <p className="text-sm text-gray-500">经验</p>
              </div>
            )}
          </div>
        )}

        {/* 标签展示 */}
        <div className="space-y-4">
          {profile.serviceTypes.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">擅长服务类型</h3>
              <div className="flex flex-wrap gap-2">
                {profile.serviceTypes.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {profile.serviceStyles.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">服务风格</h3>
              <div className="flex flex-wrap gap-2">
                {profile.serviceStyles.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {profile.specialAdvantages.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">特殊优势</h3>
              <div className="flex flex-wrap gap-2">
                {profile.specialAdvantages.map((tag) => (
                  <Badge key={tag} variant="default" className="bg-green-600 hover:bg-green-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorProfileCard;
