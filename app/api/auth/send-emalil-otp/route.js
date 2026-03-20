// app/api/auth/send-email-otp/route.js
// 1. Verify Firebase token
// 2. Generate 6-digit OTP
// 3. Store in MongoDB (old OTPs for this user are deleted first)
// 4. Send OTP email via nodemailer (Gmail SMTP)

import { NextResponse }  from "next/server";
import nodemailer        from "nodemailer";
import { adminAuth }     from "@/lib/firebaseAdmin";
import connectDB         from "@/lib/mongodb";
import User              from "@/models/User";
import OtpToken          from "@/models/OtpToken";

// ── Generate a random 6-digit OTP ────────────────────────────────────────────
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ── Create nodemailer transporter from .env.local ─────────────────────────────
function createTransporter() {
  // Supports Gmail, Outlook, or any SMTP
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || "smtp.gmail.com",
    port:   parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",   // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,    // your Gmail address
      pass: process.env.SMTP_PASS,    // Gmail App Password (not your normal password)
    },
  });
}

// ── Email HTML template ───────────────────────────────────────────────────────
function buildEmailHtml(name, otp) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your LUXE account</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:white;border:1px solid #e7e5e4;">

        <!-- Header -->
        <tr>
          <td style="background:#1c1917;padding:28px 36px;text-align:center;">
            <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;letter-spacing:0.3em;color:white;text-transform:uppercase;">
              LUXE
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 36px;">
            <p style="margin:0 0 16px;font-size:15px;color:#1c1917;font-weight:500;">
              Hi ${name},
            </p>
            <p style="margin:0 0 28px;font-size:14px;color:#78716c;line-height:1.7;">
              Use the verification code below to verify your email address.
              This code expires in <strong style="color:#1c1917;">10 minutes</strong>.
            </p>

            <!-- OTP box -->
            <div style="background:#f5f5f4;border:2px solid #1c1917;padding:24px;text-align:center;margin:0 0 28px;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#a8a29e;">
                Verification Code
              </p>
              <p style="margin:0;font-family:Georgia,serif;font-size:42px;font-weight:300;letter-spacing:0.3em;color:#1c1917;">
                ${otp}
              </p>
            </div>

            <p style="margin:0 0 8px;font-size:13px;color:#a8a29e;line-height:1.6;">
              If you didn't request this code, you can safely ignore this email.
            </p>
            <p style="margin:0;font-size:13px;color:#a8a29e;">
              Do not share this code with anyone.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f5f5f4;padding:20px 36px;border-top:1px solid #e7e5e4;text-align:center;">
            <p style="margin:0;font-size:11px;color:#a8a29e;letter-spacing:0.1em;">
              © ${new Date().getFullYear()} LUXE Store &nbsp;·&nbsp; Mumbai, India
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    // 1. Verify Firebase token
    const authHeader = request.headers.get("Authorization") || "";
    const idToken    = authHeader.replace("Bearer ", "").trim();
    if (!idToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = await adminAuth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 2. Check user exists in MongoDB
    await connectDB();
    const user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Don't re-send if already verified
    if (user.emailVerified) {
      return NextResponse.json({ error: "Email is already verified" }, { status: 400 });
    }

    // 4. Rate limit — max 3 OTPs per 10 minutes
    const recentCount = await OtpToken.countDocuments({ firebaseUid: decoded.uid });
    if (recentCount >= 3) {
      return NextResponse.json(
        { error: "Too many OTP requests. Please wait 10 minutes and try again." },
        { status: 429 }
      );
    }

    // 5. Delete any existing OTPs for this user (only 1 active at a time)
    await OtpToken.deleteMany({ firebaseUid: decoded.uid });

    // 6. Generate and save OTP
    const otp = generateOtp();
    await OtpToken.create({
      firebaseUid: decoded.uid,
      email:       user.email,
      otp,
    });

    // 7. Send email
    const transporter = createTransporter();
    await transporter.sendMail({
      from:    `"LUXE Store" <${process.env.SMTP_USER}>`,
      to:      user.email,
      subject: `${otp} — Your LUXE verification code`,
      html:    buildEmailHtml(user.name, otp),
      text:    `Your LUXE verification code is: ${otp}\n\nThis code expires in 10 minutes.`,
    });

    return NextResponse.json({ success: true, message: "OTP sent to " + user.email });

  } catch (err) {
    console.error("send-email-otp error:", err);

    // Specific error for missing SMTP config
    if (err.code === "EAUTH" || err.responseCode === 535) {
      return NextResponse.json(
        { error: "Email sending failed. Check SMTP_USER and SMTP_PASS in .env.local." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: err.message || "Failed to send OTP" },
      { status: 500 }
    );
  }
}