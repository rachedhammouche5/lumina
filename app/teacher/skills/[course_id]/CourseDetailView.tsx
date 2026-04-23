"use client";

import AddTopicForm from "./AddTopicForm";
import AddQuizForm from "./AddQuizForm";
import QuizManagerModal from "./QuizManagerModal";
import ContentManagerPanel from "./ContentManagerPanel";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Skill, Topic, Content } from "@/lib/database.types";
import RoadmapFlow from "@/app/ui/roadmapcomp/teacherRoadmap/TRoadmapFlow";
import { deleteTopic } from "./actions";
import { deleteSkill } from "../actions";
import SkillFormModal from "../SkillFormModal";
import SkillHeader from "@/app/ui/SkillHeader";
import { Pencil, Trash2 } from "lucide-react";

export default function CourseDetailView({
  skill,
  topics,
  contents,
}: {
  skill: Skill;
  topics: Topic[];
  contents: Content[];
}) {
  const teacher_id = skill.teacher_id ?? "";
  const [activeView, setActiveView] = useState<"roadmap" | "quiz" | "content">("roadmap");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingSkill, setDeletingSkill] = useState(false);
  const router = useRouter();
  const [parentId, setParentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefillTopic, setPrefillTopic] = useState<Topic | null>(null);
  const [isQuizModalOpen, setQuizModalOpen] = useState(false);
  const [quizTopic, setQuizTopic] = useState<Topic | null>(null);
  const [selectedQuizTopicId, setSelectedQuizTopicId] = useState<string>(topics[0]?.tpc_id ?? "");
  const [selectedContentTopicId, setSelectedContentTopicId] = useState<string>(topics[0]?.tpc_id ?? "");
  const [quizManagerVersion, setQuizManagerVersion] = useState(0);
  const hasRootTopic = topics.some((topic) => topic.parent_id === null);

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

  const closeQuizModal = () => {
    setQuizTopic(null);
    setQuizModalOpen(false);
  };

  const handleAddChildTopic = (topicId: string | null) => {
    setParentId(topicId);
    setPrefillTopic(null);
    setIsModalOpen(true);
  };

  const handlePreviewTopic = (topicId: string) => {
    router.push(`/skills/${skill.skl_id}/${topicId}`);
  };

  const handleAddQuizTopic = (topicId: string) => {
    const topic = topics.find((item) => item.tpc_id === topicId);
    if (topic) {
      setActiveView("quiz");
      setSelectedQuizTopicId(topicId);
      setQuizTopic(topic);
      setQuizModalOpen(true);
    }
  };

  const handleRemoveTopic = async (topicId: string) => {
    if (!window.confirm("Delete this item?")) return;

    if (topicId === skill.skl_id) {
      const deleteResult = await deleteSkill(skill.skl_id, skill.teacher_id ?? "");
      if ("error" in deleteResult && deleteResult.error) {
        console.error(deleteResult.error);
        return;
      }
      router.push("/teacher/skills");
      return;
    }

    const result = await deleteTopic(topicId, skill.skl_id);
    if ("error" in result && result.error) {
      console.error(result.error);
      return;
    }
    router.refresh();
  };

  const handleDeleteSkill = async () => {
    setDeletingSkill(true);
    const result = await deleteSkill(skill.skl_id, teacher_id);
    setDeletingSkill(false);
    if ("error" in result && result.error) {
      console.error(result.error);
      return;
    }
    router.push("/teacher/skills");
  };

  return (
    <div className="space-y-5">
      <SkillHeader
        data={skill}
        actions={
          <>
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/20 sm:w-auto"
            >
              <Pencil size={15} />
              Edit skill
            </button>
            <button
              type="button"
              onClick={() => setDeleteConfirmOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/20 sm:w-auto"
            >
              <Trash2 size={15} />
              Remove skill
            </button>
          </>
        }
      />

      <div className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-2 sm:p-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setActiveView("roadmap")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition sm:text-base ${
              activeView === "roadmap"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Roadmap studio
          </button>
          <button
            type="button"
            onClick={() => setActiveView("quiz")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition sm:text-base ${
              activeView === "quiz"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Quiz studio
          </button>
          <button
            type="button"
            onClick={() => setActiveView("content")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition sm:text-base ${
              activeView === "content"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Content studio
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-700 bg-slate-900/60">
        <section className={`${activeView === "roadmap" ? "block" : "hidden"} space-y-4 p-4 sm:p-6`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Roadmap studio</h2>
                <p className="text-sm text-slate-400">Build topic flow and attach quiz tasks directly from nodes.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => openTopicModal(null, false)}
                  disabled={hasRootTopic}
                  className="rounded-xl border border-orange-400/40 bg-orange-500/10 px-3 py-2 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add root
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView("quiz")}
                  className="rounded-xl border border-orange-400/40 bg-orange-500/10 px-3 py-2 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/20"
                >
                  Open quiz studio
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView("content")}
                  className="rounded-xl border border-orange-400/40 bg-orange-500/10 px-3 py-2 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/20"
                >
                  Open content studio
                </button>
              </div>
            </div>

            <RoadmapFlow
              topics={topics}
              forceUnlocked
              onAddChild={handleAddChildTopic}
              onPreviewTopic={handlePreviewTopic}
              onAddQuizTopic={handleAddQuizTopic}
              onRemoveTopic={handleRemoveTopic}
            />
        </section>

        <section className={`${activeView === "quiz" ? "block" : "hidden"} space-y-4 p-4 sm:p-6`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Quiz studio</h2>
                <p className="text-sm text-slate-400">Pick a topic and manage quiz items like a full page workspace.</p>
              </div>
              <button
                type="button"
                onClick={() => setQuizModalOpen(true)}
                disabled={!selectedQuizTopicId}
                className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add question
              </button>
            </div>

            <QuizManagerModal
              key={quizManagerVersion}
              skill={skill}
              topics={topics}
              selectedTopicId={selectedQuizTopicId}
              onSelectTopic={setSelectedQuizTopicId}
              onCreateQuestion={(topic) => {
                setSelectedQuizTopicId(topic.tpc_id);
                setQuizTopic(topic);
                setQuizModalOpen(true);
              }}
            />
        </section>

        <section className={`${activeView === "content" ? "block" : "hidden"} space-y-4 p-4 sm:p-6`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">Content studio</h2>
              <p className="text-sm text-slate-400">Manage topic content in a full-page workspace, similar to quiz studio.</p>
            </div>
          </div>

          <ContentManagerPanel
            skill={skill}
            topics={topics}
            selectedTopicId={selectedContentTopicId}
            onSelectTopic={setSelectedContentTopicId}
          />
        </section>
      </div>

      {deleteConfirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <h3 className="text-lg font-semibold text-white">Delete this skill?</h3>
            <p className="mt-2 text-sm text-slate-300">
              This removes the skill with all topics and quiz data. This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSkill}
                disabled={deletingSkill}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
              >
                {deletingSkill ? "Deleting..." : "Delete skill"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

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
            onClose={() => {
              closeQuizModal();
              setQuizManagerVersion((prev) => prev + 1);
            }}
          />
        ) : null
      ) : null}

      {editOpen && (
        <SkillFormModal teacher_id={teacher_id} editingSkill={skill} onClose={() => setEditOpen(false)} />
      )}
    </div>
  );
}
