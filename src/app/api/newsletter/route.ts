import { NextRequest, NextResponse } from "next/server";
import {
  sendMail,
  buildNewsletterEmail,
  buildWelcomeEmail,
  MailConfigurationError,
  getAdminEmail,
} from "@/lib/mail";

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
      to: getAdminEmail(),
      subject: "[Medway] New Newsletter Subscription",
      html: buildNewsletterEmail(email),
      replyTo: email,
    });

    try {
      await sendMail({
        to: email,
        subject: "Welcome to Medway Newsletter!",
        html: buildWelcomeEmail(),
      });
    } catch (welcomeError) {
      console.warn("Newsletter welcome email failed:", welcomeError);
    }

    return NextResponse.json({
      message: "Thank you for subscribing!",
    });
  } catch (error) {
    if (error instanceof MailConfigurationError) {
      console.error("Newsletter mail configuration error:", error.message);
      return NextResponse.json(
        { error: "Email service is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
  }
}
