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

export default function CourseSearchClient({
  studentId,
}: {
  studentId?: string;
}) {
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
          `/api/courses?q=${encodeURIComponent(debounceQuery)}`,
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
      <div className="group relative mb-12 w-full max-w-2xl ">
        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-70" />
        <div className="relative flex items-center rounded-3xl border border-white/10 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-xl">
          <div className="ml-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/50">
            <Search className="text-orange-500" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for skills eg: How to write a clean code ... "
            className="flex-1 bg-transparent px-4 py-3 text-lg text-white outline-none placeholder:text-slate-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="primary" size="m" className="mr-2">
            Explore
          </Button>
        </div>
      </div>
      {error ? <p className="mb-6 text-red-400">{error}</p> : null}
      <div className="relative mb-12 w-full max-w-4xl">
        <div className="absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient from-slate-950 to to-transparent pointer-events-none" />
        <div
          className="no-scroll-bar flex overflow-x-auto gap-3 px-12 pb-4 [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
                mask-fade-edges"
        >
          <button className="whitespace-nowrap rounded-2xl bg-orange-500 px-8 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
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
              className="whitespace-nowrap rounded-2xl border border-white/5 bg-slate-900/60 px-8 py-2.5 text-sm font-medium text-slate-400 transition-all hover:border-orange-500/30 hover:text-white"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent" />
      </div>
      <div className="mb-10 grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))
          : courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                href={studentId ? `/${studentId}/skills/${course.id}` : "/skills/roadmap"}
              />
            ))}
      </div>
    </>
  );
}
