import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Your request was not sent. Please try again." },
      { status: 400 }
    );
  }

  if (body == null || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { success: false, message: "Your request was not sent. Please try again." },
      { status: 400 }
    );
  }

  const data = body as Record<string, unknown>;

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const address = typeof data.address === "string" ? data.address.trim() : "";

  if (!name) {
    return NextResponse.json(
      { success: false, message: "Name is required." },
      { status: 400 }
    );
  }
  if (!phone) {
    return NextResponse.json(
      { success: false, message: "Phone is required." },
      { status: 400 }
    );
  }
  if (!address) {
    return NextResponse.json(
      { success: false, message: "Address is required." },
      { status: 400 }
    );
  }

  let clientTimestampDisplay = "";
  if (typeof data.clientSubmittedAt === "string" && data.clientSubmittedAt.trim() !== "") {
    const parsed = new Date(data.clientSubmittedAt);
    if (isNaN(parsed.getTime())) {
      return NextResponse.json(
        { success: false, message: "Your request was not sent. Please try again." },
        { status: 400 }
      );
    }
    clientTimestampDisplay = parsed.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/Chicago",
    });
  }

  const serverReceivedAt = new Date();
  const serverTimestampDisplay = serverReceivedAt.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Chicago",
  });

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "Daychanger Decks <onboarding@resend.dev>",
      to: ["shane.gaither@gmail.com"],
      subject: `New Quote Request — ${name}`,
      html: `
        <h2>New Daychanger Decks Quote Request</h2>
        <table style="border-collapse:collapse;font-family:sans-serif">
          <tr>
            <td style="padding:6px 16px 6px 0;font-weight:bold;vertical-align:top">Name</td>
            <td style="padding:6px 0">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:6px 16px 6px 0;font-weight:bold;vertical-align:top">Phone</td>
            <td style="padding:6px 0">${escapeHtml(phone)}</td>
          </tr>
          <tr>
            <td style="padding:6px 16px 6px 0;font-weight:bold;vertical-align:top">Project Address</td>
            <td style="padding:6px 0">${escapeHtml(address)}</td>
          </tr>
          ${clientTimestampDisplay ? `
          <tr>
            <td style="padding:6px 16px 6px 0;font-weight:bold;vertical-align:top">Submitted (customer clock)</td>
            <td style="padding:6px 0">${escapeHtml(clientTimestampDisplay)} CT</td>
          </tr>` : ""}
          <tr>
            <td style="padding:6px 16px 6px 0;font-weight:bold;vertical-align:top">Received (server)</td>
            <td style="padding:6px 0">${escapeHtml(serverTimestampDisplay)} CT</td>
          </tr>
        </table>
      `,
    });

    if (error) {
      console.error("[lead] Resend error:", error.name);
      return NextResponse.json(
        { success: false, message: "Your request was not sent. Please try again." },
        { status: 502 }
      );
    }
  } catch {
    console.error("[lead] Unexpected email error");
    return NextResponse.json(
      { success: false, message: "Your request was not sent. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    submittedAt: serverReceivedAt.toISOString(),
  });
}
