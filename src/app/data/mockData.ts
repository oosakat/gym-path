export interface GymStore {
  id: string;
  name: string;
  shortName: string;
  location: string;
  address: string;
  hours: string;
  machineCount: number;
  crowdLevel: 0 | 1 | 2;
  isActive: boolean;
}

export interface GymMachine {
  id: string;
  name: string;
  nameEn: string;
  muscleGroup: "胸" | "背中" | "肩" | "脚" | "腕" | "体幹";
  difficulty: "初心者" | "中級者" | "上級者";
  description: string;
  howToUse: string[];
  defaultSets: number;
  defaultReps: string;
  imageId: string;
  isAvailable: boolean;
  storeId: string;
}

export interface UserProfile {
  weight: number;
  height: number;
  gender: "male" | "female" | "other";
  goal: "muscle" | "diet" | "maintain" | "health";
  level: "beginner" | "intermediate" | "advanced";
  name: string;
}

export interface WorkoutItem {
  machineId: string;
  machineName: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  restSeconds: number;
  note: string;
  done: boolean;
}

export const gymStores: GymStore[] = [
  {
    id: "anytime-bunka",
    name: "エニタイムフィットネス 文化会館前店",
    shortName: "文化会館前店",
    location: "東京都",
    address: "東京都千代田区外神田6丁目",
    hours: "24時間営業",
    machineCount: 24,
    crowdLevel: 0,
    isActive: true,
  },
  {
    id: "anytime-shinjuku",
    name: "エニタイムフィットネス 新宿店",
    shortName: "新宿店",
    location: "東京都",
    address: "東京都新宿区西新宿1丁目",
    hours: "24時間営業",
    machineCount: 35,
    crowdLevel: 2,
    isActive: false,
  },
  {
    id: "anytime-shibuya",
    name: "エニタイムフィットネス 渋谷店",
    shortName: "渋谷店",
    location: "東京都",
    address: "東京都渋谷区道玄坂1丁目",
    hours: "24時間営業",
    machineCount: 30,
    crowdLevel: 1,
    isActive: false,
  },
];

