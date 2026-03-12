import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Topic,
  Course,
  TopicFormState,
  TopicContentType,
  TopicContentInput,
  TopicContent,
} from "./Types";

export default function AddtopicForm({
  course,
  parentId,
  prefillTopic,
  contents,
  closeTopicModal,
  setAllTopics,
  setAllContents,
}: {
  course: Course;
  parentId: string | null;
  prefillTopic: Topic | null;
  contents:TopicContent[];
  closeTopicModal: () => void;
  setAllTopics: Dispatch<SetStateAction<Topic[]>>;
  setAllContents: Dispatch<SetStateAction<TopicContent[]>>
}) {


  const onClose = () => {
    closeTopicModal();
    setForm({
      title: "",
      description: "",
      contents: [buildContentInput()],
    });
  };

  const buildContentInput = (): TopicContentInput => ({
    id: crypto.randomUUID(),
    type: "video_url",
    value: "",
  });

  const [form, setForm] = useState<TopicFormState>({
    title: "",
    description: "",
    contents: [buildContentInput()],
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTopic: Topic = {
      id: `topic-${crypto.randomUUID()}`,
      courseId: course.id,
      title: form.title,
      description: form.description,
      parentId,
    };
    form.contents.map((contentInput) => {
      setAllContents((prev) => [
        ...prev,
        {
          id: `topic-${crypto.randomUUID()}`,
          topicId: newTopic.id,
          type: contentInput.type,
          value: contentInput.value,
        },
      ]);
    });
    setAllTopics((prev) => [...prev, newTopic]);
    onClose();
  };

  const getContentByTpcId = (topicId: string) => {
    return contents.filter((content) => content.topicId === topicId);
  };

  const prefillForm = (prefillTopic: Topic | null) => {
    if (prefillTopic != null) {
      const topicContents = getContentByTpcId(prefillTopic.id).map((content) => ({
      id: content.id,
      type: content.type,
      value: content.value,
    }))
      setForm((prev) => ({
        title: `${prefillTopic.title}`,
        description: `${prefillTopic.description}`,
        contents:topicContents,
      }));
    }
  };
  useEffect(() => {
  if (prefillTopic != null) {
    prefillForm(prefillTopic)
  }
}, []) 

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 p-4">
      <div className="flex min-h-full items-start justify-center py-6">
        <div className="w-full my-6 max-w-2xl max-h-[calc(90vh-1rem)] overflow-y-auto no-scrollbar rounded-lg border border-slate-700 bg-slate-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">Add Topic</h4>
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
                  className="rounded-md border border-slate-700 p-3"
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs text-slate-300">
                        Type
                      </label>
                      <select
                        value={content.type}
                        onChange={(event) => {
                          const value = event.target.value as TopicContentType;
                          setForm((prev) => ({
                            ...prev,
                            contents: prev.contents.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, type: value, value: "" }
                                : item,
                            ),
                          }));
                        }}
                        className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                      >
                        <option value="video_url">Video URL</option>
                        <option value="audio_file">Audio file</option>
                        <option value="pdf_file">PDF file</option>
                        <option value="doc_url">Documentation URL</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-slate-300">
                        {content.type === "video_url" && "Video URL"}
                        {content.type === "audio_file" && "Audio file"}
                        {content.type === "pdf_file" && "PDF file"}
                        {content.type === "doc_url" && "Documentation URL"}
                      </label>

                      {content.type === "audio_file" ||
                      content.type === "pdf_file" ? (
                        <input
                          type="file"
                          onChange={(event) => {
                            const fileName =
                              event.target.files?.[0]?.name ?? "";
                            setForm((prev) => ({
                              ...prev,
                              contents: prev.contents.map((item, itemIndex) =>
                                itemIndex === index
                                  ? { ...item, value: fileName }
                                  : item,
                              ),
                            }));
                          }}
                          className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                        />
                      ) : (
                        <input
                          type="url"
                          placeholder="https://"
                          value={content.value}
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
