"use client";

import TopicNode from "./TopicNode";
import AddTopicForm from "./AddTopicForm";
import AddQuizForm from "./AddQuizForm";
import { useMemo, useState } from "react";
import { Skill, Topic, Content } from "@/lib/database.types";
import { Star } from "lucide-react";

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
    <div className="">
      <div className="space-y-2 py-6 px-8 bg-linear-to-br from-slate-600/40 to-slate-950 rounded-lg mb-6 items-center justify-center">
        <div className="flex flex-row items-center mb-15">
          {skill.skl_picture ? (
            <img
              src={skill.skl_picture}
              alt={skill.skl_title}
              className="w-26 h-26 object-cover rounded-md mr-4"
            />
          ) : (
            <div className="w-26 h-26 bg-slate-700 rounded-md mr-4 flex items-center justify-center">
              <span className="text-sm text-slate-400">No Image</span>
            </div>
          )}
          <div className="w-full ">
            <div className="flex flex-row w-full justify-between items-center border-b border-slate-400/40 mt-2">
              <h2 className="text-3xl font-bold text-white mb-3">{skill.skl_title}</h2>
              <div className="flex flex-row  justify-center items-center gap-2 bg-linear-to-br from-yellow-100 to-yellow-500 px-3 py-1 rounded-lg">
                <h4 className="text-2xl font-black text-slate-950">{skill.rating}</h4>
                <Star size={20} strokeWidth={3} className="text-slate-950" />  
              </div>
            </div>
            <p className="text-slate-300 mb-3">{skill.skl_dscrptn}</p>
            <div className="flex flex-row items-center gap-6 bg-orange-600/10 w-fit px-5 py-2 rounded-full border border-orange-400">
              <p className="text-sm text-orange-300">Duration: {skill.skl_duration}</p>
            </div>
          </div>
        </div>
        
        
        
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
