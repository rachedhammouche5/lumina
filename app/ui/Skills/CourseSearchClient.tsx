"use client";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "./CourseCardSkeleton";
import Button from "../Button";
type Course = {
  id: string;
  title: string;
  description: string;
};

export default function CourseSearchClient() {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `/api/skills?q=${encodeURIComponent(debounceQuery)}`,
          {
            signal: controller.signal,
          },
        );
        if (!res.ok) throw new Error("failed to load courses");
        const payload = (await res.json()) as { data: Course[] };

        if (!cancelled) setCourses(payload.data ?? []);
      } catch (err) {
        if (!cancelled && (err as Error).name !== "AbortError") {
          setError("failed to load courses");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    const t = setTimeout(load, 350);
    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(t);
    };
  }, [debounceQuery]);
  return (
    <>
      <div className="relative w-full max-w-2xl mb-12 group ">
        <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
        <div className="relative flex items-center bg-slate-900/50 backdrop-blur-xl border border-white/10 p-2 rounded-3xl shadow-2xl">
          <div className="flex items-center justify-center w-12 h-12 ml-2 bg-slate-800/50 rounded-2xl">
            <Search className="text-orange-500" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for skills eg: How to write a clean code ... "
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-slate-500 outline-none text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="primary" size="m" className="mr-2">
            {" "}
            Explore{" "}
          </Button>
        </div>
      </div>
      {error ? <p className="text-red-400 mb-6">{error}</p> : null}
      <div className="relative w-full max-w-4xl mb-12">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient from-slate-950 to to-transparent z-10 pointer-events-none" />
        <div
          className="flex overflow-x-auto gap-3 no-scroll-bar pb-4 px-12 mask-fade-edges [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <button className="whitespace-nowrap px-8 py-2.5 rounded-2xl text-sm font-bold bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
            All Paths
          </button>
          {[
            "Clean Code Writing",
            "Unit & Integration Testing",
            "Frontend Architecture",
            "Backend Systems",
            "DevOps & Deployment",
            "Data Structures",
            "Mobile Engineering",
            "UI/UX Design Systems",
          ].map((category) => (
            <button
              key={category}
              className="whitespace-nowrap px-8 py-2.5 rounded-2xl text-sm font-medium text-slate-400 bg-slate-900/60 border border-white/5 hover:border-orange-500/30 hover:text-white transition-all"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mb-10">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))
          : courses.map((course) => (
              <CourseCard
              key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
              />
            ))}
      </div>
    </>
  );
}
