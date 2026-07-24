/**
 * HTML email templates for the VALLIÈRE application flow — theme-adaptive.
 *
 * The email is LIGHT by default (ivory ground, dark text) and switches to a
 * dark ground with cream text for dark-mode readers:
 *   • Apple Mail / iOS honour `@media (prefers-color-scheme: dark)` (!important
 *     overrides beat the inline light defaults).
 *   • Gmail / Outlook auto-invert a light email in dark mode, reaching the same
 *     result — so the wrappers deliberately carry NO background-image (which
 *     would block that inversion).
 * The membership CARD stays deep forest green in both themes: it keeps a
 * background-image, so no client inverts it — an elegant dark card on either
 * ground, like an object laid on the page.
 *
 * The Pinyon Script signature loads via @import where the client allows it and
 * falls back to a system cursive elsewhere (Gmail).
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
const CONTACT = "vallieresociety@gmail.com";

// Light theme (inline defaults) and dark theme (applied via !important classes).
const L = {
  page: "#f5f4ef", // silk ivory ground
  text: "#2a2824",
  muted: "#6f6b63",
  accent: "#9c7c1f", // deep gold, legible on ivory
  hair: "#ddd8cd",
};
const D = {
  page: "#0a0c0e",
  text: "#E5E0D8",
  muted: "#a7a294",
  accent: "#E6C687",
  hair: "#1e2c24",
};

// The membership card — constant deep-green, never theme-swapped.
const K = {
  top: "#0B1D16",
  bottom: "#050E0A",
  gold: "#D4AF37",
  foil: "#E6C687",
  cream: "#E5E0D8",
  seal: "#9a8a5a",
  hair: "#1e2c24",
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

/**
 * Turkish-aware Title Case: "arda öztürk" → "Arda Öztürk".
 */
