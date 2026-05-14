import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center">
      <h1 className="text-6xl font-black text-white">404</h1>
      <p className="mt-3 text-lg text-slate-400">Page not found</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-400"
      >
        Go home
      </Link>
    </main>
  );
}
