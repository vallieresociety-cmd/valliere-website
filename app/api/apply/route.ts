import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  applicantEmail,
  internalEmail,
  makeReference,
  type ApplicationData,
} from "@/lib/emailTemplates";

// Always run on-demand as a Node function (never statically optimized).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const APPLICANT_SUBJECT =
  "Vallière Society • Adaylık Kaydınız Alındı / Candidacy Acknowledged";

function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  let data: ApplicationData;
  try {
    data = (await req.json()) as ApplicationData;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = (data.fullName ?? "").trim();
  const email = (data.email ?? "").trim();

  if (!fullName || !isEmail(email)) {
    return NextResponse.json(
      { error: "A valid full name and email are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[apply] RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "Email delivery is not configured yet." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM || "Vallière Society <onboarding@resend.dev>";
  const notifyTo = process.env.APPLY_NOTIFY_TO || "vallieresociety@gmail.com";

  const ref = makeReference();
  const clean: ApplicationData = { ...data, fullName, email };

  // The internal notification is the priority — send (and surface failure) first.
  try {
    const { error } = await resend.emails.send({
      from,
      to: notifyTo,
      subject: `New Application • ${fullName} • ${ref}`,
      html: internalEmail(clean, ref),
      replyTo: email,
    });
    if (error) throw error;
  } catch (err) {
    console.error("[apply] internal notification failed:", err);
    return NextResponse.json(
      { error: "Could not deliver the application. Please try again." },
      { status: 502 },
    );
  }

  // The applicant confirmation is best-effort: a bad inbox must not fail the flow.
  try {
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: APPLICANT_SUBJECT,
      html: applicantEmail(clean, ref),
    });
    if (error) throw error;
  } catch (err) {
    console.error("[apply] applicant confirmation failed:", err);
  }

  return NextResponse.json({ ok: true, ref });
}