export const gymMachines: GymMachine[] = [
  {
    id: "chest-press",
    name: "チェストプレス",
    nameEn: "Chest Press",
    muscleGroup: "胸",
    difficulty: "初心者",
    description: "大胸筋を中心に鍛える代表的なマシン。シートに座り、グリップを前方に押し出すだけ。ベンチプレスより安定していて、初心者でも安全に使えます。胸の厚みを作るのに最適です。",
    howToUse: [
      "シートの高さを調整し、グリップが胸の高さになるように設定する",
      "背中をシートにしっかりつけ、足を床にしっかりつける",
      "グリップを握り、息を吐きながら前方にゆっくり押し出す",
      "肘が完全に伸びる手前で止め、ゆっくり元の位置に戻す",
      "呼吸を止めず、押すときに「フー」と息を吐くのがポイント",
    ],
    defaultSets: 3,
    defaultReps: "10〜12回",
    imageId: "photo-1534438327276-14e5300c3a48",
    isAvailable: true,
    storeId: "anytime-bunka",
  },
  {
    id: "pec-deck",
    name: "ペックデッキフライ",
    nameEn: "Pec Deck Fly",
    muscleGroup: "胸",
    difficulty: "初心者",
    description: "大胸筋の内側を集中的に鍛えられるマシン。腕を弧を描くように動かして胸筋を収縮させます。胸の谷間（内側のライン）を作るのに効果的です。",
    howToUse: [
      "肘パッドの高さを胸と同じ高さに調整する",
      "背中をシートにつけ、肘をパッドにしっかり乗せる",
      "息を吐きながら両腕を中央に向けてゆっくり閉じる",
      "胸がギュッと収縮する感覚を確かめながらゆっくり戻す",
    ],
    defaultSets: 3,
    defaultReps: "12〜15回",
    imageId: "photo-1517836357463-d25dfeac3438",
    isAvailable: true,
    storeId: "anytime-bunka",
  },
  {
    id: "lat-pulldown",
    name: "ラットプルダウン",
    nameEn: "Lat Pulldown",
    muscleGroup: "背中",
    difficulty: "初心者",
    description: "広背筋（背中の広い筋肉）を鍛える代表的なマシン。バーを引き下げる動作で、逆三角形の引き締まった背中を作ります。姿勢改善にも非常に効果的です。",
    howToUse: [
      "太ももパッドで脚を固定し、バーを肩幅より少し広めに握る",
      "上体を少し後ろに傾け、胸をしっかり張る",
      "息を吐きながらバーを鎖骨の前まで引き下げる",
      "背中の筋肉が収縮した感覚を確認し、ゆっくり元に戻す",
      "腕の力ではなく、脇を締める意識で引くのがポイント",
    ],
    defaultSets: 3,
    defaultReps: "10〜12回",
    imageId: "photo-1576678927484-cc907957088c",
    isAvailable: true,
    storeId: "anytime-bunka",
  },
  {
    id: "seated-row",
    name: "シーテッドロウ",
    nameEn: "Seated Row",
    muscleGroup: "背中",
    difficulty: "初心者",
    description: "広背筋と僧帽筋（肩甲骨周り）を同時に鍛えられるマシン。引く動作で背中全体を刺激し、猫背改善にも効果があります。",
    howToUse: [
      "胸パッドに胸を当て、グリップを肩幅で握る",
      "背中をまっすぐにし、腕を伸ばした状態からスタート",
      "肘を後ろに引きながら、肩甲骨を中央に寄せる",
      "最大収縮位置で1秒キープし、ゆっくり戻す",
    ],
    defaultSets: 3,
    defaultReps: "10〜12回",
    imageId: "photo-1526506118085-60ce8714f8c5",
    isAvailable: false,
    storeId: "anytime-bunka",
  },
  {
    id: "shoulder-press",
    name: "ショルダープレス",
    nameEn: "Shoulder Press",
    muscleGroup: "肩",
    difficulty: "初心者",
    description: "三角筋（肩の筋肉）を鍛えるマシン。肩の丸みと立体感を作り、逆三角形のシルエット形成に貢献します。首・肩こり改善にも効果的です。",
    howToUse: [
      "シートを調整し、グリップが耳の高さになるよう設定する",
      "背中をシートにつけ、グリップをしっかり握る",
      "息を吐きながら真上にゆっくりプッシュする",
      "肘が完全に伸びる直前で止め、ゆっくり戻す",
    ],
    defaultSets: 3,
    defaultReps: "10〜12回",
    imageId: "photo-1571019613454-1cb2f99b2d8b",
    isAvailable: true,
    storeId: "anytime-bunka",
  },
  {
    id: "leg-press",
    name: "レッグプレス",
    nameEn: "Leg Press",
    muscleGroup: "脚",
    difficulty: "初心者",
    description: "大腿四頭筋（もも前）、ハムストリングス（もも裏）、臀筋（お尻）を一度に鍛える最強の脚トレマシン。高重量を扱えるので代謝アップ効果も高いです。",
    howToUse: [
      "シートを調整し、膝が90度になる位置にプレートを置く",
      "足を肩幅に開いてプレートに乗せる",
      "安全バーを解除し、息を吐きながらプレートを押し上げる",
      "膝が完全に伸びる直前で止め、ゆっくりと膝を曲げて戻す",
      "終わったら必ず安全バーをかけること",
    ],
    defaultSets: 4,
    defaultReps: "10〜15回",
    imageId: "photo-1534258936925-c58bed479fcb",
    isAvailable: true,
    storeId: "anytime-bunka",
  },
  {
    id: "leg-curl",
    name: "レッグカール",
    nameEn: "Leg Curl",
    muscleGroup: "脚",
    difficulty: "初心者",
    description: "ハムストリングス（もも裏）専用のマシン。脚を曲げる動作でもも裏を集中的に鍛え、引き締まった脚のラインを作ります。",
    howToUse: [
      "うつ伏せになり、かかとをパッドの下にセットする",
      "骨盤をパッドにしっかり固定する",
      "息を吐きながらかかとでパッドを蹴り上げる",
      "最大収縮まで曲げたら1秒キープし、ゆっくり戻す",
    ],
    defaultSets: 3,
    defaultReps: "12〜15回",
    imageId: "photo-1583454110551-21f2fa2afe61",
    isAvailable: true,
    storeId: "anytime-bunka",
  },
  {
    id: "leg-extension",
    name: "レッグエクステンション",
    nameEn: "Leg Extension",
    muscleGroup: "脚",
    difficulty: "初心者",
    description: "大腿四頭筋（もも前）専用のマシン。膝を伸ばす動作で前ももを効果的に鍛え、太ももの引き締めに最適です。",
    howToUse: [
      "シートに座り、膝裏をシートの端に合わせる",
      "パッドが足首の少し上になるように高さを調整する",
      "息を吐きながら脚をまっすぐ伸ばす",
      "完全に伸ばした状態で1秒キープし、ゆっくり戻す",
    ],
    defaultSets: 3,
    defaultReps: "12〜15回",
    imageId: "photo-1517836357463-d25dfeac3438",
    isAvailable: true,
    storeId: "anytime-bunka",
  },
  {
    id: "arm-curl",
    name: "アームカール",
    nameEn: "Arm Curl",
    muscleGroup: "腕",
    difficulty: "初心者",
    description: "上腕二頭筋（力こぶ）を鍛えるマシン。腕を曲げる動作に特化しており、見栄えのする腕を作るのに効果的です。",
    howToUse: [
      "シートに座り、肘をパッドにしっかり置く",
      "グリップを握り、腕を完全に伸ばした状態からスタート",
      "息を吐きながら肘を曲げてグリップを引き上げる",
      "最大収縮位置で少しキープし、ゆっくり戻す",
    ],
    defaultSets: 3,
    defaultReps: "12〜15回",
    imageId: "photo-1517836357463-d25dfeac3438",
    isAvailable: true,
    storeId: "anytime-bunka",
  },
  {
    id: "tricep-pushdown",
    name: "トライセプスプレスダウン",
    nameEn: "Tricep Pushdown",
    muscleGroup: "腕",
    difficulty: "初心者",
    description: "上腕三頭筋（二の腕）を鍛えるケーブルマシン。押し下げる動作で二の腕を引き締め、たるみを解消します。",
    howToUse: [
      "ケーブルマシンの前に立ち、バーを肩幅で握る",
      "肘を体側にしっかり固定し、腕を曲げた状態からスタート",
      "息を吐きながら肘を伸ばしてバーを押し下げる",
      "完全に伸ばした状態で少しキープし、ゆっくり戻す",
    ],
    defaultSets: 3,
    defaultReps: "12〜15回",
    imageId: "photo-1526506118085-60ce8714f8c5",
    isAvailable: false,
    storeId: "anytime-bunka",
  },
  {
    id: "ab-crunch",
    name: "アブドミナルクランチ",
    nameEn: "Abdominal Crunch",
    muscleGroup: "体幹",
    difficulty: "初心者",
    description: "腹直筋（シックスパック）を鍛えるマシン。上体を前に曲げる動作でお腹を収縮させます。腹筋を孤立させて効率よく鍛えられます。",
    howToUse: [
      "シートに座り、パッドを胸の前にしっかり当てる",
      "足をローラーで固定する",
      "息を吐きながらゆっくりと上体を前に倒す",
      "腹筋の収縮を感じながらゆっくりと元の位置に戻す",
    ],
    defaultSets: 3,
    defaultReps: "15〜20回",
    imageId: "photo-1571019613454-1cb2f99b2d8b",
    isAvailable: true,
    storeId: "anytime-bunka",
  },
  {
    id: "back-extension",
    name: "バックエクステンション",
    nameEn: "Back Extension",
    muscleGroup: "体幹",
    difficulty: "初心者",
    description: "脊柱起立筋（背筋）と臀筋を鍛えるマシン。腰を反る動作で背中の強化と腰痛予防に効果があります。",
    howToUse: [
      "うつ伏せになり、腰パッドが腰骨の位置に来るよう調整する",
      "足をしっかり固定し、手を胸の前で組む",
      "息を吐きながらゆっくりと上体を持ち上げる",
      "最大伸展位置で1秒キープし、ゆっくり戻す",
    ],
    defaultSets: 3,
    defaultReps: "12〜15回",
    imageId: "photo-1534438327276-14e5300c3a48",
    isAvailable: true,
    storeId: "anytime-bunka",
  },
];

