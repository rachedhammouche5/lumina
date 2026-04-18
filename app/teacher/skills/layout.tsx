import SkillSideBar from "@/app/ui/SkillSideBar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen min-h-screen flex flex-row pt-6">
        <div className="w-[25vw] shrink-0">
            <SkillSideBar />
        </div>
        <div>
            {children}
        </div>
    </div>
  );
}