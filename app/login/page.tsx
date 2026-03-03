import Button from "../ui/Button";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 pt-24">
      <div className="flex justify-between w-full max-w-7xl rounded-2xl p-6 text-white shadow-2xl border-0 border-slate-800">
        <div>
          <h2 className="text-6xl font-black mt-2">Welcome Back,</h2>
          <h6 className="text-left ml-50 text-slate-400">We are happy to see you again :)</h6>
          <div className="bg-slate-900 w-full mt-10 rounded-4xl flex flex-col gap-2 border-2 border-slate-800 p-10 justify-center items-center">
            <h2 className="font-bold text-2xl mb-10">LOGIN</h2>
            <form action="" className="flex flex-col gap-6 w-100">
              <input type="text" placeholder="Email" className="bg-slate-800 border-2 border-slate-800 rounded-xl p-2" />
              <input type="password" placeholder="Password" className="bg-slate-800 border-2 border-slate-800 rounded-xl p-2" />
              <div className="flex flex-row gap-3">
                <input type="checkbox" className="ml-5 bg-slate-300" />
                <h6 className="text-sm font-extralight text-slate-400">Remember the Password</h6>
              </div>
              <Button variant="primary" size="m">Submit</Button>
            </form>
          </div>
        </div>
        <div>
          <img src="/png/login.png" alt="" className="w-150 p-2" />
        </div>
      </div>
    </main>
  );
}
