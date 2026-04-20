import { streamTutorResponse } from "@/lib/ai/tutor";

function getErrorStatus(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
  ) {
    return error.status;
  }

  return 500;
}

function getErrorMessage(error: unknown, status: number) {
  if (status === 429) {
    return "The AI tutor is temporarily unavailable because the Gemini API quota has been exceeded. Please try again later or use a Gemini API key with available quota.";
  }

  return error instanceof Error ? error.message : "Internal server error";
}

export async function POST(req: Request) {
  const { messages, systemPrompt, skillId } = await req.json();

  // Validate
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "Invalid messages" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const tutorResponse = await streamTutorResponse({
      messages,
      systemPrompt,
      skillId: typeof skillId === "string" && skillId.length > 0 ? skillId : null,
    });

    const encoder = new TextEncoder();
    const encodePayload = (payload: unknown) =>
      encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);

    const readable = new ReadableStream({
      async start(controller) {
        try {
          controller.enqueue(
            encodePayload({
              meta: {
                mode: tutorResponse.mode,
                notice: tutorResponse.notice,
                model: tutorResponse.model,
                chunkCount: tutorResponse.chunks.length,
              },
            }),
          );

          if (tutorResponse.mode === "retrieval_fallback") {
            controller.enqueue(
              encodePayload({
                delta: {
                  text: tutorResponse.text,
                },
              }),
            );
          } else {
            for await (const chunk of tutorResponse.streamResult.stream) {
              const text = chunk.text();

              if (text) {
                controller.enqueue(
                  encodePayload({
                    delta: { text },
                  }),
                );
              }
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    const status = getErrorStatus(error);
    const errorMessage = getErrorMessage(error, status);

    console.error("AI Tutor API error:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status, headers: { "Content-Type": "application/json" } }
    );
  }
}
