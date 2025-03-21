import { NextResponse } from 'next/server'


export async function POST(request: Request) {
    try {
        
      // Get request data
        const body = await request.json()
        const taskId = Math.random().toString(36).substring(7);
        // Send the transcript to Taskade webhook
        //const webhookUrl = 'https://www.taskade.com/webhooks/flow/01JPS7AYEE7Z65CKD7WXECGBYA';
        const webhookUrl = 'https://www.taskade.com/webhooks/flow/01JPVYF7DR15QS6PNPD268ZHGC';
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcript: body.url, id: taskId }),
        });
        return NextResponse.json({ 
            success: true, 
            response,
            taskId,
            message: `Sent to Taskade AI Agents successfully ${taskId}`
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
        
        