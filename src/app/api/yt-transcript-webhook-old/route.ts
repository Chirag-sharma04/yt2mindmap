import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { url, taskId } = await request.json();

  // Check if the input is a YouTube link
  const isYoutubeLink = url.includes('https://www.youtube.com/');

  const webhookUrl = isYoutubeLink
    ? 'https://www.taskade.com/webhooks/flow/01JNNWZPBEBK343J2KFM3BRTCB'
    : 'https://www.taskade.com/webhooks/flow/01JQB6NWP99Q61ZTVQMFH52XB6';

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcript:url, taskId }),
    });

    if (!response.ok) {
      throw new Error('Webhook request failed');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}