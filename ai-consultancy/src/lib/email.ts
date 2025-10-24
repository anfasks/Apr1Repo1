import nodemailer from "nodemailer";

export type EmailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to?: string;
};

function getEmailConfig(): EmailConfig | null {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;

  if (!host || !port || !user || !pass || !from) return null;

  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
    from,
    to,
  };
}

export async function sendLeadNotification(subject: string, text: string): Promise<{ ok: boolean; message: string }>{
  const config = getEmailConfig();
  if (!config) {
    console.log("[email] SMTP not configured. Skipping email.", { subject, text });
    return { ok: false, message: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });

  const to = config.to ?? config.from;

  await transporter.sendMail({
    from: config.from,
    to,
    subject,
    text,
  });

  return { ok: true, message: "Email sent" };
}
