import { NextResponse } from "next/server";

// Define types for webhook data
interface WebhookData {
  event: string;
  data: Record<string, unknown>;
}

// Define processing steps
type ProcessingStep = 'initializing' | 'processing' | 'analyzing' | 'finalizing' | 'completed';

// Temporary in-memory storage (use a database in production)
const webhookData: WebhookData | null = null;
let currentStep: ProcessingStep = 'initializing';

// Function to update processing step
async function updateStep(step: ProcessingStep) {
  currentStep = step;
  return { status: currentStep, progress: getProgressPercentage() };
}

// Helper function to calculate progress percentage
function getProgressPercentage(): number {
  const steps: ProcessingStep[] = ['initializing', 'processing', 'analyzing', 'finalizing', 'completed'];
  const currentIndex = steps.indexOf(currentStep);
  return Math.round((currentIndex / (steps.length - 1)) * 100);
}

export async function POST(): Promise<NextResponse> {
  try {
    // Get the next step based on current step
    const steps: ProcessingStep[] = ['initializing', 'processing', 'analyzing', 'finalizing', 'completed'];
    const currentIndex = steps.indexOf(currentStep);
    const nextStep = steps[Math.min(currentIndex + 1, steps.length - 1)] as ProcessingStep;

    // Update to the next step
    const status = await updateStep(nextStep);
    return NextResponse.json({ success: true, ...status });
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
    const response = {
      status: currentStep,
      progress: getProgressPercentage(),
      data: currentStep === 'completed' ? webhookData : null
    };

    if (currentStep === 'completed') {
      currentStep = 'initializing';
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching task status:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
