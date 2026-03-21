import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getRole } from "@/features/utils/auth/getRole";

export async function proxy(req: NextRequest) {
  const response = NextResponse.next({ request: req });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = getRole(user);
  const dashboardPath =
    role === "teacher" || role === "teacher_pending"
      ? "/teacher"
      : role === "student"
        ? `/${user?.id ?? ""}`
        : role === "admin"
          ? "/admin"
          : "/";

  const { pathname } = req.nextUrl;
  const isHeroPage = pathname === "/";
  const isTeacherRoute = pathname.startsWith("/teacher");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isTeacherApplyRoute = pathname === "/teacher/apply";

  if (isAuthPage && user) {
    return NextResponse.redirect(new URL(dashboardPath, req.url));
  }

  if (
    isTeacherRoute &&
    !isTeacherApplyRoute &&
    role !== "teacher" &&
    role !== "teacher_pending"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isTeacherApplyRoute && !user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isHeroPage && user && role === "student") {
    return NextResponse.redirect(new URL(`/${user.id}`, req.url));
  }

  if (isHeroPage && user && (role === "teacher" || role === "teacher_pending")) {
    return NextResponse.redirect(new URL("/teacher", req.url));
  }

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/login", "/signup", "/teacher/:path*", "/admin/:path*"],
};
