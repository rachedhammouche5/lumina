import SkillSideBar from "@/app/ui/SkillSideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full pt-6 pb-20 lg:pb-0">
      <div className="mx-auto flex w-full max-w-[1536px] flex-col px-4 md:px-8 lg:flex-row lg:gap-6">
        <aside className="hidden w-72 shrink-0 lg:sticky lg:top-24 lg:block lg:self-start">
          <SkillSideBar />
        </aside>
        <div className="w-full min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}