export function titleCase(input: string): string {
  return String(input ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(
      (w) =>
        w.charAt(0).toLocaleUpperCase("tr") +
        w.slice(1).toLocaleLowerCase("tr"),
    )
    .join(" ");
}

/** A short reference id like VAL-2026-4821. */
export function makeReference(): string {
  return `VAL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
}

/**
 * The physical VIP membership card (always deep forest green). The
 * background-image keeps every client from inverting it in dark mode.
 */
export function candidateCard(name: string, ref: string): string {
  const displayName = escapeHtml(titleCase(name) || "—");
  const foil =
    "color:" +
    K.foil +
    ";text-shadow:0 1px 0 rgba(0,0,0,0.55), 0 0 12px rgba(230,198,135,0.28);";

  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:524px;margin:0 auto;">
    <tr>
      <td bgcolor="${K.top}" style="background:${K.top};background-image:linear-gradient(135deg, ${K.top} 0%, ${K.bottom} 100%);border:1px solid ${K.gold};border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(212,175,55,0.1);">
        <div style="background-image:radial-gradient(130% 100% at 12% 6%, rgba(212,175,55,0.10), rgba(212,175,55,0) 55%);border-radius:18px;padding:32px 30px 26px;">

          <!-- Top row: house line (left) + centred corner seal (right) -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:9.5px;line-height:1.75;letter-spacing:2.5px;color:${K.foil};text-transform:uppercase;">
                Valli&egrave;re Society<br>
                <span style="color:${K.seal};">Student Founders Collective</span>
              </td>
              <td valign="middle" align="right" width="96">
                <table role="presentation" cellpadding="0" cellspacing="0" align="right">
                  <tr>
                    <td align="center" style="text-align:center;">
                      <div style="width:46px;height:46px;line-height:46px;border:1px solid ${K.gold};border-radius:50%;text-align:center;color:${K.foil};font-family:Georgia,'Times New Roman',serif;font-size:21px;box-shadow:inset 0 0 9px rgba(212,175,55,0.28);margin:0 auto;">V</div>
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:7px;letter-spacing:1.6px;color:${K.seal};text-transform:uppercase;text-align:center;margin-top:9px;">Member Record</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Holder name (embossed gold foil, Title Case) -->
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.25;color:${K.cream};margin-top:26px;">
            SAYIN <span style="${foil}">${displayName}</span>
          </div>

          <!-- Reference -->
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11.5px;letter-spacing:2px;color:${K.foil};margin-top:11px;">
            REF: <span style="${foil}">${escapeHtml(ref)}</span>
          </div>

          <!-- Status -->
          <div style="margin-top:22px;">
            <span style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:1.8px;color:${K.foil};border:1px solid ${K.gold};border-radius:999px;padding:7px 15px;text-transform:uppercase;">
              Under Review &bull; In Confidence
            </span>
          </div>

          <!-- Divider: official domain (left) + calligraphic signature (right) -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;">
            <tr>
              <td valign="bottom" style="border-top:1px solid ${K.hair};padding-top:14px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:8px;letter-spacing:1.8px;color:${K.seal};text-transform:uppercase;">
                  Official Domain
                </div>
                <a href="${WEB_URL}" style="font-family:Arial,Helvetica,sans-serif;font-size:11.5px;letter-spacing:1px;color:${K.foil};text-decoration:none;">${WEB_LABEL}</a>
              </td>
              <td valign="bottom" align="right" style="border-top:1px solid ${K.hair};padding-top:8px;">
                <div style="font-family:'Pinyon Script','Segoe Script','Brush Script MT',cursive;font-size:42px;line-height:1;color:${K.foil};text-align:right;text-shadow:0 0 14px rgba(230,198,135,0.25);">
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

/** Shared document shell — light by default, dark via media query / auto-invert. */
function shell(inner: string, preview: string): string {
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<style>
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap');
  body, table, td { margin:0; padding:0; }
  a { text-decoration:none; }
  /* Dark-mode readers that honour the media query (Apple Mail, iOS Mail …). */
  @media (prefers-color-scheme: dark) {
    .v-page { background-color:${D.page} !important; }
    .v-text { color:${D.text} !important; }
    .v-muted { color:${D.muted} !important; }
    .v-accent { color:${D.accent} !important; }
    .v-hair { border-color:${D.hair} !important; }
  }
  /* Outlook.com dark mode. */
  [data-ogsc] .v-page { background-color:${D.page} !important; }
  [data-ogsc] .v-text { color:${D.text} !important; }
  [data-ogsc] .v-muted { color:${D.muted} !important; }
  [data-ogsc] .v-accent { color:${D.accent} !important; }
  [data-ogsc] .v-hair { border-color:${D.hair} !important; }
</style>
</head>
<body class="v-page" bgcolor="${L.page}" style="margin:0;padding:0;background-color:${L.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${L.page};font-size:1px;line-height:1px;">${escapeHtml(preview)}</div>
<table role="presentation" class="v-page" width="100%" height="100%" bgcolor="${L.page}" cellpadding="0" cellspacing="0" style="background-color:${L.page};width:100%;">
  <tr>
    <td class="v-page" align="center" bgcolor="${L.page}" style="background-color:${L.page};padding:34px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
        ${inner}
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** The automated / no-reply footer notice (applicant email). */
function noReplyNotice(): string {
  return `
    <tr><td style="padding:32px 10px 0;">
      <div class="v-hair" style="border-top:1px solid ${L.hair};padding-top:20px;">
        <div class="v-muted" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.75;color:${L.muted};text-align:center;">
          Bu e-posta otomatik bir sistem tarafından gönderilmiştir ve yanıtları kabul etmemektedir. Adaylığınız veya üyelik süreciyle ilgili sorularınız için lütfen doğrudan <a class="v-accent" href="mailto:${CONTACT}" style="color:${L.accent};">${CONTACT}</a> adresi üzerinden iletişime geçiniz.
        </div>
      </div>
    </td></tr>`;
}

/** Confirmation email sent to the applicant. */
export function applicantEmail(data: ApplicationData, ref: string): string {
  const displayName = escapeHtml(titleCase(data.fullName));
  const p = (html: string) =>
    `<p class="v-text" style="font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.85;color:${L.text};margin:0 0 18px;">${html}</p>`;

  const inner = `
    <tr><td>${candidateCard(data.fullName, ref)}</td></tr>
    <tr><td style="padding:38px 10px 0;">
      ${p(`Sayın <span class="v-accent" style="color:${L.accent};">${displayName}</span>,`)}
      ${p("Vallière Masası’na göstermiş olduğunuz ilgi ve ilettiğiniz beyanlar kayıtlarımıza geçmiştir.")}
      ${p("Girişimci öğrencilerin vizyonunu, entelektüel derinliğini ve üretim gücünü tek bir elit çatıda buluşturan topluluğumuz; başvurunuzu temel değerlerimiz (Özen &amp; Duruş, Açık Diyalog ve Ortak Vizyon) çerçevesinde değerlendirecektir.")}
      ${p("Değerlendirme Komitesi incelemelerini gizlilik esasına sadık kalarak yürütecek; süreç ve mülakat davetleri hakkındaki bilgilendirmeler yalnızca doğrudan sizinle temas kurulması uygun görüldüğü takdirde bu e-posta adresi üzerinden sağlanacaktır.")}
      ${p("Müzakerelerinize özen, duruşunuza saygıyla.")}
    </td></tr>
    <tr><td style="padding:16px 10px 0;">
      <div class="v-hair" style="border-top:1px solid ${L.hair};padding-top:22px;">
        <div class="v-accent" style="font-family:Georgia,'Times New Roman',serif;font-size:14px;color:${L.accent};">Vallière Evaluation Committee</div>
        <div class="v-muted" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${L.muted};margin-top:6px;">A Collective of Student Founders &amp; Innovators</div>
        <a class="v-accent" href="${WEB_URL}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${L.accent};margin-top:8px;display:inline-block;">${WEB_LABEL}</a>
      </div>
    </td></tr>
    ${noReplyNotice()}`;

  return shell(inner, `Adaylık kaydınız alındı — REF: ${ref}`);
}

/** Internal notification email sent to the society inbox. */
export function internalEmail(data: ApplicationData, ref: string): string {
  const row = (label: string, value?: string) => `
    <tr>
      <td class="v-muted v-hair" style="font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:1.6px;text-transform:uppercase;color:${L.muted};padding:16px 0 4px;border-top:1px solid ${L.hair};">
        ${escapeHtml(label)}
      </td>
    </tr>
    <tr>
      <td class="v-text" style="font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.6;color:${L.text};padding:0 0 6px;">
        ${value && value.trim() ? nl2br(value) : `<span class="v-muted" style="color:${L.muted};">—</span>`}
      </td>
    </tr>`;

  const inner = `
    <tr><td style="padding:0 0 26px;">
      <div class="v-accent" style="font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:2.5px;text-transform:uppercase;color:${L.accent};">
        New Candidacy &bull; ${escapeHtml(ref)}
      </div>
      <div class="v-text" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:${L.text};margin-top:10px;">
        ${escapeHtml(titleCase(data.fullName))}
      </div>
    </td></tr>

    <tr><td>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Full Name", titleCase(data.fullName))}
        ${row("University / Department", data.university)}
        ${row("Email / Contact", data.email)}
        ${row("Portfolio & Links", data.url)}
        ${row("Execution & Architecture", data.project)}
        ${row("Perspective / Value Proposition", data.value)}
      </table>
    </td></tr>

    <tr><td style="padding:36px 0 0;">
      <div class="v-muted" style="font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:1.6px;text-transform:uppercase;color:${L.muted};padding-bottom:16px;">
        Candidate Card Preview
      </div>
      ${candidateCard(data.fullName, ref)}
    </td></tr>`;

  return shell(inner, `New application — ${titleCase(data.fullName)} — ${ref}`);
}
