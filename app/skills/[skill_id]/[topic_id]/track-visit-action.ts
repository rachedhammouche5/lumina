"use server";
import { cookies } from "next/headers";

export async function recordLastVisit(skillId: string, topicId: string) {
  const store = await cookies();
  store.set("lumina_last_visit", JSON.stringify({ skillId, topicId }), {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
}
