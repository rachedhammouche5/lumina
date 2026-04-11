"use client";

import TopicNode from "./TopicNode";
import AddTopicForm from "./AddTopicForm";
import AddQuizForm from "./AddQuizForm";
import { useMemo, useState } from "react";
import { Skill, Topic, Content } from "@/lib/database.types";

export default function CourseDetailView({
  skill,
  topics,
  contents,
}: {
  skill: Skill;
  topics: Topic[];
  contents: Content[];
}) {
  const [parentId, setParentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefillTopic, setPrefillTopic] = useState<Topic | null>(null);
  const [isQuizModalOpen, setQuizModalOpen] = useState(false);
  const [quizTopic, setQuizTopic] = useState<Topic | null>(null);

  const rootTopics = useMemo(
    () => topics.filter((topic) => topic.parent_id === null),
    [topics],
  );

  const openTopicModal = (topic: Topic | null, editing: boolean) => {
    if (editing) {
      setParentId(topic?.parent_id ?? null);
      setIsModalOpen(true);
      setPrefillTopic(topic);
    } else {
      setParentId(topic?.tpc_id ?? null);
      setIsModalOpen(true);
      setPrefillTopic(null);
    }
  };

  const closeTopicModal = () => {
    setIsModalOpen(false);
    setParentId(null);
    setPrefillTopic(null);
  };

  const openQuizModal = (topic: Topic) => {
    setQuizTopic(topic);
    setQuizModalOpen(true);
  };
  const closeQuizModal = () => {
    setQuizTopic(null);
    setQuizModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{skill.skl_title}</h2>
        <p className="text-slate-300">{skill.skl_dscrptn}</p>
        <p className="text-sm text-slate-400">Duration: {skill.skl_duration}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Topics</h3>
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
              key={topic.tpc_id}
              topic={topic}
              allTopics={topics}
              skillId={skill.skl_id} 
              level={0}
              onAddTopic={openTopicModal}
              onAddQuiz={openQuizModal}
            />
          ))}
        </ul>
      </div>

      {isModalOpen ? (
        prefillTopic != null ? (
          <AddTopicForm
            skill={skill}
            parentId={prefillTopic.parent_id}
            prefillTopic={prefillTopic}
            contents={contents}
            closeTopicModal={closeTopicModal}
          />
        ) : (
          <AddTopicForm
            skill={skill}
            parentId={parentId}
            prefillTopic={null}
            contents={contents}
            closeTopicModal={closeTopicModal}
          />
        )
      ) : null}

      {isQuizModalOpen ? (
        quizTopic ? (
          <AddQuizForm
            skill={skill}
            topic={quizTopic}
            onClose={closeQuizModal}
          />
        ) : null
      ) : null}
    </div>
  );
}
