import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ContentType } from "@/lib/database.types";

const ALLOWED_TYPES: ContentType[] = ["video", "docs", "mindmap", "audio", "pdf"];

const isValidType = (value: string): value is ContentType =>
  ALLOWED_TYPES.includes(value as ContentType);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const topicId = url.searchParams.get("topicId");

  if (!topicId) {
    return NextResponse.json({ error: "Missing topicId" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Content")
    .select("cntnt_id,cntnt_title,cntnt_type,cntnt_value")
    .eq("tpc_id", topicId)
    .order("cntnt_title", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    contents: (data ?? []).map((row) => ({
      id: row.cntnt_id,
      title: row.cntnt_title,
      type: row.cntnt_type,
      value: row.cntnt_value,
    })),
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const topicId = body?.topicId as string | undefined;
  const skillId = body?.skillId as string | undefined;
  const title = body?.title as string | undefined;
  const type = body?.type as string | undefined;
  const value = body?.value as string | undefined;

  if (!topicId || !title || !type || !value) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!isValidType(type)) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Content")
    .insert({
      cntnt_id: crypto.randomUUID(),
      cntnt_title: title.trim(),
      cntnt_type: type,
      cntnt_value: value.trim(),
      tpc_id: topicId,
    })
    .select("cntnt_id,cntnt_title,cntnt_type,cntnt_value")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (skillId) revalidatePath(`/teacher/skills/${skillId}`);

  return NextResponse.json({
    content: {
      id: data.cntnt_id,
      title: data.cntnt_title,
      type: data.cntnt_type,
      value: data.cntnt_value,
    },
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const contentId = body?.contentId as string | undefined;
  const skillId = body?.skillId as string | undefined;
  const title = body?.title as string | undefined;
  const type = body?.type as string | undefined;
  const value = body?.value as string | undefined;

  if (!contentId || !title || !type || !value) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!isValidType(type)) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Content")
    .update({
      cntnt_title: title.trim(),
      cntnt_type: type,
      cntnt_value: value.trim(),
    })
    .eq("cntnt_id", contentId)
    .select("cntnt_id,cntnt_title,cntnt_type,cntnt_value")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (skillId) revalidatePath(`/teacher/skills/${skillId}`);

  return NextResponse.json({
    content: {
      id: data.cntnt_id,
      title: data.cntnt_title,
      type: data.cntnt_type,
      value: data.cntnt_value,
    },
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const contentId = body?.contentId as string | undefined;
  const skillId = body?.skillId as string | undefined;

  if (!contentId) {
    return NextResponse.json({ error: "Missing contentId" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("Content").delete().eq("cntnt_id", contentId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (skillId) revalidatePath(`/teacher/skills/${skillId}`);

  return NextResponse.json({ ok: true });
}
