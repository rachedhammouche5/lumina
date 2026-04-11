"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { addSkill, updateSkill, uploadSkillImage } from "./actions";
import { Skill } from "@/lib/database.types";

type Props = {
  teacher_id: string;
  editingSkill?: Skill | null;   // null/undefined → add mode
  onClose: () => void;
};

const EMPTY_FORM = { title: "", description: "", duration: "" as string };

export default function SkillFormModal({ teacher_id, editingSkill, onClose }: Props) {
  const isEdit = !!editingSkill;

  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Populate form when editing
  useEffect(() => {
    if (editingSkill) {
      setForm({
        title: editingSkill.skl_title,
        description: editingSkill.skl_dscrptn,
        duration: String(editingSkill.skl_duration),
      });
      setPreview(editingSkill.skl_picture ?? null);
    } else {
      setForm(EMPTY_FORM);
      setPreview(null);
      setImageFile(null);
    }
  }, [editingSkill]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let picturePath: string | null = editingSkill?.skl_picture ?? null;

    // Upload new image if selected
    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      const upload = await uploadSkillImage(fd);
      if (upload.error) { setError(upload.error); setLoading(false); return; }
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

    if (result.error) { setError(result.error); setLoading(false); return; }

    setLoading(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {isEdit ? "Edit Skill" : "Add Skill"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Image upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">
              Cover Image
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="relative flex h-36 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-600 bg-slate-800 transition hover:border-indigo-400"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-slate-400">Click to upload image</p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP</p>
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
                onClick={() => { setPreview(null); setImageFile(null); }}
                className="text-xs text-red-400 hover:text-red-300 transition"
              >
                Remove image
              </button>
            )}
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="skl-title" className="block text-sm font-medium text-slate-200">
              Title
            </label>
            <input
              id="skl-title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              required
              placeholder="Enter skill title"
              className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white outline-none ring-indigo-400 focus:ring"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="skl-desc" className="block text-sm font-medium text-slate-200">
              Description
            </label>
            <textarea
              id="skl-desc"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              required
              placeholder="Enter skill description"
              className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white outline-none ring-indigo-400 focus:ring"
            />
          </div>

          {/* Duration */}
          <div className="space-y-1">
            <label htmlFor="skl-dur" className="block text-sm font-medium text-slate-200">
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
              className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white outline-none ring-indigo-400 focus:ring"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-600 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:opacity-50"
            >
              {loading ? "Saving…" : isEdit ? "Save Changes" : "Add Skill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}