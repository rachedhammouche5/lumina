import { beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createAdminClient: vi.fn(),
  embedText: vi.fn(),
  rpc: vi.fn(),
  from: vi.fn(),
  select: vi.fn(),
  not: vi.fn(),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: mocks.createAdminClient,
}));

vi.mock("@/lib/ai/embed", () => ({
  embedText: mocks.embedText,
}));

import { fetchChunks } from "@/lib/ai/fetch-chunks";

describe("fetchChunks", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    mocks.embedText.mockResolvedValue([1, 0]);
    mocks.select.mockReturnValue({ not: mocks.not });
    mocks.from.mockReturnValue({ select: mocks.select });
    mocks.createAdminClient.mockReturnValue({
      rpc: mocks.rpc,
      from: mocks.from,
    });
  });

  test("returns RPC matches when the database function succeeds", async () => {
    mocks.rpc.mockResolvedValue({
      data: [{ id: "rpc-1", chunk_text: "Matched by RPC" }],
      error: null,
    });

    const result = await fetchChunks("What is in my course?");

    expect(result).toEqual([{ id: "rpc-1", chunk_text: "Matched by RPC" }]);
    expect(mocks.from).not.toHaveBeenCalled();
  });

  test("falls back to ranking stored embeddings when RPC returns no rows", async () => {
    mocks.rpc.mockResolvedValue({ data: [], error: null });
    mocks.not.mockResolvedValue({
      data: [
        {
          id: "chunk-a",
          chunk_text: "Best match",
          embedding: "[1, 0]",
          metadata: null,
        },
        {
          id: "chunk-b",
          chunk_text: "Second match",
          embedding: "[0.5, 0.5]",
          metadata: null,
        },
      ],
      error: null,
    });

    const result = await fetchChunks("What is in my course?", { topK: 1 });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: "chunk-a",
      chunk_text: "Best match",
    });
    expect(mocks.rpc).toHaveBeenCalledTimes(4);
    expect(mocks.from).toHaveBeenCalledWith("content_chunks");
  });
});
