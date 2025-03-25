// app/api/webhook/route.tsx
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

// Define types for webhook data
interface WebhookData {
  event: string;
  taskId: string;
  data: Record<string, unknown>;
}

// Define task structure
interface TaskData {
  taskId: string;
  status: string;
  progress: number;
  data: WebhookData;
  createdAt: string;
  updatedAt: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Validate request content type
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { success: false, message: 'Invalid content type' },
        { status: 400 }
      );
    }

    // Read and validate JSON body
    let body: WebhookData;
    try {
      const rawBody = await request.text();
      body = JSON.parse(rawBody);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: err },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.taskId || typeof body.taskId !== 'string') {
      return NextResponse.json(
        { success: false, message: 'taskId is required and must be a string' },
        { status: 400 }
      );
    }

    console.log("Received webhook:", body);
    const taskId = body.taskId.trim();
    if (taskId.length < 8 || taskId.length > 32) {
      return NextResponse.json(
        { success: false, message: 'taskId must be between 8 and 32 characters' },
        { status: 400 }
      );
    }

    // Task data structure
    const taskData: TaskData = {
      taskId: taskId,
      status: "pending",
      progress: 0,
      data: body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store the task in Redis
    await redis.set(`task:${taskId}`, JSON.stringify(taskData));
    console.log("Task stored in Redis")
    return NextResponse.json({
      success: true,
      message: "Task enqueued successfully",
      taskId,
    });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process webhook" },
      { status: 500 }
    );
  }
}

// Get task status endpoint
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json(
        { success: false, message: "Task ID is required" },
        { status: 400 }
      );
    }

    // Get task status from Redis
    const taskData = await redis.get(`task:${taskId}`);

    if (!taskData) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 }
      );
    }

    try {
      const parsedData = typeof taskData === 'string' ? JSON.parse(taskData) : taskData;
      return NextResponse.json({
        success: true,
        task: parsedData,
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching task status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch task status" },
      { status: 500 }
    );
  }
}