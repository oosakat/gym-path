import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import {
  type UserProfile,
  generateWorkout,
  muscleGroupColors,
  goalLabels,
} from "../data/mockData";

const goalOptions: { value: UserProfile["goal"]; label: string; emoji: string }[] = [
  { value: "muscle", label: "筋肉をつけたい", emoji: "💪" },
  { value: "diet", label: "体重を落としたい", emoji: "🔥" },
  { value: "maintain", label: "体型を維持したい", emoji: "⚖️" },
  { value: "health", label: "健康になりたい", emoji: "❤️" },
];

const levelOptions: { value: UserProfile["level"]; label: string; sub: string }[] = [
  { value: "beginner", label: "初心者", sub: "ジム歴3ヶ月未満" },
  { value: "intermediate", label: "中級者", sub: "3ヶ月〜1年" },
  { value: "advanced", label: "上級者", sub: "1年以上" },
];

const genderOptions: { value: UserProfile["gender"]; label: string }[] = [
  { value: "male", label: "男性" },
  { value: "female", label: "女性" },
  { value: "other", label: "その他" },
];

function LoadingAnimation() {
  const steps = [
    "プロフィールを分析中...",
    "最適なマシンを選定中...",
    "トレーニング順序を組み立て中...",
    "メニューを生成しています...",
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1 < steps.length ? s + 1 : s)), 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 rounded-full border-2 animate-spin"
          style={{ borderColor: "transparent", borderTopColor: "#C1FF4D" }}
        />
        <div className="absolute inset-2 rounded-full flex items-center justify-center bg-muted">
          <Sparkles className="w-5 h-5" style={{ color: "#C1FF4D" }} />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-bold text-foreground">{steps[step]}</p>
        <p className="text-xs text-muted-foreground">しばらくお待ちください</p>
      </div>
    </div>
  );
}

