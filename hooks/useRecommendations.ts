"use client";

import { useEffect, useState } from "react";

export type Recommendation = {
  skillId: string;
  skillName: string;
  relevanceScore: number;
  reason: string;
  image: string | null;
  description: string;
};

type Result = {
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
};

export function useRecommendations(userId: string | null): Result {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/recommendations?userId=${encodeURIComponent(userId)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        return res.json();
      })
      .then((data: { recommendations?: Recommendation[]; error?: string }) => {
        if (cancelled) return;
        if (data.error) throw new Error(data.error);
        setRecommendations(data.recommendations ?? []);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { recommendations, loading, error };
}
