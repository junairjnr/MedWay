import { NextRequest, NextResponse } from "next/server";
import { sendMail, buildContactEmail, MailConfigurationError, getAdminEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;
    const subject = String(body.subject || body.category || "General Enquiry").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await sendMail({
      to: getAdminEmail(),
      subject: `[Medway Contact] ${subject}`,
      html: buildContactEmail({ name, email, phone, subject, message }),
      replyTo: email,
    });

    return NextResponse.json({
      message: "Thank you! Your message has been sent. We'll get back to you shortly.",
    });
  } catch (error) {
    if (error instanceof MailConfigurationError) {
      console.error("Contact mail configuration error:", error.message);
      return NextResponse.json(
        { error: "Email service is temporarily unavailable. Please call or WhatsApp us directly." },
        { status: 503 }
      );
    }
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
