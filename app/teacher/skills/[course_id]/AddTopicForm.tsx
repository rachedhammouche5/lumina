import { useState } from "react";
import { Content, ContentType, Skill, Topic } from "@/lib/database.types";
import { addTopic } from "./actions";

type ContentInput = {
  id: string;
  title: string;
  type: ContentType;
  value: string | null;
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
    value: "",
  });

  const getContentByTpcId = (topicId: string) => {
    return contents.filter((content) => content.tpc_id === topicId);
  };

  const buildInitialForm = (): TopicFormState => {
    if (!prefillTopic) {
      return {
        title: "",
        description: "",
        contents: [buildContentInput()],
      };
    }

    const topicContents: ContentInput[] = getContentByTpcId(prefillTopic.tpc_id).map(
      (content) => ({
        id: content.cntnt_id,
        title: content.cntnt_title,
        type: content.cntnt_type,
        value: content.cntnt_value,
      }),
    );

    return {
      title: prefillTopic.tpc_title,
      description: prefillTopic.tpc_description ?? "",
      contents: topicContents.length > 0 ? topicContents : [buildContentInput()],
    };
  };

  const [form, setForm] = useState<TopicFormState>(buildInitialForm);

  const onClose = () => {
    closeTopicModal();
    setForm({
      title: "",
      description: "",
      contents: [buildContentInput()],
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await addTopic(skill.skl_id, parentId, {
      title: form.title,
      description: form.description,
      contents: form.contents,
    });

    if (result.error) {
      console.error(result.error);
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 p-4">
      <div className="flex min-h-full items-start justify-center py-6">
        <div className="no-scrollbar my-6 max-h-[calc(90vh-1rem)] w-full max-w-2xl overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 p-5">
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
                rows={3}
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, description: event.target.value }))
                }
                className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-semibold text-white">Topic Contents</h5>
                <button
                  type="button"
                  className="rounded-md border border-slate-600 px-3 py-1 text-sm text-white hover:bg-slate-800"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      contents: [...prev.contents, buildContentInput()],
                    }))
                  }
                >
                  + Add Content
                </button>
              </div>

              {form.contents.map((content, index) => (
                <div
                  key={content.id}
                  className="space-y-3 rounded-md border border-slate-700 bg-slate-800/60 p-3"
                >
                  <div>
                    <label className="mb-1 block text-sm text-slate-200">
                      Content title
                    </label>
                    <input
                      value={content.title}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          contents: prev.contents.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, title: event.target.value }
                              : item,
                          ),
                        }))
                      }
                      className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm text-slate-200">
                      Type
                    </label>
                    <select
                      value={content.type}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          contents: prev.contents.map((item, itemIndex) =>
                            itemIndex === index
                              ? {
                                  ...item,
                                  type: event.target.value as ContentType,
                                }
                              : item,
                          ),
                        }))
                      }
                      className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white"
                    >
                      <option value="video">Video</option>
                      <option value="article">Article</option>
                      <option value="quiz">Quiz</option>
                      <option value="file">File</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm text-slate-200">
                      Value / URL
                    </label>
                    <input
                      value={content.value ?? ""}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          contents: prev.contents.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, value: event.target.value }
                              : item,
                          ),
                        }))
                      }
                      className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white"
                    />
                  </div>

                  <button
                    type="button"
                    className="text-sm text-red-300 hover:text-red-200"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        contents:
                          prev.contents.length > 1
                            ? prev.contents.filter((item) => item.id !== content.id)
                            : [buildContentInput()],
                      }))
                    }
                  >
                    Remove content
                  </button>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Save Topic
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
