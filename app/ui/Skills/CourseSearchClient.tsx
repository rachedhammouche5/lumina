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
  image?: string | null;
};

export default function CourseSearchClient() {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const quickSearches = [
    "Debugging",
    "Git",
    "Algorithm",
    "Maintenance",
    "Testing"
  ];

  const handleQuickSearch = (value: string) => {
    setQuery(value);
  };

  const debounceQuery = useMemo(() => query.trim(), [query]);
  const normalizedQuery = debounceQuery.toLowerCase();
  const activePillClass =
    "whitespace-nowrap px-8 py-2.5 rounded-2xl text-sm font-bold bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all";
  const inactivePillClass =
    "whitespace-nowrap px-8 py-2.5 rounded-2xl text-sm font-medium text-slate-400 bg-slate-900/60 border border-white/5 hover:border-orange-500/30 hover:text-white transition-all";

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
    <div className="relative mb-12 w-full max-w-2xl group">
      <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
        <div className="relative flex items-center rounded-3xl border border-white/10 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-xl">
          <div className="ml-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/50">
            <Search className="text-orange-500" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for skills eg: How to write a clean code ... "
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-white outline-none placeholder:text-slate-500 sm:px-4 sm:text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="primary" size="m" className="mr-1 whitespace-nowrap sm:mr-2">
            Explore
          </Button>
        </div>
      </div>
      {error ? <p className="text-red-400 mb-6">{error}</p> : null}
      <div className="relative w-full max-w-4xl mb-12">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none sm:w-16" />
        <div
          className="flex overflow-x-auto gap-3 pb-4 px-4 sm:px-12 no-scroll-bar mask-fade-edges [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <button
            type="button"
            onClick={() => handleQuickSearch("")}
            className={
              normalizedQuery === "" ? activePillClass : inactivePillClass
            }
          >
            Quik Search
          </button>
          {quickSearches.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => handleQuickSearch(category)}
              className={
                normalizedQuery === category.toLowerCase()
                  ? activePillClass
                  : inactivePillClass
              }
            >
              {category}
            </button>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none sm:w-16" />
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
                image={course.image ?? undefined}
              />
            ))}
      </div>
    </>
  );
}
