import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define types for webhook data
interface WebhookData {
  event: string;
  data: Record<string, unknown>;
}

// Temporary in-memory storage (use a database in production)
let webhookData: WebhookData | null = null;
let taskCompleted: boolean = false;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: WebhookData = await request.json();
    console.log("Received webhook:", body); // Debugging log

    // Store the received data
    webhookData = body;
    taskCompleted = true;

    return NextResponse.json({ success: true, message: "Received webhook data" });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    if (!taskCompleted) {
      return NextResponse.json({ status: "pending" }); // Keep polling
    }

    return NextResponse.json({ status: "completed", data: webhookData });
  } catch (error) {
    console.error("Error fetching task status:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
