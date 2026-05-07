import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import FeynmanClient from "./FeynmanClient";

export default async function FeynmanPage({
  params,
}: {
  params: Promise<{ skill_id: string; topic_id: string }>;
}) {
  const { skill_id, topic_id } = await params;
  const supabase = await createClient();

  const [
    { data: topic },
    { data: skill },
    { data: { user } },
  ] = await Promise.all([
    supabase.from("Topic").select("tpc_title, tpc_description").eq("tpc_id", topic_id).single(),
    supabase.from("Skill").select("skl_title").eq("skl_id", skill_id).single(),
    supabase.auth.getUser(),
  ]);

  if (!topic || !skill) notFound();
  if (!user) redirect(`/login`);

  return (
    <FeynmanClient
      topicId={topic_id}
      skillId={skill_id}
      topicTitle={topic.tpc_title}
      topicDescription={topic.tpc_description ?? ""}
      skillTitle={skill.skl_title}
    />
  );
}
