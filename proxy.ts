import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getRole } from "@/features/utils/auth/getRole";

export async function proxy(req: NextRequest) {
  let response = NextResponse.next({ request: req });

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
    role === "teacher"
      ? "/teacher"
      : role === "student"
        ? "/student"
        : role === "admin"
          ? "/admin"
          : "/";

  const isStudentRoute = req.nextUrl.pathname.startsWith("/student");
  const isHeroPage = req.nextUrl.pathname === "/";
  const isTeacherRoute = req.nextUrl.pathname.startsWith("/teacher");
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAuthPage =
    req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup";


  if (isStudentRoute) {
    if (!user || role !== "student") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (isTeacherRoute && role !== "teacher") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isHeroPage && user && role === "teacher") {
    return NextResponse.redirect(new URL("/teacher", req.url));
  }

  if (isHeroPage && user && role === "student") {
    return NextResponse.redirect(new URL("/student", req.url));
  }

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if(isAuthPage && user){
    return NextResponse.redirect(new URL(dashboardPath,req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/student/:path*",
    "/teacher/:path*",
    "/admin/:path*",
  ],
};
