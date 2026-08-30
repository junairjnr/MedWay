import { NextRequest, NextResponse } from "next/server";
import { sendMail, buildProductInquiryEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, productName, message } = body;

    if (!name || !email || !productName || !message) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await sendMail({
      to: process.env.ADMIN_EMAIL || "",
      subject: `[Med Way Inquiry] ${productName}`,
      html: buildProductInquiryEmail({ name, email, phone, productName, message }),
      replyTo: email,
    });

    return NextResponse.json({
      message: "Thank you! Your product inquiry has been sent. Our team will contact you shortly.",
    });
  } catch (error) {
    console.error("Product inquiry error:", error);
    return NextResponse.json({ error: "Failed to send inquiry. Please try again." }, { status: 500 });
  }
}
