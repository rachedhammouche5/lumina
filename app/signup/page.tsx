export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 pt-24">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6 text-white shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Sign Up</h2>
        </div>
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-sky-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:border-sky-500"
          />
          <button
            type="button"
            className="w-full rounded-lg bg-sky-500 py-2 font-medium hover:bg-sky-400"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}
