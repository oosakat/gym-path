import { useState } from "react";
import { X, ChevronRight, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { gymMachines, muscleGroupColors, type GymMachine } from "../data/mockData";

type MuscleFilter = "全て" | "胸" | "背中" | "肩" | "脚" | "腕" | "体幹";
const filters: MuscleFilter[] = ["全て", "胸", "背中", "肩", "脚", "腕", "体幹"];

const difficultyColor: Record<string, string> = {
  初心者: "#22C55E",
  中級者: "#EAB308",
  上級者: "#FF6B35",
};

const machineImages: Record<string, string> = {
  "chest-press": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=240&fit=crop&auto=format",
  "pec-deck": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=240&fit=crop&auto=format",
  "lat-pulldown": "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=240&fit=crop&auto=format",
  "seated-row": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=240&fit=crop&auto=format",
  "shoulder-press": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=240&fit=crop&auto=format",
  "leg-press": "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=240&fit=crop&auto=format",
  "leg-curl": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=240&fit=crop&auto=format",
  "leg-extension": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=240&fit=crop&auto=format",
  "arm-curl": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=240&fit=crop&auto=format",
  "tricep-pushdown": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=240&fit=crop&auto=format",
  "ab-crunch": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=240&fit=crop&auto=format",
  "back-extension": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=240&fit=crop&auto=format",
};

function MachineDetail({
  machine,
  onClose,
}: {
  machine: GymMachine;
  onClose: () => void;
}) {
  const colors = muscleGroupColors[machine.muscleGroup];
  const imgSrc = machineImages[machine.id] ?? "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=240&fit=crop&auto=format";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-card border-t border-border">
        {/* Image */}
        <div className="relative h-48 overflow-hidden rounded-t-3xl bg-muted">
          <img
            src={imgSrc}
            alt={machine.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(23,23,23,0.9) 0%, transparent 60%)" }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between gap-2">
              <div>
                <h2
                  className="text-2xl font-black leading-tight uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {machine.name}
                </h2>
                <span className="text-xs text-white/60">{machine.nameEn}</span>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {machine.muscleGroup}
                </span>
                <span
                  className="text-[11px] font-bold"
                  style={{ color: difficultyColor[machine.difficulty] }}
                >
                  ● {machine.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Status */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold"
            style={{
              background: machine.isAvailable ? "rgba(34,197,94,0.1)" : "rgba(255,64,64,0.1)",
              color: machine.isAvailable ? "#22C55E" : "#FF4040",
            }}
          >
            {machine.isAvailable ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            {machine.isAvailable ? "現在 空き — 使用できます" : "現在 使用中"}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3
              className="text-base font-black uppercase tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              どんなマシン？
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{machine.description}</p>
          </div>

          {/* Default sets/reps */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-muted p-3 text-center">
              <div
                className="text-2xl font-black"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#C1FF4D" }}
              >
                {machine.defaultSets}
              </div>
              <div className="text-xs text-muted-foreground font-medium">セット数</div>
            </div>
            <div className="rounded-xl bg-muted p-3 text-center">
              <div
                className="text-2xl font-black"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#C1FF4D" }}
              >
                {machine.defaultReps}
              </div>
              <div className="text-xs text-muted-foreground font-medium">1セットの回数</div>
            </div>
          </div>

          {/* How to use */}
          <div className="space-y-3">
            <h3
              className="text-base font-black uppercase tracking-wide flex items-center gap-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              <Info className="w-4 h-4" style={{ color: "#C1FF4D" }} />
              使い方ステップ
            </h3>
            <ol className="space-y-2.5">
              {machine.howToUse.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black"
                    style={{ background: "#C1FF4D", color: "#0C0C0C" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Spacer for bottom */}
          <div className="h-4" />
        </div>
      </div>
    </>
  );
}

export function Machines() {
  const [activeFilter, setActiveFilter] = useState<MuscleFilter>("全て");
  const [selectedMachine, setSelectedMachine] = useState<GymMachine | null>(null);

  const storeId = localStorage.getItem("selectedStore") ?? "anytime-bunka";
  const machines = gymMachines.filter(
    (m) => m.storeId === storeId && (activeFilter === "全て" || m.muscleGroup === activeFilter)
  );

  const availableCount = gymMachines.filter(
    (m) => m.storeId === storeId && m.isAvailable
  ).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1
          className="text-3xl font-black uppercase tracking-wide"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          MACHINES
        </h1>
        <p className="text-sm text-muted-foreground">
          タップして使い方を確認しよう ·
          <span className="font-bold" style={{ color: "#22C55E" }}>
            {" "}{availableCount}台空き
          </span>
        </p>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {filters.map((f) => {
          const isActive = activeFilter === f;
          const colors = f !== "全て" ? muscleGroupColors[f] : null;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
              style={
                isActive
                  ? {
                      background: colors ? colors.bg : "#C1FF4D",
                      color: colors ? colors.text : "#0C0C0C",
                    }
                  : {
                      background: "rgba(255,255,255,0.06)",
                      color: "#808080",
                    }
              }
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Machine grid */}
      <div className="grid grid-cols-2 gap-3">
        {machines.map((machine) => {
          const colors = muscleGroupColors[machine.muscleGroup];
          const imgSrc = machineImages[machine.id] ?? "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=240&fit=crop&auto=format";
          return (
            <button
              key={machine.id}
              onClick={() => setSelectedMachine(machine)}
              className="text-left rounded-2xl border border-border bg-card overflow-hidden hover:border-border/60 active:scale-[0.98] transition-all duration-200 group"
            >
              {/* Image */}
              <div className="relative h-28 bg-muted overflow-hidden">
                <img
                  src={imgSrc}
                  alt={machine.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(23,23,23,0.8) 0%, transparent 50%)" }} />
                {/* Availability dot */}
                <div className="absolute top-2.5 right-2.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: machine.isAvailable ? "#22C55E" : "#FF4040",
                      boxShadow: machine.isAvailable
                        ? "0 0 6px rgba(34,197,94,0.8)"
                        : "0 0 6px rgba(255,64,64,0.8)",
                    }}
                  />
                </div>
                {/* Muscle badge */}
                <div className="absolute bottom-2 left-2">
                  <span
                    className="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    {machine.muscleGroup}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 space-y-1.5">
                <div className="font-bold text-sm leading-tight text-foreground">{machine.name}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{machine.nameEn}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: difficultyColor[machine.difficulty] }}
                  >
                    ● {machine.difficulty}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {machine.defaultSets}セット × {machine.defaultReps}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {machines.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-sm">このカテゴリのマシンはありません</p>
        </div>
      )}

      {/* Machine Detail Sheet */}
      {selectedMachine && (
        <MachineDetail
          machine={selectedMachine}
          onClose={() => setSelectedMachine(null)}
        />
      )}
    </div>
  );
}
