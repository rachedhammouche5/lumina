import { Sparkles, Search } from "lucide-react";
import Button from "../ui/Button";
import CourseCard from "../ui/CourseCard";

export default function GuestDomain() {
    return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center pt-24 px-6">
        <div className="flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 rounded-full mb-2">
            <Sparkles className="text-orange-500" size={16}/>
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">LEARN SMARTER</span>
        </div>

        <div className="text-4xl md:text-5xl font-bold text-center mb-10">
            <h1 className="text-white tracking-tight">What will you <span className="uppercase  bg-gradient-to-br from-[#FF4D00] to-[#FFB800] bg-clip-text text-transparent">Master</span> today ?</h1>
        </div>
        <div className="relative w-full max-w-2xl mb-12 group ">
            <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500"/>
            <div className="relative flex items-center bg-slate-900/50 backdrop-blur-xl border border-white/10 p-2 rounded-3xl shadow-2xl">
                <div className="flex items-center justify-center w-12 h-12 ml-2 bg-slate-800/50 rounded-2xl">
                    <Search className="text-orange-500" size={20} />
                </div>
                <input type="text" placeholder="Search for skills eg: How to write a clean code ... " className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-slate-500 outline-none text-lg" />
                <Button variant="primary" size="m" className="mr-2"> Explore    </Button>
            </div> 
        </div>

        <div className="relative w-full max-w-4xl mb-12">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient from-slate-950 to to-transparent z-10 pointer-events-none" />
            <div className="flex overflow-x-auto gap-3 no-scroll-bar pb-4 px-12 mask-fade-edges [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <button className="whitespace-nowrap px-8 py-2.5 rounded-2xl text-sm font-bold bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
                    All Paths
                </button>
                {[
            'Clean Code Writing', 
            'Unit & Integration Testing', 
            'Frontend Architecture', 
            'Backend Systems', 
            'DevOps & Deployment',
            'Data Structures',
            'Mobile Engineering',
            'UI/UX Design Systems'
        ].map((category) => (
            <button 
                key={category} 
                className="whitespace-nowrap px-8 py-2.5 rounded-2xl text-sm font-medium text-slate-400 bg-slate-900/60 border border-white/5 hover:border-orange-500/30 hover:text-white transition-all"
            >
                {category}
            </button>
        ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mb-10">
            <CourseCard 
            title="Modern React Patterns"
            description="Master Compound Components, Render Props, and High-Order Components for reusable UI."
            />

            <CourseCard 
            title="Next.js App Router Deep-Dive"
            description="Understand Server Components, Suspense, and Parallel Routing for high-performance apps."
            />

            <CourseCard 
            title="State Management Systems"
            description="When to use Zustand, TanStack Query (React Query), or Context API efficiently."
            />

            <CourseCard 
            title="PostgreSQL & Supabase Mastery"
            description="Master Row Level Security (RLS), Database Functions, and Real-time subscriptions."
            />

            <CourseCard 
            title="API Design & Documentation"
            description="Build type-safe APIs with tRPC or REST, and document them using Swagger/OpenAPI."
            />

            <CourseCard 
            title="Distributed Systems Basics"
            description="Learn about Caching (Redis), Message Queues, and Horizontal Scaling."
            />

            <CourseCard 
            title="Prompt Engineering for Devs"
            description="Learn how to communicate with LLMs to generate production-ready code and logic."
            />

            <CourseCard 
            title="Vector Databases & RAG"
            description="How to store embeddings and build an AI that knows your specific project data."
            />

            <CourseCard 
            title="AI Agent Orchestration"
            description="Building autonomous agents that can perform tasks, not just answer questions."
            />

            <CourseCard 
            title="Docker & Containerization"
            description="Package your applications to run everywhere seamlessly with Docker and Compose."
            />

            <CourseCard 
            title="CI/CD Pipelines"
            description="Automate your testing and deployment using GitHub Actions or GitLab CI."
            />
        </div>
    </div>
    );
}