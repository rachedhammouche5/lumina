import React from "react";
import CodeBlock from "@/app/ui/ai-tutor/CodeBlock";

export function formatContent(text: string): React.ReactNode[] {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith("```")) {
      const code = part.replace(/^```\w*\n?/, "").replace(/```$/, "");
      return <CodeBlock key={i} code={code} />;
    }
    const bold = part.split(/(\*\*.*?\*\*)/g).map((s, j) =>
      s.startsWith("**") ? (
        <strong key={j} className="text-[#f4a435] font-semibold">
          {s.slice(2, -2)}
        </strong>
      ) : (
        s
      )
    );
    return (
      <span key={i} className="whitespace-pre-wrap">
        {bold}
      </span>
    );
  });
}