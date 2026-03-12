import Link from "next/link";
import AddCourseForm from "./AddCourseForm";

export default async function TeacherCoursesPage() {
//   const courses = await getCourses();
const courses = [
  {
    "id": "course-101",
    "title": "Introduction to Algebra",
    "description": "Core algebraic concepts with guided practice.",
    "duration": "6 weeks"
  },
  {
    "id": "course-102",
    "title": "World History Essentials",
    "description": "A timeline-based overview from ancient to modern eras.",
    "duration": "8 weeks"
  },
  {
    "id": "course-103",
    "title": "Fundamentals of Biology",
    "description": "Cell biology, genetics, and ecosystems for beginners.",
    "duration": "10 weeks"
  }
]

  return (
    <div className="space-y-6">
      <AddCourseForm />

      <div className="space-y-2">
        <p className="text-slate-300">Manage your existing courses here.</p>
      </div>

      <ul className="space-y-3">
        {courses.map((course) => (
          <li key={course.id}>
            <Link
              href={`/teacher/courses/${course.id}`}
              className="block rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 transition hover:border-indigo-400 hover:bg-slate-700"
            >
              <p className="font-semibold text-white">{course.title}</p>
              <p className="text-sm text-slate-300">{course.description}</p>
              <p className="mt-1 text-xs text-slate-400">Duration: {course.duration}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
