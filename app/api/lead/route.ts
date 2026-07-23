import { NextResponse } from "next/server";

// Phase 4 stub: not yet connected to production delivery.
// Phase 5 will replace this with actual lead handling.
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: "Your request was not sent yet. Your information is still here. Please try again.",
    },
    { status: 503 }
  );
}
