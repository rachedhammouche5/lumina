import Button from "../Button";

interface CourseCardProps {
  title: string;
  description: string;
  image?: string;
  href: string;
}

function CourseCard({ title, description, image, href }: CourseCardProps) {
  return (
    <div className="group relative flex aspect-[3/2] w-full flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/40 p-5 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-orange-500/40">
      <div className="relative mb-4 h-[60%] w-full overflow-hidden rounded-2xl bg-slate-800">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-slate-800" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="flex flex-grow flex-col justify-between">
        <div>
          <h3 className="line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-orange-500">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[11px] font-medium leading-snug text-slate-500">
            {description}
          </p>
        </div>

        <div className="mt-3 flex flex-1 items-left">
          <Button href={href} variant="outline" className="text-xs py-2">
            Let&apos;s Start
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
