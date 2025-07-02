import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Upload } from "lucide-react";

interface FormData {
  countries: string[];
  field: string;
  hasTarget: string;
  targetDetails: string;
  helpNeeded: string[];
}

const Welcome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    countries: [],
    field: "",
    hasTarget: "",
    targetDetails: "",
    helpNeeded: [],
  });

  const countries = [
    { id: "us", label: "美国", flag: "🇺🇸" },
    { id: "uk", label: "英国", flag: "🇬🇧" },
    { id: "canada", label: "加拿大", flag: "🇨🇦" },
    { id: "europe", label: "欧洲", flag: "🇪🇺" },
    { id: "singapore", label: "新加坡", flag: "🇸🇬" },
    { id: "australia", label: "澳洲", flag: "🇦🇺" },
  ];

  const fields = [
    { id: "business", label: "商科" },
    { id: "engineering", label: "理工科" },
    { id: "social", label: "社会科学" },
    { id: "arts", label: "人文艺术" },
    { id: "medicine", label: "医学" },
    { id: "law", label: "法学" },
  ];

  const helpOptions = [
    { id: "school-selection", label: "选校建议" },
    { id: "essay-writing", label: "文书写作" },
    { id: "recommendation", label: "推荐信" },
    { id: "interview", label: "面试辅导" },
    { id: "application", label: "网申检查" },
    { id: "scholarship", label: "奖学金申请" },
  ];

  const handleCountryChange = (countryId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      countries: checked 
        ? [...prev.countries, countryId]
        : prev.countries.filter(id => id !== countryId)
    }));
  };

  const handleHelpChange = (helpId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      helpNeeded: checked 
        ? [...prev.helpNeeded, helpId]
        : prev.helpNeeded.filter(id => id !== helpId)
    }));
  };

  const handleSubmit = () => {
    // Store form data in localStorage for demo purposes
    localStorage.setItem('applicationData', JSON.stringify(formData));
    navigate('/recommendations');
  };

  const isFormValid = formData.countries.length > 0 && formData.field && formData.hasTarget && formData.helpNeeded.length > 0;

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">P+</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">PathLink Apply+</h1>
          <p className="text-muted-foreground">智能留学申请助手</p>
        </div>

        {/* Main Question */}
        <Card className="mb-8 shadow-soft border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-foreground">你想申请什么项目？</CardTitle>
            <p className="text-muted-foreground">回答几个简单问题，为你匹配最合适的申请路径</p>
          </CardHeader>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {/* Question 1: Countries */}
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-lg">想申请的国家或地区</CardTitle>
              <p className="text-sm text-muted-foreground">可多选</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {countries.map((country) => (
                  <div key={country.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <Checkbox
                      id={country.id}
                      checked={formData.countries.includes(country.id)}
                      onCheckedChange={(checked) => handleCountryChange(country.id, !!checked)}
                    />
                    <Label htmlFor={country.id} className="flex items-center space-x-2 cursor-pointer">
                      <span className="text-lg">{country.flag}</span>
                      <span>{country.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Question 2: Field */}
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-lg">意向学科方向</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={formData.field} onValueChange={(value) => setFormData(prev => ({ ...prev, field: value }))}>
                <div className="grid grid-cols-2 gap-3">
                  {fields.map((field) => (
                    <div key={field.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <RadioGroupItem value={field.id} id={field.id} />
                      <Label htmlFor={field.id} className="cursor-pointer">{field.label}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Question 3: Target */}
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-lg">是否已有目标项目</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={formData.hasTarget} onValueChange={(value) => setFormData(prev => ({ ...prev, hasTarget: value }))}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="target-yes" />
                  <Label htmlFor="target-yes">是，已有明确目标</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="partial" id="target-partial" />
                  <Label htmlFor="target-partial">有一些想法，需要确认</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="target-no" />
                  <Label htmlFor="target-no">完全没有头绪</Label>
                </div>
              </RadioGroup>

              {formData.hasTarget === "yes" && (
                <div className="space-y-3 pt-4 border-t">
                  <Label>项目详情（可上传截图或填写链接）</Label>
                  <Textarea
                    placeholder="请描述你的目标项目，如学校名称、专业等..."
                    value={formData.targetDetails}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetDetails: e.target.value }))}
                  />
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    上传截图
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Question 4: Help Needed */}
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-lg">目前最需要帮助的部分</CardTitle>
              <p className="text-sm text-muted-foreground">可多选</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {helpOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <Checkbox
                      id={option.id}
                      checked={formData.helpNeeded.includes(option.id)}
                      onCheckedChange={(checked) => handleHelpChange(option.id, !!checked)}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <Button 
            className="w-full h-14 text-lg"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            开始匹配申请路径
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;