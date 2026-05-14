"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
        <h2 className="mb-4 text-xl font-semibold">Something went wrong</h2>
        <button
          onClick={reset}
          className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold hover:bg-orange-400"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
