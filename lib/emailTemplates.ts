/**
 * HTML email templates for the VALLIÈRE application flow.
 *
 * Built as email-safe, table-based, inline-styled HTML. The Pinyon Script
 * signature loads via @import where the client allows it (Apple Mail, etc.)
 * and gracefully falls back to a system cursive elsewhere (e.g. Gmail).
 */

export interface ApplicationData {
  fullName: string;
  university?: string;
  email: string;
  url?: string;
  project?: string;
  value?: string;
}

const PALETTE = {
  bg: "#070a08",
  card: "#0B1D16",
  gold: "#D4AF37",
  wineGold: "#E6C687",
  ivory: "#F5F5F0",
  body: "#c9d2cc",
  muted: "#8a998f",
  hairline: "#1c2b24",
};

/** Escapes user-supplied text before it is placed into HTML. */
export function escapeHtml(input: string): string {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Preserves line breaks from textarea input as <br>. */
function nl2br(input: string): string {
  return escapeHtml(input).replace(/\r?\n/g, "<br>");
}

/** A short reference id like VAL-2026-4821. */
export function makeReference(): string {
  return `VAL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
}

/**
 * The Deep Forest Green / Wine-Gold candidate card, reused in both emails.
 */
export function candidateCard(name: string, ref: string): string {
  const safeName = escapeHtml(name.trim() || "—");
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;">
    <tr>
      <td style="background:${PALETTE.card};border:1px solid ${PALETTE.gold};border-radius:16px;padding:34px 30px;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:2.5px;color:${PALETTE.wineGold};text-transform:uppercase;">
          VALLI&Egrave;RE SOCIETY &bull; STUDENT FOUNDERS COLLECTIVE
        </div>

        <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.2;color:${PALETTE.ivory};margin-top:22px;">
          SAYIN <span style="color:${PALETTE.wineGold};">${safeName}</span>
        </div>

        <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;color:${PALETTE.muted};margin-top:10px;">
          REF: ${escapeHtml(ref)}
        </div>

        <div style="margin-top:22px;">
          <span style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:1.5px;color:${PALETTE.wineGold};border:1px solid ${PALETTE.gold};border-radius:999px;padding:7px 15px;text-transform:uppercase;">
            Under Review &bull; In Confidence
          </span>
        </div>

        <div style="border-top:1px solid ${PALETTE.hairline};margin:28px 0 6px;"></div>

        <div style="font-family:'Pinyon Script','Segoe Script','Brush Script MT',cursive;font-size:44px;line-height:1;color:${PALETTE.wineGold};text-align:right;padding-top:6px;">
          Valli&egrave;re
        </div>
      </td>
    </tr>
  </table>`;
}

function shell(inner: string): string {
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
@import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap');
body{margin:0;padding:0;background:${PALETTE.bg};}
a{color:${PALETTE.gold};}
</style>
</head>
<body style="margin:0;padding:0;background:${PALETTE.bg};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PALETTE.bg};padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
      ${inner}
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/** Confirmation email sent to the applicant. */
export function applicantEmail(data: ApplicationData, ref: string): string {
  const safeName = escapeHtml(data.fullName.trim());
  const p = (html: string) =>
    `<p style="font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.8;color:${PALETTE.body};margin:0 0 18px;">${html}</p>`;

  const body = `
    <tr><td>${candidateCard(data.fullName, ref)}</td></tr>
    <tr><td style="padding:36px 8px 0;">
      ${p(`Sayın <span style="color:${PALETTE.wineGold};">${safeName}</span>,`)}
      ${p("Vallière Masası’na göstermiş olduğunuz ilgi ve ilettiğiniz beyanlar kayıtlarımıza geçmiştir.")}
      ${p("Girişimci öğrencilerin vizyonunu, entelektüel derinliğini ve üretim gücünü tek bir elit çatıda buluşturan topluluğumuz; başvurunuzu temel değerlerimiz (Özen &amp; Duruş, Açık Diyalog ve Ortak Vizyon) çerçevesinde değerlendirecektir.")}
      ${p("Değerlendirme Komitesi incelemelerini gizlilik esasına sadık kalarak yürütecek; süreç ve mülakat davetleri hakkındaki bilgilendirmeler yalnızca doğrudan sizinle temas kurulması uygun görüldüğü takdirde bu e-posta adresi üzerinden sağlanacaktır.")}
      ${p("Müzakerelerinize özen, duruşunuza saygıyla.")}
    </td></tr>
    <tr><td style="padding:14px 8px 0;">
      <div style="border-top:1px solid ${PALETTE.hairline};padding-top:22px;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:14px;color:${PALETTE.wineGold};">Vallière Evaluation Committee</div>
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${PALETTE.muted};margin-top:6px;">A Collective of Student Founders &amp; Innovators</div>
        <a href="https://www.vallieresociety.com" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${PALETTE.gold};text-decoration:none;margin-top:8px;display:inline-block;">www.vallieresociety.com</a>
      </div>
    </td></tr>`;

  return shell(body);
}

/** Internal notification email sent to the society inbox. */
export function internalEmail(data: ApplicationData, ref: string): string {
  const row = (label: string, value?: string) => `
    <tr>
      <td style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:${PALETTE.muted};padding:16px 0 4px;border-top:1px solid ${PALETTE.hairline};">
        ${escapeHtml(label)}
      </td>
    </tr>
    <tr>
      <td style="font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.6;color:${PALETTE.ivory};padding:0 0 6px;">
        ${value && value.trim() ? nl2br(value) : "<span style=\"color:#5f6b63;\">—</span>"}
      </td>
    </tr>`;

  const body = `
    <tr><td style="padding:0 0 26px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${PALETTE.wineGold};">
        New Candidacy &bull; ${escapeHtml(ref)}
      </div>
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:${PALETTE.ivory};margin-top:10px;">
        ${escapeHtml(data.fullName.trim())}
      </div>
    </td></tr>

    <tr><td>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Full Name", data.fullName)}
        ${row("University / Department", data.university)}
        ${row("Email / Contact", data.email)}
        ${row("Portfolio & Links", data.url)}
        ${row("Execution & Architecture", data.project)}
        ${row("Perspective / Value Proposition", data.value)}
      </table>
    </td></tr>

    <tr><td style="padding:34px 0 0;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:${PALETTE.muted};padding-bottom:16px;">
        Candidate Card Preview
      </div>
      ${candidateCard(data.fullName, ref)}
    </td></tr>`;

  return shell(body);
}
