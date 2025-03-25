import { NextResponse } from 'next/server'


export async function POST(request: Request) {
    try {
        
      // Get request data
        const body = await request.json()
        const taskId = body.taskId;
        console.log(taskId);
        // Send the transcript to Taskade webhook
        //const webhookUrl = 'https://www.taskade.com/webhooks/flow/01JPS7AYEE7Z65CKD7WXECGBYA';
        const webhookUrl = 'https://www.taskade.com/webhooks/flow/01JNNWZPBEBK343J2KFM3BRTCB';
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcript: body.url, taskId: taskId }),
        });
        console.log("sent to taskade")
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
        
        