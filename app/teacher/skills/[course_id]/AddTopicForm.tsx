import { useState } from "react";
import { useRouter } from "next/navigation";
import { Topic, Skill, Content, ContentType } from "@/lib/database.types";
import { addTopic, updateTopic, uploadContentFile, deleteContent } from "./actions";
import {Trash2} from "lucide-react";

type ContentInput = {
  id: string;
  title: string;
  type: ContentType;
  value: string | null;
  file?: File | null;
  isExisting?: boolean; // came from DB
};

type TopicFormState = {
  title: string;
  description: string;
  contents: ContentInput[];
};

export default function AddTopicForm({
  skill,
  parentId,
  prefillTopic,
  contents,
  closeTopicModal,
}: {
  skill: Skill;
  parentId: string | null;
  prefillTopic: Topic | null;
  contents: Content[];
  closeTopicModal: () => void;
}) {
  const buildContentInput = (): ContentInput => ({
    id: crypto.randomUUID(),
    title: "",
    type: "video",
    value: null,
    isExisting: false,
  });

  const getContentByTpcId = (topicId: string) =>
    contents.filter((c) => c.tpc_id === topicId);

  const createInitialForm = (): TopicFormState => {
    if (prefillTopic != null) {
      const topicContents: ContentInput[] = getContentByTpcId(prefillTopic.tpc_id).map((c) => ({
        id: c.cntnt_id,
        title: c.cntnt_title,
        type: c.cntnt_type,
        value: c.cntnt_value,
        isExisting: true,
      }));

      return {
        title: prefillTopic.tpc_title,
        description: prefillTopic.tpc_description ?? "",
        contents: topicContents.length > 0 ? topicContents : [buildContentInput()],
      };
    }

    return {
      title: "",
      description: "",
      contents: [buildContentInput()],
    };
  };

  const [form, setForm] = useState<TopicFormState>(() => createInitialForm());
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onClose = () => {
    closeTopicModal();
    setForm(createInitialForm());
  };

  const hasContentChanged = (
    original: Content | undefined,
    current: Pick<ContentInput, "title" | "type" | "value">,
  ) => {
    if (!original) return true;
    return (
      original.cntnt_title !== current.title ||
      original.cntnt_type !== current.type ||
      (original.cntnt_value ?? "") !== (current.value ?? "")
    );
  };

  // Delete an existing DB content row immediately
  async function handleDeleteContent(contentId: string) {
    setDeletingId(contentId);
    const result = await deleteContent(contentId, skill.skl_id);
    setDeletingId(null);
    if (result.error) { console.error(result.error); return; }
    setForm((prev) => ({
      ...prev,
      contents: prev.contents.filter((c) => c.id !== contentId),
    }));
  }

  // Remove a new (unsaved) content row from local state only
  function handleRemoveNewContent(contentId: string) {
    setForm((prev) => ({
      ...prev,
      contents: prev.contents.filter((c) => c.id !== contentId),
    }));
  }

  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resolvedContents = await Promise.all(
      form.contents.map(async (content) => {
        if (content.file) {
          const fd = new FormData();
          fd.append("file", content.file);
          fd.append("type", content.type);
          const result = await uploadContentFile(fd);
          if (result.error) { console.error(result.error); return content; }
          return { ...content, value: result.url ?? null };
        }
        return content;
      }),
    );

    const normalizedContents = resolvedContents.map(
      ({ id, title, type, value }) => ({ id, title, type, value }),
    );

    if (prefillTopic != null) {
      const originalContents = new Map(
        getContentByTpcId(prefillTopic.tpc_id).map((c) => [c.cntnt_id, c]),
      );

      const contentsToUpsert = normalizedContents.filter((content) => {
        const original = originalContents.get(content.id);
        if (!original) return true;
        return hasContentChanged(original, content);
      });

      const hasTopicChanges =
        form.title !== prefillTopic.tpc_title ||
        form.description !== (prefillTopic.tpc_description ?? "");

      if (!hasTopicChanges && contentsToUpsert.length === 0) { onClose(); return; }

      const result = await updateTopic(
        skill.skl_id, prefillTopic.tpc_id, prefillTopic.parent_id,
        { hasTopicChanges, title: form.title, description: form.description, contents: contentsToUpsert },
      );

      if ("error" in result && result.error) { console.error(result.error); return; }
      router.refresh();
      onClose();
      return;
    }

    const result = await addTopic(skill.skl_id, parentId, {
      title: form.title,
      description: form.description,
      contents: normalizedContents,
    });

    if ("error" in result && result.error) { console.error(result.error); return; }
    router.refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 p-3 backdrop-blur-sm sm:p-4">
      <div className="flex min-h-full items-end justify-center sm:items-center">
        <div className="no-scrollbar flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/40">
          <div className="flex items-start justify-between gap-3 border-b border-slate-700 px-4 py-4 sm:px-5">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
                {prefillTopic ? "Update topic" : "New topic"}
              </p>
              <h4 className="mt-1 text-base font-semibold text-white sm:text-lg">
                {prefillTopic ? "Edit Topic" : "Add Topic"}
              </h4>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition hover:border-slate-500 hover:text-white"
              aria-label="Close topic form"
            >
              ✕
            </button>
          </div>

          <form className="space-y-4 px-4 py-4 sm:px-5 sm:py-5" onSubmit={onSubmit}>
            <div className="space-y-1">
              <label htmlFor="topicTitle" className="block text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                Title
              </label>
              <input
                id="topicTitle"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
                placeholder="Enter topic title"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="topicDescription" className="block text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                Description
              </label>
              <textarea
                id="topicDescription"
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
                placeholder="Short description of the topic"
                rows={3}
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">Topic contents</p>
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                  {form.contents.length} item{form.contents.length === 1 ? "" : "s"}
                </span>
              </div>

              {form.contents.map((content, index) => (
                <div
                  key={content.id}
                  className="space-y-4 rounded-2xl border border-slate-700 bg-slate-950/60 p-3 sm:p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
                      Content {index + 1}
                      {content.isExisting && (
                        <span className="ml-2 rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-slate-300">
                          saved
                        </span>
                      )}
                    </span>

                    {content.isExisting ? (
                      <button
                        type="button"
                        disabled={deletingId === content.id}
                        onClick={() => handleDeleteContent(content.id)}
                        className="inline-flex h-10 w-fit items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 px-3 text-xs font-semibold text-red-200 transition hover:bg-red-500/20 disabled:opacity-50"
                      >
                        {deletingId === content.id ? "Deleting..." : "Delete"}
                      </button>
                    ) : (
                      form.contents.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveNewContent(content.id)}
                          className="inline-flex h-10 w-fit items-center justify-center rounded-xl border border-slate-600 bg-slate-900 px-3 text-xs font-semibold text-slate-300 transition hover:border-red-500/40 hover:text-red-300"
                          aria-label="Remove content row"
                        >
                          <Trash2 size={16} />
                        </button>
                      )
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">Content title</label>
                    <input
                      type="text"
                      placeholder="e.g. Introduction Video"
                      value={content.title}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          contents: prev.contents.map((item, i) =>
                            i === index ? { ...item, title: e.target.value } : item,
                          ),
                        }))
                      }
                      className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
                      required
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">Type</label>
                      <select
                        value={content.type}
                        onChange={(e) => {
                          const value = e.target.value as ContentType;
                          setForm((prev) => ({
                            ...prev,
                            contents: prev.contents.map((item, i) =>
                              i === index ? { ...item, type: value, value: null, file: null } : item,
                            ),
                          }));
                        }}
                        className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-orange-400"
                      >
                        <option value="video">Video URL</option>
                        <option value="audio">Audio file</option>
                        <option value="pdf">PDF file</option>
                        <option value="docs">Documentation URL</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                        {content.type === "video" && "Video URL"}
                        {content.type === "audio" && "Audio file"}
                        {content.type === "pdf" && "PDF file"}
                        {content.type === "docs" && "Documentation URL"}
                      </label>

                      {content.type === "audio" || content.type === "pdf" ? (
                        <input
                          key={`file-${content.id}`}
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            setForm((prev) => ({
                              ...prev,
                              contents: prev.contents.map((item, i) =>
                                i === index ? { ...item, file, value: file?.name ?? "" } : item,
                              ),
                            }));
                          }}
                          required={!content.value}
                          className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition file:mr-3 file:rounded-lg file:border-0 file:bg-orange-500/20 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-orange-100 hover:border-orange-400"
                        />
                      ) : (
                        <input
                          key={`url-${content.id}`}
                          type="url"
                          placeholder="https://"
                          value={content.value ?? ""}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              contents: prev.contents.map((item, i) =>
                                i === index ? { ...item, value: e.target.value } : item,
                              ),
                            }))
                          }
                          required
                          className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, contents: [...prev.contents, buildContentInput()] }))}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-orange-400/40 bg-orange-500/10 px-3 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/20 sm:w-auto"
              >
                Add New Content
              </button>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-700 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-600 px-4 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-amber-400 px-5 text-sm font-semibold text-white transition hover:from-orange-400 hover:to-amber-300"
              >
                Save Topic
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
