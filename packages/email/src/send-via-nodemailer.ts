import { pretty, render } from "@react-email/render";
import nodemailer, { Transporter } from "nodemailer";
import { VARIANT_TO_FROM_MAP } from "./resend/constants";
import { ResendEmailOptions } from "./resend/types";

// Lazily created so a missing SMTP_* config doesn't crash module import
// (e.g. in local dev where Resend is used instead).
let transporter: Transporter | null = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const port = Number(process.env.SMTP_PORT) || 587;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // Amazon SES (and most providers) use implicit TLS on 465, and
    // STARTTLS on 587/25 - nodemailer needs to know which to use upfront.
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
};

// Send email via SMTP (e.g. Amazon SES SMTP interface) - used as the
// production fallback when RESEND_API_KEY isn't set. See packages/email/src/index.ts.
export const sendViaNodeMailer = async ({
  to,
  from,
  variant = "primary",
  replyTo,
  bcc,
  subject,
  text,
  react,
}: Pick<
  ResendEmailOptions,
  "to" | "from" | "variant" | "replyTo" | "bcc" | "subject" | "text" | "react"
>) => {
  // resend's types allow string[] for replyTo/bcc; nodemailer wants a single
  // string for replyTo.
  const replyToValue = Array.isArray(replyTo) ? replyTo[0] : replyTo;

  return await getTransporter().sendMail({
    from: from || VARIANT_TO_FROM_MAP[variant],
    to,
    bcc,
    // same "noreply" sentinel convention as send-via-resend.ts
    ...(replyToValue === "noreply"
      ? {}
      : { replyTo: replyToValue || "support@mifily.com" }),
    subject,
    text,
    html: react ? await pretty(await render(react)) : undefined,
  });
};
