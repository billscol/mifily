const logTypeToEnv = {
  alerts: process.env.DUB_SLACK_HOOK_ALERTS,
  cron: process.env.DUB_SLACK_HOOK_CRON,
  errors: process.env.DUB_SLACK_HOOK_ERRORS,
  links: process.env.DUB_SLACK_HOOK_LINKS,
  payouts: process.env.DUB_SLACK_HOOK_PAYOUTS,
};

export const log = async ({
  message,
  type,
  mention = false,
}: {
  message: string;
  type: "alerts" | "cron" | "errors" | "links" | "payouts";
  mention?: boolean;
}) => {
  /* Log a message to the console */
  console.log(message);

  // NOTE: was VERCEL_ENV, which is never set on this self-hosted deployment -
  // that silently disabled Slack alerting entirely in production.
  if (process.env.NODE_ENV !== "production") {
    console.log("Skipping log to Mifily Slack in non-production environment.");
    return;
  }

  const HOOK = logTypeToEnv[type];
  if (!HOOK) return;
  try {
    return await fetch(HOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              // prettier-ignore
              text: `${mention ? "<@U0404G6J3NJ> " : ""}${(type === "alerts" || type === "errors") ? ":alert: " : ""}${message}`,
            },
          },
        ],
      }),
    });
  } catch (e) {
    console.log(`Failed to log to Mifily Slack. Error: ${e}`);
  }
};
