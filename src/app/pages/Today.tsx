import { useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, Circle, ChevronRight, Sparkles, Trophy, RotateCcw, Dumbbell } from "lucide-react";
import { muscleGroupColors, type WorkoutItem } from "../data/mockData";

function ProgressRing({ done, total }: { done: number; total: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const pct = total > 0 ? done / total : 0;
  return (
    <svg width="72" height="72" className="-rotate-90">
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke="#C1FF4D"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
    </svg>
  );
}

export function Today() {
  const navigate = useNavigate();

  const [items, setItems] = useState<WorkoutItem[]>(() => {
    try {
      const raw = localStorage.getItem("todayWorkout");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const doneCount = items.filter((i) => i.done).length;
  const allDone = doneCount === items.length && items.length > 0;

  function toggleDone(index: number) {
    setItems((prev) => {
      const next = prev.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item
      );
      localStorage.setItem("todayWorkout", JSON.stringify(next));
      return next;
    });
  }

  function handleReset() {
    const reset = items.map((i) => ({ ...i, done: false }));
    setItems(reset);
    localStorage.setItem("todayWorkout", JSON.stringify(reset));
    setActiveIndex(null);
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <h1
          className="text-3xl font-black uppercase tracking-wide"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          TODAY"S TRAINING
        </h1>
        <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{ background: "rgba(193,255,77,0.08)" }}
          >
            <Dumbbell className="w-10 h-10" style={{ color: "#C1FF4D" }} />
          </div>
          <div className="space-y-2">
            <h2
              className="text-2xl font-black uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              メニューがありません
            </h2>
            <p className="text-sm text-muted-foreground max-w-[240px]">
              AIメニューページであなた専用のトレーニングメニューを生成してください
            </p>
          </div>
          <button
            onClick={() => navigate("/menu")}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-[0.98]"
            style={{ background: "#C1FF4D", color: "#0C0C0C" }}
          >
            <Sparkles className="w-4 h-4" />
            AIメニューを作る
          </button>
        </div>
      </div>
    );
  }

  if (allDone) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <h1
          className="text-3xl font-black uppercase tracking-wide"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          TODAY"S TRAINING
        </h1>
        <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: "rgba(193,255,77,0.12)" }}
            >
              <Trophy className="w-12 h-12" style={{ color: "#C1FF4D" }} />
            </div>
            <div
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-lg"
              style={{ background: "#C1FF4D" }}
            >
              🎉
            </div>
          </div>
          <div className="space-y-2">
            <h2
              className="text-3xl font-black uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#C1FF4D" }}
            >
              COMPLETE!
            </h2>
            <p className="text-base font-bold text-foreground">
              {items.length}種目すべてクリア！
            </p>
            <p className="text-sm text-muted-foreground">
              今日もよく頑張りました。しっかり休んで次回に備えましょう。
            </p>
          </div>
          <div
            className="w-full px-6 py-4 rounded-2xl space-y-3"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">本日の実績</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "種目数", value: items.length.toString() },
                {
                  label: "総セット",
                  value: items.reduce((a, i) => a + i.sets, 0).toString(),
                },
                { label: "部位数", value: new Set(items.map((i) => i.muscleGroup)).size.toString() },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div
                    className="text-2xl font-black"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#C1FF4D" }}
                  >
                    {value}
                  </div>
                  <div className="text-[10px] text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            もう一周する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header with progress */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1
            className="text-3xl font-black uppercase tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            TODAY"S TRAINING
          </h1>
          <p className="text-sm text-muted-foreground">
            {doneCount} / {items.length} 種目完了
          </p>
        </div>
        <div className="relative shrink-0">
          <ProgressRing done={doneCount} total={items.length} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-lg font-black"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#C1FF4D" }}
            >
              {items.length > 0 ? Math.round((doneCount / items.length) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${items.length > 0 ? (doneCount / items.length) * 100 : 0}%`,
            background: "#C1FF4D",
          }}
        />
      </div>

      {/* Workout items */}
      <div className="space-y-2.5">
        {items.map((item, i) => {
          const colors = muscleGroupColors[item.muscleGroup];
          const isExpanded = activeIndex === i;
          const isNext = !item.done && items.slice(0, i).every((x) => x.done);

          return (
            <div
              key={item.machineId}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                item.done
                  ? "opacity-50 border-border"
                  : isNext
                  ? "border-primary/40"
                  : "border-border"
              }`}
              style={{
                background: item.done
                  ? "rgba(255,255,255,0.02)"
                  : isNext
                  ? "rgba(193,255,77,0.04)"
                  : "rgba(23,23,23,1)",
              }}
            >
              <button
                className="w-full flex items-center gap-4 px-4 py-4 text-left"
                onClick={() => setActiveIndex(isExpanded ? null : i)}
              >
                {/* Check button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDone(i);
                  }}
                  className="shrink-0 transition-transform duration-150 active:scale-90"
                >
                  {item.done ? (
                    <CheckCircle2 className="w-6 h-6" style={{ color: "#C1FF4D" }} />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </button>

                {/* Order number */}
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black"
                  style={{
                    background: item.done ? "rgba(193,255,77,0.1)" : isNext ? "#C1FF4D" : "rgba(255,255,255,0.06)",
                    color: item.done ? "#C1FF4D" : isNext ? "#0C0C0C" : "#808080",
                  }}
                >
                  {i + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <div
                    className="font-bold text-sm"
                    style={{
                      color: item.done ? "#808080" : "#F0F0F0",
                      textDecoration: item.done ? "line-through" : "none",
                    }}
                  >
                    {item.machineName}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                      style={{ background: colors.bg, color: colors.text, opacity: item.done ? 0.5 : 1 }}
                    >
                      {item.muscleGroup}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.sets}セット × {item.reps}
                    </span>
                  </div>
                </div>

                {isNext && !item.done && (
                  <span
                    className="shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: "#C1FF4D", color: "#0C0C0C" }}
                  >
                    NEXT
                  </span>
                )}
                <ChevronRight
                  className={`shrink-0 w-4 h-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                />
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border/50 space-y-3 pt-3">
                  {item.note && (
                    <div
                      className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
                      style={{ background: "rgba(193,255,77,0.08)", color: "#C1FF4D" }}
                    >
                      💡 {item.note}
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "セット", value: item.sets.toString() },
                      { label: "回数", value: item.reps },
                      { label: "休憩", value: `${item.restSeconds}秒` },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-xl p-2.5 text-center"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        <div
                          className="text-lg font-black leading-none"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#C1FF4D" }}
                        >
                          {value}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>
                  {!item.done && (
                    <button
                      onClick={() => toggleDone(i)}
                      className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.98]"
                      style={{ background: "#C1FF4D", color: "#0C0C0C" }}
                    >
                      完了にする ✓
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        リセットする
      </button>
    </div>
  );
}
