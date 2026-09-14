/**
 * Safe test email script — OPERATOR ONLY.
 *
 * Sends ONE test email through the configured Resend provider
 * to verify production email configuration.
 *
 * Usage:
 *   npx tsx scripts/test-email.ts <operator-email>
 *
 * SECURITY:
 * - Never sends to customer addresses
 * - Reads RESEND_API_KEY and EMAIL_FROM from environment
 * - Does not modify any database state
 */

import { Resend } from "resend";

const OPERATOR_EMAIL = process.argv[2];

if (!OPERATOR_EMAIL || !OPERATOR_EMAIL.includes("@")) {
  console.error("Usage: npx tsx scripts/test-email.ts <your-email>");
  console.error("Example: npx tsx scripts/test-email.ts operator@example.com");
  process.exit(1);
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM;

console.log("─── Resend Production Config Test ───");
console.log(`RESEND_API_KEY: ${RESEND_API_KEY ? "✓ set" : "✗ MISSING"}`);
console.log(`EMAIL_FROM:     ${EMAIL_FROM ?? "✗ MISSING (will use onboarding@resend.dev)"}`);
console.log(`TO:             ${OPERATOR_EMAIL}`);
console.log("");

if (!RESEND_API_KEY) {
  console.error("FATAL: RESEND_API_KEY is not set. Aborting.");
  process.exit(1);
}

const from = EMAIL_FROM ?? "onboarding@resend.dev";
const resend = new Resend(RESEND_API_KEY);

async function main() {
  console.log("Sending test email...");

  const result = await resend.emails.send({
    from,
    to: OPERATOR_EMAIL,
    subject: "[TEST] Phép Màu Văn Học — Email Configuration Verified",
    html: `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 32px 24px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">
          Phép Màu Văn Học
        </h1>
        <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
          Email Configuration Test ✓
        </p>
      </div>
      <div style="padding: 32px 24px;">
        <p style="margin: 0 0 16px; font-size: 16px; color: #333;">
          This is a test email from your production Resend configuration.
        </p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #888;">From:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #333; font-weight: 600;">${from}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #888;">Brand:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #333; font-weight: 600;">Phép Màu Văn Học</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #888;">Domain:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #333; font-weight: 600;">phepmauvanhoc.com</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #888;">Canonical URL:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #333; font-weight: 600;">
              <a href="https://phepmauvanhoc.com" style="color: #2563eb;">https://phepmauvanhoc.com</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #888;">Sent at:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #333; font-weight: 600;">${new Date().toISOString()}</td>
          </tr>
        </table>
        <p style="margin: 16px 0 0; font-size: 13px; color: #888;">
          If you received this email at the expected address with the correct sender,
          your Resend configuration is production-ready.
        </p>
      </div>
      <div style="padding: 16px 24px; background-color: #f9fafb; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #aaa;">
          © ${new Date().getFullYear()} Phép Màu Văn Học. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`.trim(),
  });

  if (result.error) {
    console.error("✗ SEND FAILED:", result.error.message);
    process.exit(1);
  }

  console.log("✓ Email sent successfully!");
  console.log(`  Message ID: ${result.data?.id}`);
  console.log(`  From:       ${from}`);
  console.log(`  To:         ${OPERATOR_EMAIL}`);
  console.log("");
  console.log("Check your inbox to verify brand display and links.");
}

main().catch((err) => {
  console.error("✗ Fatal error:", err);
  process.exit(1);
});
