"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveQuizScore, generateHint, updateStreak } from "./actions";
import {
  buildPool, removeFromPool, pickQuestion,
  nextDifficulty, calcPoints, calcSessionStats,
  SESSION_LENGTH, TIME_LIMIT,
} from "./quiz.lib";
import type { QuizWithResponses, AnswerRecord, QuestionPool, QuizPhase, QResponse, Difficulty } from "./quiz.types";

import IntroScreen from "./quizComponents/IntroScreen";
import QuestionCard from "./quizComponents/QuestionCard";
import FeedbackBar from "./quizComponents/FeedBackBar";
import ResultsScreen from "./quizComponents/ResultScreen";
import SessionProgress from "./quizComponents/SessionProgress";
import { completeSkill } from "@/app/features/skill/completeSkill";
import { triggerStreakCelebration } from "@/app/features/streak/StreakCelebration";

type Props = {
  questions: QuizWithResponses[];
  topicTitle: string;
  topicId: string;
  skillId: string;
};

export default function QuizClient({ questions, topicTitle, topicId, skillId }: Props) {
  const router = useRouter();

  // ── Session state ────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [currentQuestion, setCurrentQuestion] = useState<QuizWithResponses | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>("medium");
  const [pool, setPool] = useState<QuestionPool>(buildPool(questions));
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [questionsServed, setQuestionsServed] = useState(0);

  // ── Per-question state ───────────────────────────────────────────────────
  const [selectedResponse, setSelectedResponse] = useState<QResponse | null>(null);
  const [timer, setTimer] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintText, setHintText] = useState<string | null>(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionStartTime = useRef(0);

  // ── Timer ────────────────────────────────────────────────────────────────

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    setTimer(0);
    questionStartTime.current = Date.now();
    timerRef.current = setInterval(() => {
      setTimer(Math.floor((Date.now() - questionStartTime.current) / 1000));
    }, 1000);
  }, [stopTimer]);

  useEffect(() => () => stopTimer(), [stopTimer]);

  // ── Helpers ──────────────────────────────────────────────────────────────

  function serveQuestion(q: QuizWithResponses, currentPool: QuestionPool) {
    setPool(removeFromPool(q, currentPool));
    setCurrentQuestion(q);
    setCurrentDifficulty(q.difficulty);
    setSelectedResponse(null);
    setHintUsed(false);
    setHintText(null);
    setPhase("question");
    startTimer();
  }

  async function finishSession(finalAnswers: AnswerRecord[]) {
    setSaving(true);
    const { totalPoints, totalTime } = calcSessionStats(finalAnswers);
    await saveQuizScore(topicId, skillId, totalPoints, totalTime);
    const streakResult = await updateStreak();
    if (streakResult) {
      triggerStreakCelebration({
        previous: streakResult.previous,
        current: streakResult.current,
      });
    }
    await completeSkill(topicId, skillId);
    setSaving(false);
    setPhase("results");
  }

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleStart() {
    const freshPool = buildPool(questions);
    const q = pickQuestion("medium", freshPool);
    if (!q) return;
    setAnswers([]);
    setQuestionsServed(1);
    serveQuestion(q, freshPool);
  }

  function handleSelect(response: QResponse) {
    if (phase !== "question" || !currentQuestion) return;
    stopTimer();

    const timeTaken = Math.floor((Date.now() - questionStartTime.current) / 1000);
    const fast = timeTaken <= TIME_LIMIT;
    const correct = response.isCorrect;
    const points = calcPoints(currentQuestion, correct, fast, hintUsed);

    const record: AnswerRecord = {
      question: currentQuestion,
      chosen: response,
      timeTaken,
      hintUsed,
      pointsEarned: points,
    };

    setSelectedResponse(response);
    setAnswers((prev) => [...prev, record]);
    setPhase("feedback");
  }

  async function handleNext() {
    const updatedAnswers = answers; // already includes last answer from handleSelect
    const isLast = questionsServed >= SESSION_LENGTH;

    if (isLast) {
      await finishSession(updatedAnswers);
      return;
    }

    const last = updatedAnswers[updatedAnswers.length - 1];
    const fast = last.timeTaken <= TIME_LIMIT;
    const correct = last.chosen?.isCorrect ?? false;

    const nextDiff = nextDifficulty(currentDifficulty, correct, fast, last.hintUsed, pool);
    const nextQ = pickQuestion(nextDiff, pool);

    if (!nextQ) {
      await finishSession(updatedAnswers);
      return;
    }

    setQuestionsServed((n) => n + 1);
    serveQuestion(nextQ, pool);
  }

  async function handleHint() {
    if (hintUsed || hintLoading || !currentQuestion) return;
    setHintUsed(true);
    setHintLoading(true);
    const result = await generateHint(currentQuestion.question);
    setHintText("hint" in result ? result.hint : "Think about the core concept this question is testing.");
    setHintLoading(false);
  }

  // ── Derived ──────────────────────────────────────────────────────────────

  const { totalPoints } = calcSessionStats(answers);

  // ── Render ───────────────────────────────────────────────────────────────

  if (phase === "intro")
    return <IntroScreen topicTitle={topicTitle} questions={questions} onStart={handleStart} />;

  if (phase === "results")
    return (
      <ResultsScreen
        answers={answers}
        skillId={skillId}
        onGoRoadmap={() => router.push(`/skills/${skillId}`)}
        onGoDashboard={() => router.push("/student/dashboard")}
      />
    );

  if (!currentQuestion) return null;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">

        <SessionProgress
          questionsServed={questionsServed}
          totalPoints={totalPoints}
          currentDifficulty={currentDifficulty}
        />
        <QuestionCard
          question={currentQuestion}
          phase={phase}
          timer={timer}
          selectedResponse={selectedResponse}
          hintUsed={hintUsed}
          hintLoading={hintLoading}
          hintText={hintText}
          onSelect={handleSelect}
          onHint={handleHint}
        />

        {phase === "feedback" && answers.length > 0 && (
          <FeedbackBar
            lastAnswer={answers[answers.length - 1]}
            isLastQuestion={questionsServed >= SESSION_LENGTH}
            saving={saving}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}
