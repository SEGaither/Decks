import type { LeadPayload, SubmitResult } from "@/types/lead";

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  let res: Response;

  try {
    res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      ok: false,
      message:
        "Your request was not sent. Check your connection and try again.",
    };
  }

  if (!res.ok) {
    let message = "Your request was not sent. Please try again.";
    try {
      const data: unknown = await res.json();
      if (
        data != null &&
        typeof data === "object" &&
        "message" in data &&
        typeof (data as Record<string, unknown>).message === "string"
      ) {
        message = (data as { message: string }).message;
      }
    } catch {
      // use default message
    }
    return { ok: false, message };
  }

  try {
    const data: unknown = await res.json();
    if (
      data != null &&
      typeof data === "object" &&
      "success" in data &&
      (data as Record<string, unknown>).success === true &&
      "submittedAt" in data &&
      typeof (data as Record<string, unknown>).submittedAt === "string"
    ) {
      return {
        ok: true,
        submittedAt: (data as { submittedAt: string }).submittedAt,
      };
    }
  } catch {
    // fall through to error
  }

  return {
    ok: false,
    message: "Your request was not sent. Please try again.",
  };
}
