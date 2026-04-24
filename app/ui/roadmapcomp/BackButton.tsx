import Button from "../Button";

export default function BackButton() {
  return (
    <Button
      variant="outline"
      size="s"
      href="/skills"
      className="bg-linear-to-br from-slate-300/50 to-slate-500/10 border-2 border-slate-700/40"
    >
      {"< Back to courses"}
    </Button>
  );
}