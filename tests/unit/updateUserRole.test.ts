import { describe, test, expect, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    auth: {
      getUser: vi.fn(async () => ({
        data: {
          user: { id: "123", app_metadata: { role: "student" } }, // fake logged user
        },
      })),
    },
    from: vi.fn(() => ({ insert: vi.fn(async () => ({ error: null })) })),
  })),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    auth: {
      admin: {
        updateUserById: vi.fn(async () => ({ error: null })),
      },
    },
  })),
}));

import { updateUserRole } from "@/features/users/actions/updateUserRole";

describe("updateUserRole", () => {
  test("non admin cannot promote user", async () => {
    await expect(updateUserRole("456", "teacher")).rejects.toThrow("not authorized");
  });
});
