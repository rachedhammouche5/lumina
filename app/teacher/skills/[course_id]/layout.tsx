export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-slate-950">
      <div className="mx-auto w-full max-w-[1536px] px-4 py-4 md:px-8 sm:py-6">{children}</div>
    </div>
  );
}