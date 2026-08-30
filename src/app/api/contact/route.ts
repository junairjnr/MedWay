import { NextRequest, NextResponse } from "next/server";
import { sendMail, buildContactEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await sendMail({
      to: process.env.ADMIN_EMAIL || "",
      subject: `[Med Way Contact] ${subject}`,
      html: buildContactEmail({ name, email, phone, subject, message }),
      replyTo: email,
    });

    return NextResponse.json({
      message: "Thank you! Your message has been sent. We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
