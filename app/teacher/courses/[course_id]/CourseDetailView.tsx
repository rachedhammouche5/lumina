"use client";

import TopicNode from "./TopicNode";
import AddTopicForm from "./AddTopicForm";
import { useMemo, useState } from "react";
import { Course, Topic, TopicContent } from "./Types";

export default function CourseDetailView({
  course,
  topics,
  contents,
}: {
  course: Course;
  topics: Topic[];
  contents: TopicContent[];
}) {
  const [allTopics, setAllTopics] = useState<Topic[]>(topics);
  const [allContents, setAllContents] = useState<TopicContent[]>(contents);
  const [parentId, setParentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefillTopic, setPrefillTopic] = useState<Topic | null>(null);

  const rootTopics = useMemo(
    () => allTopics.filter((topic) => topic.parentId === null),
    [allTopics],
  );

  const openTopicModal = (topic: Topic | null, editing: boolean) => {
    if (editing) {
      setParentId(topic?.parentId ?? null);
      setIsModalOpen(true);
      setPrefillTopic(topic);
    } else {
      setParentId(topic?.id ?? null);
      setIsModalOpen(true);
      setPrefillTopic(null);
    }
  };

  const closeTopicModal = () => {
    setIsModalOpen(false);
    setParentId(null);
    setPrefillTopic(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{course.title}</h2>
        <p className="text-slate-300">{course.description}</p>
        <p className="text-sm text-slate-400">Duration: {course.duration}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Course Topics</h3>
          <button
            type="button"
            onClick={() => openTopicModal(null, false)}
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Add Topic
          </button>
        </div>

        <ul className="space-y-2">
          {rootTopics.map((topic) => (
            <TopicNode
              key={topic.id}
              topic={topic}
              allTopics={allTopics}
              level={0}
              onAddTopic={openTopicModal}
            />
          ))}
        </ul>
      </div>

      {isModalOpen ? (
        prefillTopic != null ? (
          <AddTopicForm
            course={course}
            parentId={prefillTopic.id}
            prefillTopic={prefillTopic}
            contents={contents}
            closeTopicModal={closeTopicModal}
            setAllTopics={setAllTopics}
            setAllContents={setAllContents}
          />
        ) : (
          <AddTopicForm
            course={course}
            parentId={parentId}
            prefillTopic={null}
            contents={contents}
            closeTopicModal={closeTopicModal}
            setAllTopics={setAllTopics}
            setAllContents={setAllContents}
          />
        )
      ) : null}
    </div>
  );
}
