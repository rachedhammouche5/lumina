import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { readFile } from "fs/promises";
import path from "path";

const STORAGE_BUCKET = "content-files";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const contentPath = req.nextUrl.searchParams.get("path");
  if (!contentPath) {
    return new NextResponse("Missing path parameter", { status: 400 });
  }

  try {
    // ── Local file (stored in public/uploads/) ────────────────────────────────
    if (contentPath.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", contentPath);
      const fileBuffer = await readFile(filePath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "inline",
          "Cache-Control": "private, max-age=3600",
        },
      });
    }

    // ── Supabase Storage URL ──────────────────────────────────────────────────
    const supabasePrefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/`;
    if (contentPath.startsWith(supabasePrefix)) {
      const storagePath = contentPath.slice(supabasePrefix.length);
      const admin = createAdminClient();

      const { data, error } = await admin.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(storagePath, 300); // 5-minute signed URL

      if (error || !data?.signedUrl) {
        return new NextResponse("Could not access file", { status: 502 });
      }

      const upstream = await fetch(data.signedUrl);
      const blob = await upstream.arrayBuffer();

      return new NextResponse(blob, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "inline",
          "Cache-Control": "private, max-age=300",
        },
      });
    }

    return new NextResponse("Unsupported file location", { status: 400 });
  } catch (err) {
    console.error("[/api/pdf]", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
