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

// Field length caps — defends against oversized / abusive payloads.
const LIMITS: Record<keyof ApplicationData, number> = {
  fullName: 120,
  university: 200,
  email: 160,
  url: 400,
  project: 4000,
  value: 4000,
};

// Best-effort in-memory rate limit (per warm container): 5 requests / 10 min / IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // guard against unbounded growth
  return recent.length > MAX_HITS;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= LIMITS.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

/** Trims and caps a field to its allowed length. */
function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  // Only accept JSON.
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — a hidden field only bots fill. Pretend success, send nothing.
  if (typeof raw.company === "string" && raw.company.trim() !== "") {
    return NextResponse.json({ ok: true, ref: makeReference() });
  }

  const data: ApplicationData = {
    fullName: clean(raw.fullName, LIMITS.fullName),
    university: clean(raw.university, LIMITS.university),
    email: clean(raw.email, LIMITS.email),
    url: clean(raw.url, LIMITS.url),
    project: clean(raw.project, LIMITS.project),
    value: clean(raw.value, LIMITS.value),
  };

  if (!data.fullName || !isEmail(data.email)) {
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
  const from =
    process.env.RESEND_FROM || "Vallière Society <apply@vallieresociety.org>";
  const notifyTo = process.env.APPLY_NOTIFY_TO || "vallieresociety@gmail.com";
  const ref = makeReference();

  // The internal notification is the priority — send (and surface failure) first.
  try {
    const { error } = await resend.emails.send({
      from,
      to: notifyTo,
      subject: `New Application • ${data.fullName} • ${ref}`,
      html: internalEmail(data, ref),
      replyTo: data.email,
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
      to: data.email,
      subject: APPLICANT_SUBJECT,
      html: applicantEmail(data, ref),
    });
    if (error) throw error;
  } catch (err) {
    console.error("[apply] applicant confirmation failed:", err);
  }

  return NextResponse.json({ ok: true, ref });
}
