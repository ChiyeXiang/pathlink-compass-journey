export function buildMentorEmbedText(m: {
  displayName?: string; education?: string; summary?: string;
  expertise?: string[]; tags?: string[];
}) {
  return [
    `导师：${m.displayName || ''}`,
    `教育：${m.education || ''}`,
    `简介：${m.summary || ''}`,
    `擅长：${(m.expertise || []).join('、')}`,
    `标签：${(m.tags || []).join('、')}`,
  ].join('\n');
}


export function buildStudentEmbedText(s: {
  AppDegree?: string[];
  field?: string[];
  multipleCountries?: string[];
  DreamCountrySchool?: string[];
  needs?: string[];
  targetDetails?: string;
  budgetPreference?: string[];

  // 个人资料字段（如果已收集）
  firstName?: string;
  lastName?: string;
  university?: string;
  major?: string;
  graduationYear?: string;
  gpa?: string;
  experience?: string;
  interests?: string;
  goals?: string;
}) {
  return [
    `姓名：${[s.firstName, s.lastName].filter(Boolean).join(' ')}`,
    `学校：${s.university || ''}`,
    `专业：${s.major || ''}`,
    `毕业年份：${s.graduationYear || ''}`,
    `GPA：${s.gpa || ''}`,
    `申请学位：${(s.AppDegree || []).join('、')}`,
    `意向领域：${(s.field || []).join('、')}`,
    `目标国家地区：${(s.multipleCountries || []).join('、')}`,
    `梦校：${(s.DreamCountrySchool || []).join('、')}`,
    `需求：${(s.needs || []).join('、')}`,
    `目标详情：${s.targetDetails || ''}`,
    `预算偏好：${(s.budgetPreference || []).join('、')}`,
    `实习/工作经历：${s.experience || ''}`,
    `兴趣爱好：${s.interests || ''}`,
    `职业目标：${s.goals || ''}`,
  ].join('\n');
}