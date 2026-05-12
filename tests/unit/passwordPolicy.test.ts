import { describe, expect, test } from "vitest";
import { validateStrongPassword } from "@/app/ui/auth/passwordPolicy";

describe("validateStrongPassword", () => {
  test("rejects passwords shorter than 8 characters", () => {
    expect(validateStrongPassword("Ab1!x")).toBe("Password must be at least 8 characters long.");
  });

  test("rejects passwords missing complexity", () => {
    expect(validateStrongPassword("abcdefgh")).toBe("Password must include at least one uppercase letter.");
    expect(validateStrongPassword("ABCDEFGH")).toBe("Password must include at least one lowercase letter.");
    expect(validateStrongPassword("Abcdefgh")).toBe("Password must include at least one number.");
    expect(validateStrongPassword("Abcdefg1")).toBe("Password must include at least one special character.");
  });

  test("accepts a strong password", () => {
    expect(validateStrongPassword("Abcdef1!")).toBeNull();
  });
});
