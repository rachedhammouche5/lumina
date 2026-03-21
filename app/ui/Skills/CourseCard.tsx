import Button from "../Button";

interface CourseCardProps {
  title: string;
  description: string;
  image?: string;
}

function CourseCard({ title, description, image }: CourseCardProps) {
  return (
    <div className="group relative bg-slate-900/40 w-full aspect-[3/2] backdrop-blur-md border border-white/5 rounded-[2rem] p-5 overflow-hidden transition-all duration-500 hover:border-orange-500/40 hover:scale-[1.02] flex flex-col">
      <div className="relative w-full h-[60%] rounded-2xl overflow-hidden mb-4 bg-slate-800">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="h-full w-full bg-slate-800" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-slate-500 text-[11px] mt-1 line-clamp-2 leading-snug font-medium">
            {description}
          </p>
        </div>

        <div className="mt-3 items-left flex flex-1">
          <Button variant="outline" className=" text-xs py-2">
            Let&apos;s Start
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
