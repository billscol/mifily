import { Hr, Link, Tailwind, Text } from "@react-email/components";

export function Footer({
  email,
  marketing,
  unsubscribeUrl = "https://app.mifily.com/account/settings",
  notificationSettingsUrl,
}: {
  email: string;
  marketing?: boolean;
  unsubscribeUrl?: string;
  notificationSettingsUrl?: string;
}) {
  return (
    <Tailwind>
      <Hr className="mx-0 my-6 w-full border border-neutral-200" />
      <Text className="text-[12px] leading-6 text-neutral-500">
        This email was intended for <span className="text-black">{email}</span>.
        If you were not expecting this email, you can ignore this email. If you
        are concerned about your account's safety, please{" "}
        <Link
          className="text-neutral-700 underline"
          href="mailto:support@mifily.com"
        >
          reach out to let us know
        </Link>
        .
      </Text>

      {(marketing || notificationSettingsUrl) && (
        <Text className="text-[12px] leading-6 text-neutral-500">
          Don't want to get these emails?{" "}
          <Link
            className="text-neutral-700 underline"
            href={marketing ? unsubscribeUrl : notificationSettingsUrl}
          >
            {marketing
              ? "Manage your email preferences"
              : "Adjust your notification settings"}
          </Link>
        </Text>
      )}
      <Text className="text-[12px] text-neutral-500">
        {/* TODO: replace with Mifily's real legal entity name + mailing address (required for CAN-SPAM compliance) */}
        Mifily
      </Text>
    </Tailwind>
  );
}
