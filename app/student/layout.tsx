import type { ReactNode } from "react";
import FloatingTutorButton from "@/app/ui/ai-tutor/FloatingTutorButton";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <FloatingTutorButton />
    </>
  );
}
