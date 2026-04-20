export default function CodeBlock({ code }: { code: string }) {
  return (
    <div className="mt-3 rounded-xl overflow-hidden border border-white/10 bg-[#070a13]">
      <div className="flex gap-1.5 px-3 py-2 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <pre className="m-0 px-3.5 py-3 font-mono text-xs leading-relaxed text-[#a8c0e0] overflow-x-auto whitespace-pre">
        {code}
      </pre>
    </div>
  );
}