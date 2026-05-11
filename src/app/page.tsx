"use client";

import { app } from "@/lib/firebase";

export default function Home() {
  console.log(app);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        GymPath
      </h1>
    </main>
  );
}