import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DateAvailabilityPicker, { DateAvailability } from "@/components/DateAvailabilityPicker";
import { ALL_TAGS } from "../../../shared/constants/tags"; 

const MentorProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 表单
  const [displayName, setDisplayName] = useState("");
  const [education, setEducation] = useState("");
  const [summary, setSummary] = useState("");
  const [expertiseText, setExpertiseText] = useState(""); // 用逗号分隔
  const [tags, setTags] = useState<string[]>([]);
  const [availability, setAvailability] = useState<DateAvailability[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }

    const init = async () => {
      try {
        // 当前用户
        const me = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!me.ok) throw new Error(await me.text());
        const userData = await me.json();
        setUser(userData);

        // 预取 Mentor 资料（如已存在）
        const mp = await fetch(`/api/mentor/profile/${userData.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (mp.ok) {
          const data = await mp.json();
          setDisplayName(data?.displayName || "");
          setEducation(data?.education || "");
          setSummary(data?.summary || "");
          setExpertiseText(Array.isArray(data?.expertise) ? data.expertise.join(",") : "");
          setTags(Array.isArray(data?.tags) ? data.tags : []);
          setAvailability(Array.isArray(data?.availability) ? data.availability : []);
        }
      } catch (e) {
        console.error("初始化失败：", e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [navigate]);

  const toggleTag = (t: string) => {
    setTags((prev) => {
      let next = prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t];
      if (next.length > 3) next = next.slice(0, 3); // 最多 3 个
      return next;
    });
  };

  const onSubmit = async () => {
    if (!user?.userId) return;
    if (tags.length !== 3) {
      alert("请从标签里选择正好 3 个");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }

    setSaving(true);
    try {
      const res = await fetch("/api/mentor/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.userId,
          payload: {
            displayName,
            education,
            summary,
            expertise: expertiseText
              .split(",")
              .map(s => s.trim())
              .filter(Boolean),
            tags,
            availability
          },
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt);
      }
      alert("导师资料已保存！");
      navigate("/tasks");
    } catch (e) {
      console.error(e);
      alert("保存失败，请稍后重试");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-10">加载中...</div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="shadow-soft border-0">
        <CardHeader>
          <CardTitle className="text-xl">导师资料填写</CardTitle>
          <p className="text-sm text-muted-foreground">
            你的账号ID：{user?.userId}（保存后会更新/创建该账号的导师资料）
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground">称呼</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="如：李老师"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">学历/背景</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="如：LSE 金融学 MSc"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">一句话概括</label>
            <input
              className="w-full border rounded-md px-3 py-2"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="如：专注商科申请5年+，帮助120+学生成功申请"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">擅长方向（用逗号分隔）</label>
            <input
              className="w-full border rounded-md px-3 py-2"
              value={expertiseText}
              onChange={(e) => setExpertiseText(e.target.value)}
              placeholder="如：商科, 金融, 市场"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">标签（选择 3 个）</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {ALL_TAGS.map((t) => {
                const active = tags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={`text-xs px-2 py-1 rounded border ${active
                        ? "bg-primary text-primary-foreground border-transparent"
                        : "border-border"
                      }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              已选：{tags.join("、") || "0 个"}
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
                可约时间（先选日期，再在时间格子里点选）
            </label>
            <DateAvailabilityPicker
                value={availability}
                onChange={setAvailability}
                startHour={8}
                endHour={22}
                stepMinutes={30}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={onSubmit} disabled={saving}>
              {saving ? "保存中…" : "保存"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/tasks")}>
              取消
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorProfile;
