import { NextRequest, NextResponse } from "next/server";
import { sendMail, buildNewsletterEmail, buildWelcomeEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await sendMail({
      to: process.env.ADMIN_EMAIL || "",
      subject: "[Med Way] New Newsletter Subscription",
      html: buildNewsletterEmail(email),
      replyTo: email,
    });

    await sendMail({
      to: email,
      subject: "Welcome to Med Way Newsletter!",
      html: buildWelcomeEmail(),
    });

    return NextResponse.json({
      message: "Thank you for subscribing! Check your inbox for a welcome email.",
    });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
  }
}
