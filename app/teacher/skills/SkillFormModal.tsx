"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { addSkill, updateSkill, uploadSkillImage } from "./actions";
import { Skill } from "@/lib/database.types";

type Props = {
  teacher_id: string;
  editingSkill?: Skill | null;
  onClose: () => void;
};

const EMPTY_FORM = { title: "", description: "", duration: "" as string };

function getInitialForm(editingSkill?: Skill | null) {
  if (!editingSkill) return EMPTY_FORM;

  return {
    title: editingSkill.skl_title,
    description: editingSkill.skl_dscrptn,
    duration: String(editingSkill.skl_duration),
  };
}

export default function SkillFormModal({ teacher_id, editingSkill, onClose }: Props) {
  const isEdit = !!editingSkill;

  const [form, setForm] = useState(() => getInitialForm(editingSkill));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(() => editingSkill?.skl_picture ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);

      if (previewUrlRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      previewUrlRef.current = null;
    };
  }, [onClose]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    if (previewUrlRef.current?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setPreview(objectUrl);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let picturePath: string | null = editingSkill?.skl_picture ?? null;

    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      const upload = await uploadSkillImage(fd);
      if (upload.error) {
        setError(upload.error);
        setLoading(false);
        return;
      }
      picturePath = upload.url ?? null;
    }

    const payload = {
      skl_title: form.title,
      skl_dscrptn: form.description,
      skl_duration: Number(form.duration),
      teacher_id,
      skl_picture: picturePath,
    };

    const result = isEdit
      ? await updateSkill({ skl_id: editingSkill!.skl_id, ...payload })
      : await addSkill(payload);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    onClose();
  }

  const clearImage = () => {
    if (previewUrlRef.current?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    previewUrlRef.current = null;
    setPreview(null);
    setImageFile(null);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] bg-slate-950/80 p-3 backdrop-blur-sm sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div className="flex min-h-full items-end justify-center sm:items-center">
        <div
          className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900 shadow-2xl shadow-black/60 sm:max-w-lg"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="skill-form-title"
        >
          <div className="flex items-start justify-between gap-4 border-b border-slate-700/70 px-4 py-4 sm:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-orange-300">
                {isEdit ? "Update skill" : "New skill"}
              </p>
              <h3 id="skill-form-title" className="mt-1 text-lg font-semibold text-white sm:text-xl">
                {isEdit ? "Edit Skill" : "Add Skill"}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition hover:border-slate-500 hover:text-white"
              aria-label="Close skill form"
            >
              ✕
            </button>
          </div>

          <form onSubmit={onSubmit} className="pretty-scrollbar flex-1 space-y-4 overflow-y-scroll px-4 py-4 pr-2 sm:px-6 sm:pr-4">
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.18em] text-slate-400">
                Cover Image
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className="relative flex h-44 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-600 bg-slate-800 transition hover:border-orange-400 sm:h-48"
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="px-6 text-center">
                    <p className="text-sm font-medium text-slate-300">
                      Tap to upload a cover image
                    </p>
                    <p className="mt-1 text-xs text-slate-500">PNG, JPG, or WEBP</p>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {preview && (
                <button
                  type="button"
                  onClick={clearImage}
                  className="text-xs font-medium text-red-300 transition hover:text-red-200"
                >
                  Remove image
                </button>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="skl-title" className="block text-xs uppercase tracking-[0.18em] text-slate-400">
                Title
              </label>
              <input
                id="skl-title"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                required
                placeholder="Enter skill title"
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-3 text-sm text-white outline-none ring-orange-400 transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="skl-desc" className="block text-xs uppercase tracking-[0.18em] text-slate-400">
                Description
              </label>
              <textarea
                id="skl-desc"
                rows={4}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                required
                placeholder="Enter skill description"
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-3 text-sm text-white outline-none ring-orange-400 transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="skl-dur" className="block text-xs uppercase tracking-[0.18em] text-slate-400">
                Duration (hours)
              </label>
              <input
                id="skl-dur"
                type="number"
                min={1}
                value={form.duration}
                onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))}
                required
                placeholder="e.g. 10"
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-3 text-sm text-white outline-none ring-orange-400 transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-700/70 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-600 px-4 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-400 hover:to-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Skill"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
