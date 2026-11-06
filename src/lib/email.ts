import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  from,
}: SendEmailParams): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!resend) {
    console.warn("RESEND_API_KEY not configured – email not sent");
    return { success: false, error: "Email service not configured" };
  }

  const fromAddress =
    from ||
    `${process.env.RESEND_FROM_NAME || "Event Team"} <${
      process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    }>`;

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error("Email send failed:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

export function renderTemplate(
  template: string,
  vars: Record<string, string | undefined>
): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "gi");
    result = result.replace(regex, value || "");
  }
  return result;
}

export function registrationConfirmationHtml(data: {
  participantName: string;
  eventName: string;
  eventDate: string;
  venue: string;
  ticketNumber: string;
  registrationId: string;
  qrCodeDataUrl?: string;
  spocName?: string;
  spocEmail?: string;
  spocPhone?: string;
  teamName?: string;
  designTitle?: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmed</title>
</head>
<body style="margin:0;padding:0;font-family:Georgia,serif;background:#faf9f6;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-size:28px;letter-spacing:0.05em;margin:0;color:#1a1a1a;">${data.eventName}</h1>
      <p style="margin:8px 0 0;color:#c9a227;font-style:italic;">Registration Confirmed</p>
    </div>

    <div style="background:#fff;border:1px solid #e5e2d9;padding:28px;border-radius:4px;">
      <p style="margin:0 0 16px;">Dear <strong>${data.participantName}</strong>,</p>
      <p style="margin:0 0 16px;">Your registration for <strong>${data.eventName}</strong> has been confirmed.</p>

      <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:14px;">
        <tr>
          <td style="padding:8px 0;color:#666;">Event Date</td>
          <td style="padding:8px 0;text-align:right;font-weight:600;">${data.eventDate}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;">Venue</td>
          <td style="padding:8px 0;text-align:right;font-weight:600;">${data.venue}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;">Registration ID</td>
          <td style="padding:8px 0;text-align:right;font-weight:600;">${data.registrationId}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;">Ticket Number</td>
          <td style="padding:8px 0;text-align:right;font-weight:600;">${data.ticketNumber}</td>
        </tr>
        ${data.teamName ? `<tr><td style="padding:8px 0;color:#666;">Team</td><td style="padding:8px 0;text-align:right;font-weight:600;">${data.teamName}</td></tr>` : ""}
        ${data.designTitle ? `<tr><td style="padding:8px 0;color:#666;">Design Title</td><td style="padding:8px 0;text-align:right;font-weight:600;">${data.designTitle}</td></tr>` : ""}
      </table>

      ${
        data.qrCodeDataUrl
          ? `<div style="text-align:center;margin:28px 0;">
              <p style="font-size:13px;color:#666;margin-bottom:12px;">Present this QR code at check-in</p>
              <img src="${data.qrCodeDataUrl}" alt="Ticket QR Code" width="200" height="200" style="border:1px solid #e5e2d9;" />
            </div>`
          : ""
      }

      ${
        data.spocName
          ? `<div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e2d9;">
              <p style="margin:0 0 8px;font-size:13px;color:#666;text-transform:uppercase;letter-spacing:0.05em;">Your Point of Contact</p>
              <p style="margin:0;font-weight:600;">${data.spocName}</p>
              ${data.spocEmail ? `<p style="margin:4px 0 0;font-size:14px;"><a href="mailto:${data.spocEmail}" style="color:#1a1a1a;">${data.spocEmail}</a></p>` : ""}
              ${data.spocPhone ? `<p style="margin:4px 0 0;font-size:14px;">${data.spocPhone}</p>` : ""}
            </div>`
          : ""
      }
    </div>

    <p style="text-align:center;margin-top:32px;font-size:12px;color:#999;">
      This is an automated confirmation. Please do not reply directly to this email.
    </p>
  </div>
</body>
</html>
`;
}
