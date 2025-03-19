import { NextResponse } from 'next/server'
import { sendMessageToQueue } from '@/lib/azure-queue'

export async function POST(request: Request) {
    try {
        // Get request data
        const body = await request.json()

        // Generate a unique taskId
        const taskId = Math.random().toString(36).substring(7);

        // Send the transcript to Azure Storage Queue
        await sendMessageToQueue({
            transcript: body.url,
            taskId
        });

        return NextResponse.json({ 
            success: true, 
            taskId,
            message: 'Sent to Queue'
          })
        }
        catch (error) {
            console.error('Error processing request:', error)
            return NextResponse.json(
              { error: `${error}` }, 
              { status: 500 }
            )
          }
        }
        
        