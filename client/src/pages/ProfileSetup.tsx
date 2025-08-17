import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/ui/page-header";
import { User, Clock, Quote } from "lucide-react";

type ProfileForm = {
  name: string;
  phone: string;
  university: string;
  major: string;
  graduationYear: string; // 存字符串即可
  gpa: string;
  experience: string;
  interests: string;
  goals: string;
};

const emptyForm: ProfileForm = {
  name: "",
  phone: "",
  university: "",
  major: "",
  graduationYear: "",
  gpa: "",
  experience: "",
  interests: "",
  goals: "",
};

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 进来先拉取当前登录用户的学生资料进行预填（/api/student/profile/me）
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/student/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          // 未登录或 token 过期
          navigate("/login");
          return;
        }

        if (!res.ok) {
          // 拉取失败也允许继续填写
          console.warn("加载学生资料失败：", await res.text());
          setLoading(false);
          return;
        }

        const student = await res.json(); // 可能是 null
        if (student) {
          // 只把 profile 的字段安全回填（后端 Student 模型里新增的这组字段）
          setFormData({
            name: student.name ?? "",
            phone: student.phone ?? "",
            university: student.university ?? "",
            major: student.major ?? "",
            graduationYear: student.graduationYear ?? "",
            gpa: student.gpa ?? "",
            experience: student.experience ?? "",
            interests: student.interests ?? "",
            goals: student.goals ?? "",
          });
        }
      } catch (e) {
        console.error("加载学生资料异常：", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/student/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 后端中间件读 userId
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "保存失败");
      }

      // 保存成功：你可以跳到任务页/主页/个人中心等
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      alert("保存失败，请稍后重试");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <PageHeader showHomeButton={true} showProfileButtons={false} />
        <div className="container max-w-4xl mx-auto px-4 py-10">加载中…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader showHomeButton={true} showProfileButtons={false} />
      
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧：个人信息表单 */}
          <div className="flex-1">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">你的个人档案</h1>
              <p className="text-muted-foreground mb-6">
                填写以下表格，让导师更好地了解你！
              </p>
            </div>

            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="text-xl">基本信息</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">姓名</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="请输入你的姓名"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* <div>
                      <Label htmlFor="email">邮箱</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="请输入你的邮箱"
                        required
                      />
                    </div> */}
                    <div>
                      <Label htmlFor="phone">电话</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="请输入你的电话"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="university">学校</Label>
                      <Input
                        id="university"
                        value={formData.university}
                        onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                        placeholder="请输入你的学校"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="major">专业</Label>
                      <Input
                        id="major"
                        value={formData.major}
                        onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                        placeholder="请输入你的专业"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="graduationYear">毕业年份</Label>
                      <Select value={formData.graduationYear} onValueChange={(value) => setFormData(prev => ({ ...prev, graduationYear: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择毕业年份" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="gpa">GPA</Label>
                      <Input
                        id="gpa"
                        value={formData.gpa}
                        onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                        placeholder="请输入你的GPA"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience">实习/工作经验</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      placeholder="请描述你的实习或工作经验"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="interests">兴趣爱好</Label>
                    <Textarea
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                      placeholder="请描述你的兴趣爱好"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="goals">职业目标</Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                      placeholder="请描述你的职业目标"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button type="submit" className="rounded-xl px-8 py-3 text-lg">
                      保存
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：用户评价 */}
          <div className="w-full lg:w-80">
            <div className="sticky top-8">
              <Card className="shadow-soft border-0">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <Quote className="w-8 h-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "与来自我通常圈子之外的人建立关系，了解他们的路径以及他们如何为职业生涯做准备，这既鼓舞人心又充满动力。额外赚点钱也从来不是坏事。"
                    </p>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-foreground">S</span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">Sam A.</p>
                        <p className="text-xs text-muted-foreground">前贝恩咨询顾问</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup; 