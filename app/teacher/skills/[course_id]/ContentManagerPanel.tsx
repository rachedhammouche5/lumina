"use client";

import { useEffect, useMemo, useState } from "react";
import { ContentType, Skill, Topic } from "@/lib/database.types";
import { deleteContent, updateTopic, uploadContentFile } from "./actions";

type ManagedContent = {
  id: string;
  title: string;
  type: ContentType;
  value: string | null;
};

type DraftContent = {
  title: string;
  type: ContentType;
  value: string;
  file: File | null;
};

const EMPTY_DRAFT: DraftContent = {
  title: "",
  type: "video",
  value: "",
  file: null,
};

const FILE_TYPES: ContentType[] = ["audio", "pdf"];

const isFileType = (type: ContentType) => FILE_TYPES.includes(type);

export default function ContentManagerPanel({
  skill,
  topics,
  selectedTopicId,
  onSelectTopic,
}: {
  skill: Skill;
  topics: Topic[];
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
}) {
  const [contents, setContents] = useState<ManagedContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState<ManagedContent | null>(null);
  const [newDraft, setNewDraft] = useState<DraftContent>(EMPTY_DRAFT);
  const [creating, setCreating] = useState(false);

  const selectedTopic = useMemo(
    () => topics.find((topic) => topic.tpc_id === selectedTopicId) ?? null,
    [topics, selectedTopicId],
  );

  useEffect(() => {
    if (!selectedTopicId && topics.length > 0) {
      onSelectTopic(topics[0].tpc_id);
    }
  }, [onSelectTopic, selectedTopicId, topics]);

  useEffect(() => {
    if (!selectedTopicId) return;
    const fetchContents = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/teacher/content?topicId=${encodeURIComponent(selectedTopicId)}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data?.error || "Unable to load contents.");
        }
        const data = await response.json();
        setContents(data.contents ?? []);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load content.");
        setContents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [selectedTopicId]);

  const resolveValue = async (draft: DraftContent) => {
    if (!isFileType(draft.type)) return draft.value.trim();
    if (!draft.file) return draft.value.trim();
    const formData = new FormData();
    formData.append("file", draft.file);
    formData.append("type", draft.type);
    const upload = await uploadContentFile(formData);
    if (upload.error || !upload.url) {
      throw new Error(upload.error ?? "File upload failed.");
    }
    return upload.url;
  };

  const handleUpdate = async (content: ManagedContent) => {
    if (!content.title.trim() || !content.value?.trim()) return;
    setError("");
    setSavingId(content.id);
    try {
      if (!selectedTopic) {
        throw new Error("Select a topic first.");
      }
      const result = await updateTopic(skill.skl_id, selectedTopic.tpc_id, selectedTopic.parent_id, {
        hasTopicChanges: false,
        title: selectedTopic.tpc_title,
        description: selectedTopic.tpc_description ?? "",
        contents: [
          {
            id: content.id,
            title: content.title.trim(),
            type: content.type,
            value: content.value?.trim() ?? "",
          },
        ],
      });
      if ("error" in result && result.error) {
        throw new Error(result.error);
      }
      setContents((prev) =>
        prev.map((item) =>
          item.id === content.id
            ? { ...item, title: content.title.trim(), type: content.type, value: content.value?.trim() ?? "" }
            : item,
        ),
      );
      setEditingId(null);
      setEditingDraft(null);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Failed to update content.");
    } finally {
      setSavingId(null);
    }
  };

  const startEdit = (content: ManagedContent) => {
    setError("");
    setEditingId(content.id);
    setEditingDraft({ ...content });
  };

  const discardEdit = () => {
    setEditingId(null);
    setEditingDraft(null);
  };

  const handleDelete = async (contentId: string) => {
    if (!window.confirm("Delete this content item?")) return;
    setError("");
    setSavingId(contentId);
    try {
      const result = await deleteContent(contentId, skill.skl_id);
      if ("error" in result && result.error) {
        throw new Error(result.error);
      }
      setContents((prev) => prev.filter((item) => item.id !== contentId));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete content.");
    } finally {
      setSavingId(null);
    }
  };

  const handleCreate = async () => {
    if (!selectedTopicId) return;
    if (!newDraft.title.trim()) {
      setError("Content title is required.");
      return;
    }
    try {
      setError("");
      setCreating(true);
      const resolvedValue = await resolveValue(newDraft);
      if (!resolvedValue.trim()) {
        throw new Error("Content value is required.");
      }
      if (!selectedTopic) {
        throw new Error("Select a topic first.");
      }
      const contentId = crypto.randomUUID();
      const result = await updateTopic(skill.skl_id, selectedTopic.tpc_id, selectedTopic.parent_id, {
        hasTopicChanges: false,
        title: selectedTopic.tpc_title,
        description: selectedTopic.tpc_description ?? "",
        contents: [
          {
            id: contentId,
            title: newDraft.title.trim(),
            type: newDraft.type,
            value: resolvedValue.trim(),
          },
        ],
      });
      if ("error" in result && result.error) {
        throw new Error(result.error);
      }
      setContents((prev) => [
        {
          id: contentId,
          title: newDraft.title.trim(),
          type: newDraft.type,
          value: resolvedValue.trim(),
        },
        ...prev,
      ]);
      setNewDraft(EMPTY_DRAFT);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Failed to create content.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <div className="rounded-3xl border border-slate-700 bg-slate-950 p-4">
        <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Topic</p>
        <p className="mb-3 text-sm text-slate-400">Choose where to manage learning content.</p>
        <select
          value={selectedTopicId}
          onChange={(event) => onSelectTopic(event.target.value)}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none transition focus:border-indigo-400"
        >
          {topics.map((topic) => (
            <option key={topic.tpc_id} value={topic.tpc_id}>
              {topic.tpc_title}
            </option>
          ))}
        </select>

        <div className="mt-5 space-y-3 rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
          <p className="text-sm font-semibold text-white">Topic details</p>
          <p className="text-sm text-slate-300">{selectedTopic?.tpc_description ?? "No topic selected."}</p>
          <p className="text-xs text-slate-400">
            Add, edit, and remove content for this topic without opening the topic modal.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-3xl border border-slate-700 bg-slate-950 p-4">
          <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Add Content</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input
              value={newDraft.title}
              onChange={(event) => setNewDraft((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Content title"
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
            />
            <select
              value={newDraft.type}
              onChange={(event) =>
                setNewDraft((prev) => ({
                  ...prev,
                  type: event.target.value as ContentType,
                  value: "",
                  file: null,
                }))
              }
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
            >
              <option value="video">Video URL</option>
              <option value="docs">Documentation URL</option>
              <option value="mindmap">Mindmap URL</option>
              <option value="audio">Audio file</option>
              <option value="pdf">PDF file</option>
            </select>
            {isFileType(newDraft.type) ? (
              <input
                type="file"
                onChange={(event) =>
                  setNewDraft((prev) => ({ ...prev, file: event.target.files?.[0] ?? null, value: "" }))
                }
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              />
            ) : (
              <input
                value={newDraft.value}
                onChange={(event) => setNewDraft((prev) => ({ ...prev, value: event.target.value }))}
                placeholder="https://"
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              />
            )}
            <button
              type="button"
              onClick={handleCreate}
              disabled={!selectedTopicId || creating}
              className="rounded-xl border border-indigo-400/40 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating ? "Adding..." : "Add content"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-700 bg-slate-950 p-4">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Content Items</p>
            <p className="text-xl font-semibold text-white">{contents.length} items</p>
            <p className="mt-1 text-xs text-slate-400">Use Edit to modify, then Save or Discard.</p>
          </div>
          <div className="text-right text-sm text-slate-400">{selectedTopic?.tpc_title ?? "No topic selected"}</div>
        </div>

        {error ? <div className="rounded-2xl border border-red-500/40 bg-red-500/5 p-4 text-sm text-red-200">{error}</div> : null}

        {loading ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 text-center text-slate-300">
            Loading content...
          </div>
        ) : contents.length === 0 ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 text-slate-300">
            No content found for this topic yet. Add content above to start managing it.
          </div>
        ) : (
          <div className="space-y-3">
            {contents.map((content) => (
              <div key={content.id} className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
                {editingId === content.id && editingDraft ? (
                  <>
                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        value={editingDraft.title}
                        onChange={(event) =>
                          setEditingDraft((prev) => (prev ? { ...prev, title: event.target.value } : prev))
                        }
                        className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
                      />
                      <select
                        value={editingDraft.type}
                        onChange={(event) =>
                          setEditingDraft((prev) =>
                            prev ? { ...prev, type: event.target.value as ContentType, value: "" } : prev,
                          )
                        }
                        className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
                      >
                        <option value="video">video</option>
                        <option value="docs">docs</option>
                        <option value="mindmap">mindmap</option>
                        <option value="audio">audio</option>
                        <option value="pdf">pdf</option>
                      </select>
                      <input
                        value={editingDraft.value ?? ""}
                        onChange={(event) =>
                          setEditingDraft((prev) => (prev ? { ...prev, value: event.target.value } : prev))
                        }
                        placeholder={isFileType(editingDraft.type) ? "/uploads/audio/file.mp3" : "https://"}
                        className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white md:col-span-2"
                      />
                    </div>

                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={discardEdit}
                        className="rounded-lg border border-slate-500 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-700/60"
                      >
                        Discard changes
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleUpdate(editingDraft)}
                        disabled={savingId === content.id}
                        className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20 disabled:opacity-60"
                      >
                        {savingId === content.id ? "Saving..." : "Save changes"}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200">
                        {content.title}
                      </div>
                      <div className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 uppercase">
                        {content.type}
                      </div>
                      <div className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 md:col-span-2">
                        {content.value ?? "-"}
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(content)}
                        disabled={Boolean(editingId)}
                        className="rounded-lg border border-indigo-400/40 bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(content.id)}
                        disabled={savingId === content.id}
                        className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/20 disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
