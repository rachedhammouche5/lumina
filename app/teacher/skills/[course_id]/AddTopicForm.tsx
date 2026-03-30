import { useEffect, useState } from "react";
import { Topic, Skill, Content, ContentType } from "@/lib/database.types";
import { addTopic, updateTopic, uploadContentFile } from "./actions";

type ContentInput = {
  id: string;
  title: string;
  type: ContentType;
  value: string | null;
  file?: File | null;
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
  });

  const [form, setForm] = useState<TopicFormState>({
    title: "",
    description: "",
    contents: [buildContentInput()],
  });

  const onClose = () => {
    closeTopicModal();
    setForm({
      title: "",
      description: "",
      contents: [buildContentInput()],
    });
  };

  const getContentByTpcId = (topicId: string) => {
    return contents.filter((content) => content.tpc_id === topicId);
  };

  const hasContentChanged = (
    originalContent: Content | undefined,
    currentContent: Pick<ContentInput, "title" | "type" | "value">,
  ) => {
    if (!originalContent) {
      return true;
    }

    return (
      originalContent.cntnt_title !== currentContent.title ||
      originalContent.cntnt_type !== currentContent.type ||
      (originalContent.cntnt_value ?? "") !== (currentContent.value ?? "")
    );
  };

  const prefillForm = (prefillTopic: Topic | null) => {
    if (prefillTopic != null) {
      const topicContents: ContentInput[] = getContentByTpcId(
        prefillTopic.tpc_id,
      ).map((content) => ({
        id: content.cntnt_id,
        title: content.cntnt_title,
        type: content.cntnt_type,
        value: content.cntnt_value,
      }));
      setForm({
        title: prefillTopic.tpc_title,
        description: prefillTopic.tpc_description ?? "",
        contents:
          topicContents.length > 0 ? topicContents : [buildContentInput()],
      });
    }
  };

  useEffect(() => {
    if (prefillTopic != null) {
      prefillForm(prefillTopic);
    }
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // ✅ Step 1 — upload files first
    const resolvedContents = await Promise.all(
      form.contents.map(async (content) => {
        if (content.file) {
          const formData = new FormData();
          formData.append("file", content.file);
          formData.append("type", content.type);
          const result = await uploadContentFile(formData);
          if (result.error) {
            console.error(result.error);
            return content;
          }
          return { ...content, value: result.url ?? null };
        }
        return content;
      }),
    );

    const normalizedContents = resolvedContents.map(
      ({ id, title, type, value }) => ({
        id,
        title,
        type,
        value,
      }),
    );

    // ✅ Step 2 — now compare against DB with resolved URLs
    if (prefillTopic != null) {
      const originalContents = new Map(
        getContentByTpcId(prefillTopic.tpc_id).map((c) => [c.cntnt_id, c]),
      );

      // New contents have no matching DB row → always include them
      // Existing contents → include only if something changed
      const contentsToUpsert = normalizedContents.filter((content) => {
        const original = originalContents.get(content.id);
        if (!original) return true; // new content row
        return hasContentChanged(original, content);
      });

      const hasTopicChanges =
        form.title !== prefillTopic.tpc_title ||
        form.description !== (prefillTopic.tpc_description ?? "");

      if (!hasTopicChanges && contentsToUpsert.length === 0) {
        onClose();
        return;
      }

      const result = await updateTopic(
        skill.skl_id,
        prefillTopic.tpc_id,
        prefillTopic.parent_id,
        {
          hasTopicChanges,
          title: form.title,
          description: form.description,
          contents: contentsToUpsert,
        },
      );

      if ("error" in result && result.error) {
        console.error(result.error);
        return;
      }
      onClose();
      return;
    }

    // ✅ Add flow
    const result = await addTopic(skill.skl_id, parentId, {
      title: form.title,
      description: form.description,
      contents: normalizedContents,
    });

    if ("error" in result && result.error) {
      console.error(result.error);
      return;
    }
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
            <button
              type="button"
              onClick={onClose}
              className="text-slate-300 transition hover:text-white"
            >
              Close
            </button>
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="topicTitle"
                className="mb-1 block text-sm text-slate-200"
              >
                Title
              </label>
              <input
                id="topicTitle"
                value={form.title}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, title: event.target.value }))
                }
                className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="topicDescription"
                className="mb-1 block text-sm text-slate-200"
              >
                Description
              </label>
              <textarea
                id="topicDescription"
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                rows={3}
                required
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-200">
                Topic Contents
              </p>

              {form.contents.map((content, index) => (
                <div
                  key={content.id}
                  className="rounded-md border border-slate-700 p-3 space-y-3"
                >
                  <div>
                    <label className="mb-1 block text-xs text-slate-300">
                      Content Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Introduction Video"
                      value={content.title}
                      onChange={(event) => {
                        setForm((prev) => ({
                          ...prev,
                          contents: prev.contents.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, title: event.target.value }
                              : item,
                          ),
                        }));
                      }}
                      className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                      required
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* Content Type */}
                    <div>
                      <label className="mb-1 block text-xs text-slate-300">
                        Type
                      </label>
                      <select
                        value={content.type}
                        onChange={(event) => {
                          const value = event.target.value as ContentType;
                          setForm((prev) => ({
                            ...prev,
                            contents: prev.contents.map((item, itemIndex) =>
                              itemIndex === index
                                ? {
                                    ...item,
                                    type: value,
                                    value: null,
                                    file: null,
                                  }
                                : item,
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

                    {/* Content Value */}
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
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            setForm((prev) => ({
                              ...prev,
                              contents: prev.contents.map((item, itemIndex) =>
                                itemIndex === index
                                  ? { ...item, file, value: file?.name ?? "" }
                                  : item,
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
                          onChange={(event) => {
                            setForm((prev) => ({
                              ...prev,
                              contents: prev.contents.map((item, itemIndex) =>
                                itemIndex === index
                                  ? { ...item, value: event.target.value }
                                  : item,
                              ),
                            }));
                          }}
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
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    contents: [...prev.contents, buildContentInput()],
                  }))
                }
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
