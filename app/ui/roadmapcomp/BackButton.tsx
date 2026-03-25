// app/ui/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import Button from "../Button";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="s"
      className="bg-linear-to-br from-slate-300/50 to-slate-500/10 border-2 border-slate-700/40"
      onClick={() => router.back()}
    >
      {"< Back to courses"}
    </Button>
  );
}