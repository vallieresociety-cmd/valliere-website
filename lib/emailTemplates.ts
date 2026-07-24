/**
 * HTML email templates for the VALLIÈRE application flow.
 *
 * Designed dark-native so no client ever "explodes" to a white background:
 * every colour is baked inline, and `color-scheme: dark` signalling stops
 * Gmail/Outlook/Apple Mail from auto-inverting the deep-green card into pale
 * mint. A `prefers-color-scheme: dark` block + Outlook `[data-ogsc]` hacks push
 * the ground to absolute black as progressive enhancement.
 *
 * The Pinyon Script signature loads via @import where the client allows it
 * (Apple Mail, iOS) and falls back to a system cursive elsewhere (Gmail).
 */

export interface ApplicationData {
  fullName: string;
  university?: string;
  email: string;
  url?: string;
  project?: string;
  value?: string;
}

const WEB_URL = "https://vallieresociety.org";
const WEB_LABEL = "vallieresociety.org";

const C = {
  bg: "#070a08", // near-black base (light-mode fallback — still dark)
  bgDark: "#050706", // absolute black (dark mode)
  cardTop: "#0B1D16",
  cardBottom: "#050E0A",
  gold: "#D4AF37",
  foil: "#E6C687",
  cream: "#E5E0D8",
  creamMuted: "#a7a294",
  sealMuted: "#9a8a5a",
  hairline: "#1e2c24",
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
 * The physical VIP membership card — matte forest-green gradient, glinting
 * gold frame, embossed gold-foil type, a corner seal and a calligraphic
 * signature. Reused in both the applicant and internal emails.
 */
export function candidateCard(name: string, ref: string): string {
  const safeName = escapeHtml(name.trim() || "—");
  const foilText =
    "color:" +
    C.foil +
    ";text-shadow:0 1px 0 rgba(0,0,0,0.55), 0 0 12px rgba(230,198,135,0.28);";

  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:524px;margin:0 auto;">
    <tr>
      <td bgcolor="${C.cardTop}" style="background:${C.cardTop};background-image:linear-gradient(135deg, ${C.cardTop} 0%, ${C.cardBottom} 100%);border:1px solid ${C.gold};border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(212,175,55,0.1);">
        <div style="background-image:radial-gradient(130% 100% at 12% 6%, rgba(212,175,55,0.10), rgba(212,175,55,0) 55%);border-radius:18px;padding:32px 30px 28px;">

          <!-- Top row: house line + corner seal -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:9.5px;line-height:1.7;letter-spacing:2.5px;color:${C.foil};text-transform:uppercase;">
                Valli&egrave;re Society<br>
                <span style="color:${C.sealMuted};">Student Founders Collective</span>
              </td>
              <td valign="top" align="right" width="80">
                <div style="width:46px;height:46px;line-height:46px;border:1px solid ${C.gold};border-radius:50%;text-align:center;color:${C.foil};font-family:Georgia,'Times New Roman',serif;font-size:21px;box-shadow:inset 0 0 9px rgba(212,175,55,0.28);margin-left:auto;">V</div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:7px;letter-spacing:1.6px;color:${C.sealMuted};text-transform:uppercase;text-align:center;margin-top:7px;">Member Record</div>
              </td>
            </tr>
          </table>

          <!-- Holder name (embossed gold foil) -->
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.25;color:${C.cream};margin-top:26px;">
            SAYIN <span style="${foilText}">${safeName}</span>
          </div>

          <!-- Reference -->
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11.5px;letter-spacing:2px;color:${C.foil};margin-top:11px;">
            REF: <span style="${foilText}">${escapeHtml(ref)}</span>
          </div>

          <!-- Status -->
          <div style="margin-top:22px;">
            <span style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:1.8px;color:${C.foil};border:1px solid ${C.gold};border-radius:999px;padding:7px 15px;text-transform:uppercase;">
              Under Review &bull; In Confidence
            </span>
          </div>

          <!-- Divider: official domain badge (left) + calligraphic signature (right) -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;">
            <tr>
              <td style="border-top:1px solid ${C.hairline};padding-top:14px;" valign="bottom">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:8px;letter-spacing:1.8px;color:${C.sealMuted};text-transform:uppercase;">
                  Official Domain
                </div>
                <a href="${WEB_URL}" style="font-family:Arial,Helvetica,sans-serif;font-size:11.5px;letter-spacing:1px;color:${C.foil};text-decoration:none;">${WEB_LABEL}</a>
              </td>
              <td style="border-top:1px solid ${C.hairline};padding-top:8px;" valign="bottom" align="right">
                <div style="font-family:'Pinyon Script','Segoe Script','Brush Script MT',cursive;font-size:42px;line-height:1;color:${C.foil};text-align:right;text-shadow:0 0 14px rgba(230,198,135,0.25);">
                  Valli&egrave;re
                </div>
              </td>
            </tr>
          </table>

        </div>
      </td>
    </tr>
  </table>`;
}

/** Shared document shell with dark-native colour-scheme signalling. */
function shell(inner: string, preview: string): string {
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<style>
  :root { color-scheme: dark; supported-color-schemes: dark; }
  @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap');
  body { margin:0; padding:0; background:${C.bg}; }
  a { color:${C.gold}; }
  /* Progressive enhancement: absolute black in dark mode */
  @media (prefers-color-scheme: dark) {
    .v-bg { background:${C.bgDark} !important; }
  }
  /* Outlook.com dark-mode guards — keep the ground dark, text cream */
  [data-ogsc] .v-bg { background:${C.bgDark} !important; }
  [data-ogsc] .v-cream { color:${C.cream} !important; }
  [data-ogsc] .v-muted { color:${C.creamMuted} !important; }
</style>
</head>
<body class="v-bg" style="margin:0;padding:0;background:${C.bg};color-scheme:dark;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.bg};font-size:1px;line-height:1px;">${escapeHtml(preview)}</div>
<table role="presentation" class="v-bg" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:34px 16px;">
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
    `<p class="v-cream" style="font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.85;color:${C.cream};margin:0 0 18px;">${html}</p>`;

  const inner = `
    <tr><td>${candidateCard(data.fullName, ref)}</td></tr>
    <tr><td style="padding:38px 10px 0;">
      ${p(`Sayın <span style="color:${C.foil};">${safeName}</span>,`)}
      ${p("Vallière Masası’na göstermiş olduğunuz ilgi ve ilettiğiniz beyanlar kayıtlarımıza geçmiştir.")}
      ${p("Girişimci öğrencilerin vizyonunu, entelektüel derinliğini ve üretim gücünü tek bir elit çatıda buluşturan topluluğumuz; başvurunuzu temel değerlerimiz (Özen &amp; Duruş, Açık Diyalog ve Ortak Vizyon) çerçevesinde değerlendirecektir.")}
      ${p("Değerlendirme Komitesi incelemelerini gizlilik esasına sadık kalarak yürütecek; süreç ve mülakat davetleri hakkındaki bilgilendirmeler yalnızca doğrudan sizinle temas kurulması uygun görüldüğü takdirde bu e-posta adresi üzerinden sağlanacaktır.")}
      ${p("Müzakerelerinize özen, duruşunuza saygıyla.")}
    </td></tr>
    <tr><td style="padding:16px 10px 0;">
      <div style="border-top:1px solid ${C.hairline};padding-top:22px;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:14px;color:${C.foil};">Vallière Evaluation Committee</div>
        <div class="v-muted" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${C.creamMuted};margin-top:6px;">A Collective of Student Founders &amp; Innovators</div>
        <a href="${WEB_URL}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${C.gold};text-decoration:none;margin-top:8px;display:inline-block;">${WEB_LABEL}</a>
      </div>
    </td></tr>`;

  return shell(inner, `Adaylık kaydınız alındı — REF: ${ref}`);
}

/** Internal notification email sent to the society inbox. */
export function internalEmail(data: ApplicationData, ref: string): string {
  const row = (label: string, value?: string) => `
    <tr>
      <td class="v-muted" style="font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:1.6px;text-transform:uppercase;color:${C.creamMuted};padding:16px 0 4px;border-top:1px solid ${C.hairline};">
        ${escapeHtml(label)}
      </td>
    </tr>
    <tr>
      <td class="v-cream" style="font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.6;color:${C.cream};padding:0 0 6px;">
        ${value && value.trim() ? nl2br(value) : `<span style="color:#5f6b63;">—</span>`}
      </td>
    </tr>`;

  const inner = `
    <tr><td style="padding:0 0 26px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:2.5px;text-transform:uppercase;color:${C.foil};">
        New Candidacy &bull; ${escapeHtml(ref)}
      </div>
      <div class="v-cream" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:${C.cream};margin-top:10px;">
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

    <tr><td style="padding:36px 0 0;">
      <div class="v-muted" style="font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:1.6px;text-transform:uppercase;color:${C.creamMuted};padding-bottom:16px;">
        Candidate Card Preview
      </div>
      ${candidateCard(data.fullName, ref)}
    </td></tr>`;

  return shell(inner, `New application — ${data.fullName.trim()} — ${ref}`);
}
