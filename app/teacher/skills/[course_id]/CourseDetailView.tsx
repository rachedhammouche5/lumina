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
    setActiveView("content");
    setSelectedContentTopicId(topicId);
  };

  const handleAddQuizTopic = (topicId: string) => {
    const topic = topics.find((item) => item.tpc_id === topicId);
    if (topic) {
      setActiveView("quiz");
      setSelectedQuizTopicId(topicId);
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
    <div className="space-y-6">
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

      <div className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-2 shadow-2xl shadow-black/20 sm:p-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setActiveView("roadmap")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition sm:text-base ${
              activeView === "roadmap"
                ? "bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/30"
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
                ? "bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/30"
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
                ? "bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Content studio
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-700 bg-slate-900/60 shadow-2xl shadow-black/20">
        <section className={`${activeView === "roadmap" ? "block" : "hidden"} space-y-5 p-4 sm:p-6`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-orange-300">Roadmap studio</p>
              <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">Shape the learning path</h2>
              <p className="mt-1 text-sm text-slate-400">Add child topics, manage the selected topic, or jump to quiz editing from any node.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => openTopicModal(null, false)}
                disabled={hasRootTopic}
                className="inline-flex items-center justify-center rounded-xl border border-orange-400/40 bg-orange-500/10 px-3 py-2 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add root
              </button>
              <button
                type="button"
                onClick={() => setActiveView("quiz")}
                className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
              >
                Open quiz studio
              </button>
              <button
                type="button"
                onClick={() => setActiveView("content")}
                className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
              >
                Open topic studio
              </button>
            </div>
          </div>

          <RoadmapFlow
            topics={topics}
            forceUnlocked
            onAddChild={handleAddChildTopic}
            onManageTopic={handlePreviewTopic}
            onModifyQuizTopic={handleAddQuizTopic}
            onRemoveTopic={handleRemoveTopic}
          />
        </section>

        <section className={`${activeView === "quiz" ? "block" : "hidden"} space-y-5 p-4 sm:p-6`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-orange-300">Quiz studio</p>
              <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">Modify questions by topic</h2>
              <p className="mt-1 text-sm text-slate-400">Select a topic, then add or remove questions without losing the selected context.</p>
            </div>
            <button
              type="button"
              onClick={() => setQuizModalOpen(true)}
              disabled={!selectedQuizTopicId}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-400 hover:to-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
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

        <section className={`${activeView === "content" ? "block" : "hidden"} space-y-5 p-4 sm:p-6`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-orange-300">Topic studio</p>
              <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">Manage topic content</h2>
              <p className="mt-1 text-sm text-slate-400">The selected topic stays active so you can edit content without hunting for it again.</p>
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
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-black/50">
            <p className="text-xs uppercase tracking-[0.24em] text-orange-300">Danger zone</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Delete this skill?</h3>
            <p className="mt-2 text-sm text-slate-300">
              This removes the skill with all topics and quiz data. This action cannot be undone.
            </p>
            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-600 px-4 text-sm text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSkill}
                disabled={deletingSkill}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
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
