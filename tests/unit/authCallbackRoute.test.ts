import { beforeEach, describe, expect, test, vi } from "vitest";
import type { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  createServerClient: vi.fn(),
  createAdminClient: vi.fn(),
  exchangeCodeForSession: vi.fn(),
  getUser: vi.fn(),
  updateUserById: vi.fn(),
  from: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: mocks.createServerClient,
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: mocks.createAdminClient,
}));

import { GET } from "@/app/auth/callback/route";

describe("GET /auth/callback", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});

    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";

    mocks.createServerClient.mockResolvedValue({
      from: vi.fn(() => ({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        }),
      })),
      auth: {
        exchangeCodeForSession: mocks.exchangeCodeForSession,
        getUser: mocks.getUser,
      },
    });

    mocks.createAdminClient.mockReturnValue({
      from: mocks.from,
      auth: {
        admin: {
          updateUserById: mocks.updateUserById,
        },
      },
    });

    mocks.exchangeCodeForSession.mockResolvedValue({ error: null });
    mocks.updateUserById.mockResolvedValue({ error: null });
    mocks.from.mockReturnValue({
      upsert: vi.fn().mockResolvedValue({ error: null }),
      delete: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      }),
    });
  });

  test("redirects to login when callback has no code", async () => {
    const response = await GET(
      new Request("http://localhost:3000/auth/callback") as NextRequest,
    );

    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/login?error=missing_oauth_code",
    );
    expect(mocks.exchangeCodeForSession).not.toHaveBeenCalled();
    expect(mocks.getUser).not.toHaveBeenCalled();
  });

  test("auto-assigns student role for new OAuth user without role", async () => {
    mocks.getUser.mockResolvedValue({
      data: {
        user: {
          id: "user-1",
          app_metadata: {},
        },
      },
    });

    const response = await GET(
      new Request(
        "http://localhost:3000/auth/callback?code=test-code",
      ) as NextRequest,
    );

    expect(mocks.exchangeCodeForSession).toHaveBeenCalledWith("test-code");
    expect(mocks.createAdminClient).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "service-role-key",
    );
    expect(mocks.updateUserById).toHaveBeenCalledWith("user-1", {
      app_metadata: { role: "student" },
    });
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/student",
    );
  });

  test("routes a teacher signup to the application page when wants_teacher is stored in metadata", async () => {
    mocks.getUser.mockResolvedValue({
      data: {
        user: {
          id: "user-3",
          app_metadata: {},
          user_metadata: { wants_teacher: true },
        },
      },
    });

    const response = await GET(
      new Request(
        "http://localhost:3000/auth/callback?code=test-code",
      ) as NextRequest,
    );

    expect(mocks.updateUserById).toHaveBeenCalledWith("user-3", {
      app_metadata: { role: "teacher_pending" },
    });
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/teacher/apply",
    );
  });

  test.each([
    { role: "teacher", destination: "/teacher" },
    { role: "admin", destination: "/admin" },
  ])(
    "redirects existing $role user to $destination",
    async ({ role, destination }) => {
      mocks.getUser.mockResolvedValue({
        data: {
          user: {
            id: "user-2",
            app_metadata: { role },
          },
        },
      });

      const response = await GET(
        new Request(
          "http://localhost:3000/auth/callback?code=test-code",
        ) as NextRequest,
      );

      expect(mocks.updateUserById).not.toHaveBeenCalled();
      expect(response.headers.get("location")).toBe(
        `http://localhost:3000${destination}`,
      );
    },
  );
});
