// app/ui/roadmapcomp/EnrollButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../Button";
import { Enrollment } from "@/app/actions/enrollement";

export default function EnrollButton({
  skillId,
  isLoggedIn,
  isEnrolled,
  setIsEnrolled,
}: {
  skillId: string;
  isLoggedIn: boolean;
  isEnrolled: boolean;
  setIsEnrolled: (value: boolean) => void;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  if (isEnrolled) {
    return (
      <Button variant="outline" size="s" disabled>
        Enrolled ✓
      </Button>
    );
  }

  if (!isLoggedIn) {
    return (
      <Button
        variant="outline"
        size="s"
        className="bg-linear-to-br from-slate-300/50 to-slate-500/10 border-2 border-slate-700/40"
        onClick={() => router.push("/login")}
      >
        Log in to Enroll
      </Button>
    );
  }

  async function handleEnroll() {
    setIsPending(true);
    const result = await Enrollment(skillId);
    if ("error" in result) {
      console.error(result.error);
    } else {
      setIsEnrolled(true);
      router.refresh();
    }
    setIsPending(false);
  }

  return (
    <Button
      variant="outline"
      size="s"
      className="bg-linear-to-br from-slate-300/50 to-slate-500/10 border-2 border-slate-700/40"
      disabled={isPending}
      onClick={handleEnroll}
    >
      {isPending ? "Enrolling..." : "Enroll"}
    </Button>
  );
}