import { createClient } from "@/lib/supabase/server";
import CourseDetailView from "./CourseDetailView";
import { Course, Topic, TopicContent } from "./Types";

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("Skill")
    .select("*")
    .eq("skl_id", params.courseId)
    .single();
  const { data: topics } = await supabase
    .from("Topic")
    .select("*")
    .eq("skill_id", params.courseId);
  const { data: contents } = await supabase
    .from("Content")
    .select("*")
    .in("tpc_id", topics?.map((topic) => topic.id) ?? []);

  return (
    <CourseDetailView
      course={course as Course}
      topics={topics as Topic[]}
      contents={contents as TopicContent[]}
    />
  );
}

//   const course = {
//     "id": "course-101",
//     "title": "Introduction to Algebra",
//     "description": "Core algebraic concepts with guided practice.",
//     "duration": "6 weeks"
//   };

//   const topics: Topic[] = [
//   {
//     "id": "topic-1",
//     "courseId": "course-101",
//     "title": "Variables and Expressions",
//     "description": "Understand variables, constants, and algebraic expressions.",
//     "parentId": null
//   },
//   {
//     "id": "topic-2",
//     "courseId": "course-101",
//     "title": "Simplifying Expressions",
//     "description": "Use arithmetic rules to simplify expressions.",
//     "parentId": "topic-1"
//   },
//   {
//     "id": "topic-3",
//     "courseId": "course-101",
//     "title": "Linear Equations",
//     "description": "Solve one-variable linear equations.",
//     "parentId": null
//   },
//   {
//     "id": "topic-4",
//     "courseId": "course-102",
//     "title": "Ancient Civilizations",
//     "description": "Explore early civilizations and their innovations.",
//     "parentId": null
//   },
//   {
//     "id": "topic-5",
//     "courseId": "course-103",
//     "title": "Cell Structure",
//     "description": "Identify and explain core parts of cells.",
//     "parentId": null
//   }
// ]
// ;
// const contents : TopicContent[] = [
//   {
//     id: "content-1",
//     topicId: "topic-1",
//     type: "video_url",
//     value: "https://youtube.com/watch?v=abc123"
//   },
//   {
//     id: "content-2",
//     topicId: "topic-1",
//     type: "doc_url",
//     value: "https://docs.example.com/variables"
//   },
//   {
//     id: "content-3",
//     topicId: "topic-2",
//     type: "pdf_file",
//     value: "simplifying_expressions.pdf"
//   },
//   {
//     id: "content-4",
//     topicId: "topic-2",
//     type: "video_url",
//     value: "https://youtube.com/watch?v=xyz456"
//   },
//   {
//     id: "content-5",
//     topicId: "topic-3",
//     type: "audio_file",
//     value: "linear_equations_lecture.mp3"
//   },
//   {
//     id: "content-6",
//     topicId: "topic-3",
//     type: "doc_url",
//     value: "https://docs.example.com/linear-equations"
//   },
// ];