export const workoutTemplates: Record<string, Record<string, string[]>> = {
  muscle: {
    beginner: ["chest-press", "lat-pulldown", "shoulder-press", "leg-press", "arm-curl", "tricep-pushdown"],
    intermediate: ["pec-deck", "seated-row", "shoulder-press", "leg-press", "leg-curl", "arm-curl"],
    advanced: ["pec-deck", "seated-row", "leg-press", "leg-curl", "leg-extension", "ab-crunch"],
  },
  diet: {
    beginner: ["leg-press", "lat-pulldown", "chest-press", "leg-curl", "ab-crunch", "leg-extension"],
    intermediate: ["leg-press", "seated-row", "pec-deck", "leg-curl", "ab-crunch", "shoulder-press"],
    advanced: ["leg-press", "lat-pulldown", "pec-deck", "leg-curl", "ab-crunch", "back-extension"],
  },
  maintain: {
    beginner: ["chest-press", "lat-pulldown", "leg-press", "ab-crunch", "shoulder-press"],
    intermediate: ["pec-deck", "seated-row", "leg-press", "leg-curl", "ab-crunch"],
    advanced: ["chest-press", "lat-pulldown", "leg-press", "leg-extension", "back-extension"],
  },
  health: {
    beginner: ["leg-press", "lat-pulldown", "ab-crunch", "back-extension", "leg-extension"],
    intermediate: ["leg-press", "seated-row", "ab-crunch", "lat-pulldown", "leg-curl"],
    advanced: ["leg-press", "lat-pulldown", "ab-crunch", "back-extension", "leg-curl"],
  },
};

