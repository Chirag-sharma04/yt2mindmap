import { NextResponse } from 'next/server';
import { QueueServiceClient } from '@azure/storage-queue';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const queueName = process.env.AZURE_QUEUE_NAME || 'taskade-queue-1';

export async function GET(request: Request, { params }: { params: Promise<{ taskId:string }> }) {
    try {
const taskId = (await params).taskId;
        console.log("Task id:", taskId);

        if (!taskId) {
            return NextResponse.json(
                { error: 'taskId is required' },
                { status: 400 }
            );
        }

        if (!connectionString) {
            throw new Error('Azure Storage connection string is not configured');
        }

        const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
        const queueClient = queueServiceClient.getQueueClient(queueName);

        // Use peekMessages instead of receiveMessages to avoid affecting visibility
        const messages = await queueClient.peekMessages({ numberOfMessages: 32 });
        const messageList = messages.peekedMessageItems;

        if (!messageList.length) {
            return NextResponse.json({
                status: 'no_messages',
                message: 'No messages in queue',
                position: -1
            });
        }

        let position = -1;
        for (let i = 0; i < messageList.length; i++) {
            try {
                const messageContent = messageList[i].messageText;
                const decodedContent = Buffer.from(messageContent, 'base64').toString('utf-8');
                const messageData = JSON.parse(decodedContent);

                if (messageData.taskId === taskId) {
                    position = i + 1;
                    break;
                }
            } catch (error) {
                console.error(`Error processing message ${i}:`, error);
                continue;
            }
        }

        return NextResponse.json({
            status: 'success',
            position,
            total_messages: messageList.length
        });

    } catch (error) {
        console.error('Error checking queue position:', error);
        return NextResponse.json(
            { error: 'Error checking queue position' },
            { status: 500 }
        );
    }
}
