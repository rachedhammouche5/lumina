import LoginPageView from "@/app/ui/auth/LoginPageView";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPageView />
        </Suspense>
      </div>
    </main>
  );
}