export function AIMenu() {
  const navigate = useNavigate();
  const storeId = localStorage.getItem("selectedStore") ?? "anytime-bunka";

  const savedProfile = (): UserProfile | null => {
    try {
      const raw = localStorage.getItem("userProfile");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const [profile, setProfile] = useState<Partial<UserProfile>>(
    savedProfile() ?? {}
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  function updateProfile(key: keyof UserProfile, value: string | number) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function isProfileComplete(): profile is UserProfile {
    return (
      !!profile.gender &&
      !!profile.goal &&
      !!profile.level &&
      !!profile.weight &&
      !!profile.height
    );
  }

  async function handleGenerate() {
    if (!isProfileComplete()) return;
    setIsGenerating(true);
    localStorage.setItem("userProfile", JSON.stringify(profile));

    await new Promise((r) => setTimeout(r, 2800));

    const workout = generateWorkout(profile as UserProfile, storeId);
    localStorage.setItem("todayWorkout", JSON.stringify(workout));
    setIsGenerating(false);
    setGenerated(true);
  }

  function handleReset() {
    setGenerated(false);
    localStorage.removeItem("todayWorkout");
  }

  const existingWorkout = (() => {
    try {
      const raw = localStorage.getItem("todayWorkout");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  if (isGenerating) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1
          className="text-3xl font-black uppercase tracking-wide mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          AI MENU
        </h1>
        <LoadingAnimation />
      </div>
    );
  }

  if (generated && existingWorkout) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-black uppercase tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              TODAY"S MENU
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              AIが{goalLabels[profile.goal ?? "muscle"]}向けメニューを作成しました
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            再生成
          </button>
        </div>

        {/* Workout list */}
        <div className="space-y-2.5">
          {existingWorkout.map(
            (item: ReturnType<typeof generateWorkout>[number], i: number) => {
              const colors = muscleGroupColors[item.muscleGroup];
              return (
                <div
                  key={item.machineId}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-xl border border-border bg-card"
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-black"
                    style={{ background: "rgba(193,255,77,0.12)", color: "#C1FF4D" }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{item.machineName}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                        style={{ background: colors.bg, color: colors.text }}
                      >
                        {item.muscleGroup}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.sets}セット × {item.reps}
                      </span>
                    </div>
                    {item.note && (
                      <p className="text-[11px] text-muted-foreground mt-1">{item.note}</p>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">
                    休憩 {item.restSeconds}秒
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/today")}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-[0.98]"
          style={{ background: "#C1FF4D", color: "#0C0C0C" }}
        >
          トレーニングを開始する
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1
          className="text-3xl font-black uppercase tracking-wide"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          AI MENU
        </h1>
        <p className="text-sm text-muted-foreground">
          あなたの情報を入力するとAIが最適なメニューを作ります
        </p>
      </div>

      {/* Already has a workout */}
      {existingWorkout && !generated && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{ background: "rgba(193,255,77,0.08)", color: "#C1FF4D" }}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <div className="flex-1">
            <span className="font-bold">メニューが既にあります。</span>
            <button
              onClick={() => navigate("/today")}
              className="ml-1 underline underline-offset-2"
            >
              今日のトレーニングへ →
            </button>
          </div>
        </div>
      )}

      {/* Profile form */}
      <div className="space-y-6">
        {/* Goal */}
        <div className="space-y-3">
          <label
            className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <span style={{ color: "#C1FF4D" }}>01</span> 目標
          </label>
          <div className="grid grid-cols-2 gap-2">
            {goalOptions.map((g) => (
              <button
                key={g.value}
                onClick={() => updateProfile("goal", g.value)}
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-left text-sm font-medium transition-all duration-200"
                style={{
                  borderColor: profile.goal === g.value ? "#C1FF4D" : "rgba(255,255,255,0.08)",
                  background: profile.goal === g.value ? "rgba(193,255,77,0.1)" : "rgba(255,255,255,0.02)",
                  color: profile.goal === g.value ? "#C1FF4D" : "#808080",
                }}
              >
                <span className="text-lg">{g.emoji}</span>
                <span className="text-xs font-bold leading-tight">{g.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Level */}
        <div className="space-y-3">
          <label
            className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <span style={{ color: "#C1FF4D" }}>02</span> 経験レベル
          </label>
          <div className="space-y-2">
            {levelOptions.map((l) => (
              <button
                key={l.value}
                onClick={() => updateProfile("level", l.value)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all duration-200"
                style={{
                  borderColor: profile.level === l.value ? "#C1FF4D" : "rgba(255,255,255,0.08)",
                  background: profile.level === l.value ? "rgba(193,255,77,0.1)" : "rgba(255,255,255,0.02)",
                }}
              >
                <div>
                  <div
                    className="text-sm font-bold"
                    style={{ color: profile.level === l.value ? "#C1FF4D" : "#F0F0F0" }}
                  >
                    {l.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{l.sub}</div>
                </div>
                {profile.level === l.value && (
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: "#C1FF4D" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-3">
          <label
            className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <span style={{ color: "#C1FF4D" }}>03</span> 性別
          </label>
          <div className="flex gap-2">
            {genderOptions.map((g) => (
              <button
                key={g.value}
                onClick={() => updateProfile("gender", g.value)}
                className="flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all duration-200"
                style={{
                  borderColor: profile.gender === g.value ? "#C1FF4D" : "rgba(255,255,255,0.08)",
                  background: profile.gender === g.value ? "rgba(193,255,77,0.1)" : "rgba(255,255,255,0.02)",
                  color: profile.gender === g.value ? "#C1FF4D" : "#808080",
                }}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Weight & Height */}
        <div className="space-y-3">
          <label
            className="text-sm font-black uppercase tracking-wide flex items-center gap-2"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <span style={{ color: "#C1FF4D" }}>04</span> 体格
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <span className="text-xs text-muted-foreground font-medium">体重 (kg)</span>
              <input
                type="number"
                placeholder="65"
                value={profile.weight ?? ""}
                onChange={(e) => updateProfile("weight", Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-foreground text-sm font-bold placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-xs text-muted-foreground font-medium">身長 (cm)</span>
              <input
                type="number"
                placeholder="170"
                value={profile.height ?? ""}
                onChange={(e) => updateProfile("height", Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-foreground text-sm font-bold placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button
        disabled={!isProfileComplete()}
        onClick={handleGenerate}
        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]"
        style={{
          background: isProfileComplete() ? "#C1FF4D" : "rgba(193,255,77,0.2)",
          color: "#0C0C0C",
        }}
      >
        <Sparkles className="w-5 h-5" />
        AIにメニューを作ってもらう
      </button>

      {!isProfileComplete() && (
        <p className="text-center text-xs text-muted-foreground -mt-4">
          全ての項目を入力してください
        </p>
      )}
    </div>
  );
}
