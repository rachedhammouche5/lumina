export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  currentSkill: string;
  weakPoints: { topic: string; skill: string; score: number }[];
  strongPoints: { topic: string; skill: string; score: number }[];
  streak: number;
}

export interface ScoreWithTopic {
  score: number;
  tpc_id: string;
  Topic: {
    tpc_title: string;
    Skill: { skl_title: string }[];
  };
}

export const DEFAULT_PROFILE: UserProfile = {
  name: "Student",
  currentSkill: "",
  weakPoints: [],
  strongPoints: [],
  streak: 0,
};
