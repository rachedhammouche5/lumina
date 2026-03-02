import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";



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
  const role = user?.app_metadata?.role ?? user?.user_metadata?.role;
  const isStudentRoute = req.nextUrl.pathname.startsWith("/student");
  const isHeroPage = req.nextUrl.pathname === "/";

  if (isStudentRoute) {
    if (!user || role !== "student") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (isHeroPage && user && role === "student") {
    return NextResponse.redirect(new URL("/student", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/student/:path*"],
};
