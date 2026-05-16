"use server";

import { createClient as createAdminClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { headers } from "next/headers";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendPasswordResetEmail(email: string): Promise<{ error?: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Server configuration error." };
  }

  const admin = createAdminClient(supabaseUrl, serviceRoleKey);

  const headersList = await headers();
  const origin = headersList.get("origin") ?? "http://localhost:3000";
  const baseUrl = origin.startsWith("http") ? origin : `https://${origin}`;

  const { data, error: linkError } = await admin.auth.admin.generateLink({
    type: "recovery",
    email,
  });

  if (linkError || !data?.properties?.hashed_token) {
    console.error("[forgot-password] generateLink failed:", linkError?.message);
    return { error: "Could not generate reset link. Make sure the email is registered." };
  }

  // Build a direct link to our app — avoids Supabase's redirect which requires
  // the URL to be whitelisted. The reset page verifies the token itself.
  const resetUrl = `${baseUrl}/reset-password?token_hash=${data.properties.hashed_token}&type=recovery`;

  try {
    await transporter.sendMail({
      from: `"Lumina" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Reset your Lumina password",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
          <h1 style="color:#f97316;">Lumina</h1>
          <h2 style="color:#fff;background:#0f172a;padding:16px;border-radius:8px;margin:0;">
            Password Reset
          </h2>
          <p style="color:#374151;font-size:16px;margin-top:16px;">
            A password reset was requested for <strong>${email}</strong>.
            Click the button below to set a new password.
          </p>
          <a
            href="${resetUrl}"
            style="display:inline-block;background:#f97316;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:16px;font-weight:bold;margin-top:16px;"
          >
            Reset Password →
          </a>
          <p style="color:#6b7280;font-size:13px;margin-top:24px;">
            This link expires in 1 hour. If you didn't request this, you can ignore this email.
          </p>
        </div>
      `,
    });
  } catch (sendError) {
    console.error("[forgot-password] Gmail SMTP failed:", sendError);
    return { error: "Failed to send reset email. Please try again." };
  }

  return {};
}
