import { useEffect, useState } from "react";
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

  const [form, setForm] = useState<TopicFormState>({
    title: "",
    description: "",
    contents: [buildContentInput()],
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onClose = () => {
    closeTopicModal();
    setForm({ title: "", description: "", contents: [buildContentInput()] });
  };

  const getContentByTpcId = (topicId: string) =>
    contents.filter((c) => c.tpc_id === topicId);

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

  useEffect(() => {
    if (prefillTopic != null) {
      const topicContents: ContentInput[] = getContentByTpcId(
        prefillTopic.tpc_id,
      ).map((c) => ({
        id: c.cntnt_id,
        title: c.cntnt_title,
        type: c.cntnt_type,
        value: c.cntnt_value,
        isExisting: true,
      }));
      setForm({
        title: prefillTopic.tpc_title,
        description: prefillTopic.tpc_description ?? "",
        contents: topicContents.length > 0 ? topicContents : [buildContentInput()],
      });
    }
  }, []);

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
    <div className="fixed inset-0 z-50 bg-slate-950/70 p-4">
      <div className="flex min-h-full items-start justify-center py-6">
        <div className="w-full my-6 max-w-2xl max-h-[calc(90vh-1rem)] overflow-y-auto no-scrollbar rounded-lg border border-slate-700 bg-slate-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">
              {prefillTopic ? "Edit Topic" : "Add Topic"}
            </h4>
            <button type="button" onClick={onClose} className="text-slate-300 transition hover:text-white">
              Close
            </button>
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="topicTitle" className="mb-1 block text-sm text-slate-200">Title</label>
              <input
                id="topicTitle"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="topicDescription" className="mb-1 block text-sm text-slate-200">Description</label>
              <textarea
                id="topicDescription"
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                rows={3}
                required
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-200">Topic Contents</p>

              {form.contents.map((content, index) => (
                <div
                  key={content.id}
                  className="rounded-md border border-slate-700 p-3 space-y-3"
                >
                  {/* Content row header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">
                      Content {index + 1}
                      {content.isExisting && (
                        <span className="ml-2 rounded bg-slate-700 px-1.5 py-0.5 text-slate-300">
                          saved
                        </span>
                      )}
                    </span>

                    {/* Delete existing vs remove new */}
                    {content.isExisting ? (
                      <button
                        type="button"
                        disabled={deletingId === content.id}
                        onClick={() => handleDeleteContent(content.id)}
                        className="rounded border border-red-800 px-2 py-0.5 text-xs text-red-400 transition hover:bg-red-900/40 disabled:opacity-50"
                      >
                        {deletingId === content.id ? "Deleting…" : "Delete"}
                      </button>
                    ) : (
                      // Always show Remove on new rows, but only if there's more than 1 content
                      form.contents.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveNewContent(content.id)}
                          className="text-xs text-slate-400 transition hover:text-red-400 p-2"
                        >
                          <Trash2 size={20}/>
                        </button>
                      )
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-300">Content Title</label>
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
                      className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                      required
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs text-slate-300">Type</label>
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
                        className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                      >
                        <option value="video">Video URL</option>
                        <option value="audio">Audio file</option>
                        <option value="pdf">PDF file</option>
                        <option value="docs">Documentation URL</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-slate-300">
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
                          className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
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
                          className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, contents: [...prev.contents, buildContentInput()] }))}
                className="rounded-md border border-indigo-400 px-3 py-2 text-sm text-indigo-200 transition hover:bg-indigo-500/20"
              >
                Add New Content
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-slate-500 px-4 py-2 text-sm text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400"
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