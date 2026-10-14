import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MapPin, Clock, Users, ChevronRight, CheckCircle2, Zap, Dumbbell, Sparkles, ClipboardList, TrendingUp, AlertCircle } from "lucide-react";
import { gymStores, crowdLabels, crowdColors, type GymStore } from "../data/mockData";

const quickActions = [
  { to: "/machines", icon: Dumbbell, label: "マシン一覧", desc: "使い方を確認" },
  { to: "/menu", icon: Sparkles, label: "AIメニュー生成", desc: "今日のメニューを作る" },
  { to: "/today", icon: ClipboardList, label: "今日のトレーニング", desc: "開始する" },
];

export function Home() {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState<string>(() =>
    localStorage.getItem("selectedStore") ?? ""
  );

  const store = gymStores.find((s) => s.id === selectedStore);

  function handleSelectStore(s: GymStore) {
    if (!s.isActive) return;
    setSelectedStore(s.id);
    localStorage.setItem("selectedStore", s.id);
  }

  const hasWorkout = !!localStorage.getItem("todayWorkout");

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      {/* Hero */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase"
            style={{ background: "rgba(193,255,77,0.12)", color: "#C1FF4D" }}
          >
            <Zap className="w-3 h-3 fill-current" />
            GYM NAVI
          </div>
        </div>
        <h1
          className="text-4xl font-black leading-none tracking-tight uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          ジムで
          <br />
          <span style={{ color: "#C1FF4D" }}>迷わない。</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          初心者でも今日から自信を持ってトレーニングできる
        </p>
      </div>

      {/* Selected store banner */}
      {store && (
        <div
          className="rounded-2xl p-4 border"
          style={{ background: "rgba(193,255,77,0.06)", borderColor: "rgba(193,255,77,0.2)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#C1FF4D" }} />
                <span className="text-xs font-medium" style={{ color: "#C1FF4D" }}>
                  利用店舗
                </span>
              </div>
              <p className="font-bold text-sm text-foreground">{store.name}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {store.hours}
                </span>
                <span className="flex items-center gap-1">
                  <Dumbbell className="w-3 h-3" />
                  {store.machineCount}台
                </span>
                <span
                  className="font-bold"
                  style={{ color: crowdColors[store.crowdLevel] }}
                >
                  現在 {crowdLabels[store.crowdLevel]}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedStore("");
                localStorage.removeItem("selectedStore");
              }}
              className="text-xs text-muted-foreground underline underline-offset-2 shrink-0 hover:text-foreground transition-colors"
            >
              変更
            </button>
          </div>
        </div>
      )}

      {/* Quick actions - only if store selected */}
      {store && (
        <div className="space-y-3">
          <h2
            className="text-xl font-black uppercase tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            QUICK START
          </h2>
          <div className="space-y-2">
            {quickActions.map(({ to, icon: Icon, label, desc }) => (
              <button
                key={to}
                onClick={() => navigate(to)}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-card/80 transition-all duration-200 group text-left"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105"
                  style={{ background: "rgba(193,255,77,0.1)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#C1FF4D" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-foreground">{label}</div>
                  <div className="text-xs text-muted-foreground">{desc}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
              </button>
            ))}
          </div>

          {hasWorkout && (
            <div
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
              style={{ background: "rgba(193,255,77,0.08)", color: "#C1FF4D" }}
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span className="font-medium">今日のメニューが準備されています！</span>
            </div>
          )}
        </div>
      )}

      {/* Store selection */}
      <div className="space-y-3">
        <h2
          className="text-xl font-black uppercase tracking-wide"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {store ? "STORE" : "STORE を選ぶ"}
        </h2>
        {!store && (
          <p className="text-sm text-muted-foreground">
            利用するジムを選ぶと、そのお店のマシンやメニューが表示されます
          </p>
        )}
        <div className="space-y-2.5">
          {gymStores.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectStore(s)}
              disabled={!s.isActive}
              className={`w-full text-left rounded-2xl border transition-all duration-200 overflow-hidden ${
                !s.isActive
                  ? "opacity-40 cursor-not-allowed"
                  : selectedStore === s.id
                  ? "border-primary/50 bg-card"
                  : "border-border bg-card hover:border-border/60 hover:bg-card/60 active:scale-[0.99]"
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {selectedStore === s.id && (
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#C1FF4D" }} />
                      )}
                      <span className="font-bold text-sm text-foreground truncate">{s.name}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {s.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {s.hours}
                      </span>
                      <span className="flex items-center gap-1">
                        <Dumbbell className="w-3 h-3" />
                        マシン {s.machineCount}台
                      </span>
                    </div>
                    {s.isActive && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: crowdColors[s.crowdLevel] }}
                        />
                        <span
                          className="text-xs font-bold"
                          style={{ color: crowdColors[s.crowdLevel] }}
                        >
                          現在 {crowdLabels[s.crowdLevel]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {!s.isActive ? (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(255,255,255,0.06)", color: "#808080" }}
                      >
                        準備中
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
              {selectedStore === s.id && (
                <div
                  className="h-0.5 w-full"
                  style={{ background: "linear-gradient(90deg, #C1FF4D, transparent)" }}
                />
              )}
            </button>
          ))}
        </div>

        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl text-xs text-muted-foreground"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            現在は文化会館前店のみ対応しています。近日中に他店舗も追加予定です。
          </span>
        </div>
      </div>
    </div>
  );
}
