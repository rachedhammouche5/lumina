import Button from "../Button";

interface Props {
  title: string;
  value?: number;
}

function ProgressBar({ title, value = 0 }: Props) {
  return (
    <div className="h-auto md:h-48 flex flex-col w-full border-2 border-slate-500/60 rounded-[32px] bg-linear-130 from-slate-300/20 to-slate-900/10 p-5 backdrop-blur-xl shadow-2xl shadow-slate-300/20">
      <div className="flex flex-row w-full justify-between items-center">
        <h3 className="text-sm md:text-base font-semibold">{title}</h3>
        <h2 className="font-black italic text-xl md:text-2xl text-orange-300">{value}%</h2>
      </div>
      <div className="h-10 md:h-14 w-full flex flex-row items-center">
        <div className="w-full h-1.5 rounded-full bg-slate-800 mb-3">
          <div
            className="w-full h-1.5 rounded-full bg-linear-90 from-orange-600 to-orange-300 mb-3"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
      <div className="mt-1">
        <Button variant="primary" size="l" className="flex flex-col w-full h-14 items-start">
          <h3 className="uppercase text-sm">next Progress</h3>
          <p className="text-[11px] text-slate-950 font-bold">Content he will be in the roadmaop.</p>
        </Button>
      </div>
    </div>
  );
}

export default ProgressBar;
