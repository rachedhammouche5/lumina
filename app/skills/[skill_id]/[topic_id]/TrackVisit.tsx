"use client";
import { useEffect } from "react";
import { recordLastVisit } from "./track-visit-action";

export default function TrackVisit({
  skillId,
  topicId,
}: {
  skillId: string;
  topicId: string;
}) {
  useEffect(() => {
    recordLastVisit(skillId, topicId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
