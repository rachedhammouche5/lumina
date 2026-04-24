// lib/notify-students.ts
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server'; // adjust to your path

const resend = new Resend(process.env.RESEND_API_KEY);

export async function notifyStudents({
  skl_id,
  skl_title,
  teacher_name,
}: {
  skl_id: string;
  skl_title: string;
  teacher_name: string;
}) {
  const supabase = await createClient();

  // Fetch all students with notifications enabled
  const { data: students, error } = await supabase
    .from('Student')
    .select('std_email, std_fullname')
    .eq('email_notifications_enabled', true);

  if (error) {
    console.error('[notifyStudents] Failed to fetch students:', error.message);
    return;
  }

  if (!students || students.length === 0) {
    console.log('[notifyStudents] No students to notify');
    return;
  }

  console.log(`[notifyStudents] Sending to ${students.length} students`);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  for (const student of students) {
    const { data, error: sendError } = await resend.emails.send({
      from: 'Lumina <onboarding@resend.dev>', // ✅ change to your verified domain
      to: student.std_email,
      subject: `📚 New Skill Available: ${skl_title}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
          <h1 style="color:#4F46E5;">Lumina</h1>
          <h2>Hey ${student.std_fullname}!</h2>
          <p style="color:#555;font-size:16px;">
            A new skill was just uploaded by <strong>${teacher_name}</strong>:
          </p>
          <h3 style="color:#4F46E5;">${skl_title}</h3>
          <a
            href="${baseUrl}/skills/${skl_id}"
            style="display:inline-block;background:#4F46E5;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:16px;margin-top:16px;"
          >
            Check it out →
          </a>
          <br/><br/>
          <small style="color:#aaa;">
            Don't want these emails?
            <a href="${baseUrl}/settings" style="color:#aaa;">Unsubscribe here</a>
          </small>
        </div>
      `,
    });

    if (sendError) {
      console.error(`[notifyStudents] Failed to send to ${student.std_email}:`, sendError);
    } else {
      console.log(`[notifyStudents] Sent to ${student.std_email}`, data?.id);
    }
  }
}