export const goalLabels: Record<string, string> = {
  muscle: "筋肉をつけたい",
  diet: "体重を落としたい",
  maintain: "体型を維持したい",
  health: "健康になりたい",
};

export const levelLabels: Record<string, string> = {
  beginner: "初心者（ジム歴3ヶ月未満）",
  intermediate: "中級者（ジム歴3ヶ月〜1年）",
  advanced: "上級者（ジム歴1年以上）",
};

export const crowdLabels = ["空いてる", "普通", "混んでる"];
export const crowdColors = ["#22C55E", "#EAB308", "#FF4040"];

export const muscleGroupColors: Record<string, { bg: string; text: string }> = {
  胸: { bg: "#FF6B35", text: "#fff" },
  背中: { bg: "#3B82F6", text: "#fff" },
  肩: { bg: "#A855F7", text: "#fff" },
  脚: { bg: "#22C55E", text: "#fff" },
  腕: { bg: "#EC4899", text: "#fff" },
  体幹: { bg: "#EAB308", text: "#000" },
};

export function generateWorkout(
  profile: UserProfile,
  storeId: string
): WorkoutItem[] {
  const levelKey =
    profile.level === "advanced"
      ? "advanced"
      : profile.level === "intermediate"
      ? "intermediate"
      : "beginner";
  const template = workoutTemplates[profile.goal]?.[levelKey] ?? workoutTemplates["muscle"]["beginner"];

  return template
    .map((machineId) => gymMachines.find((m) => m.id === machineId))
    .filter((m): m is GymMachine => !!m && m.storeId === storeId)
    .map((m, i) => ({
      machineId: m.id,
      machineName: m.name,
      muscleGroup: m.muscleGroup,
      sets: m.defaultSets,
      reps: m.defaultReps,
      restSeconds: profile.goal === "muscle" ? 120 : 60,
      note:
        i === 0
          ? "最初は軽めの重量でウォームアップ"
          : i === template.length - 1
          ? "最後のセット！最後まで頑張ろう"
          : "",
      done: false,
    }));
}
