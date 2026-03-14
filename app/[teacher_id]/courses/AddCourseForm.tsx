"use client";

import { useState } from "react";
import { addSkill } from "./actions";

export default function AddCourseForm({ teacher_id }: { teacher_id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: NaN,
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await addSkill({
      skl_title: form.title,
      skl_dscrptn: form.description,
      skl_duration: form.duration,
      teacher_id: teacher_id,
    });

    if (result.error) {
      console.error(result.error);
      return;
    }
    setIsOpen(false);
    setForm({ title: "", description: "", duration: 0 });
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-white">Courses</h2>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          + Add Course
        </button>
      </div>

      {isOpen ? (
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-lg border border-slate-700 bg-slate-800 p-4"
        >
          <div className="space-y-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-200"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              type="text"
              placeholder="Enter course title"
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none ring-indigo-400 focus:ring"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-200"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Enter course description"
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none ring-indigo-400 focus:ring"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-slate-200"
            >
              Duration
            </label>
            <input
              id="duration"
              name="duration"
              type="number"
              value={form.duration}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  duration: Number(e.target.value),
                }))
              }
              placeholder="enter duration in hours"
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none ring-indigo-400 focus:ring"
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400"
          >
            Save Course
          </button>
        </form>
      ) : null}
    </div>
  );
}
