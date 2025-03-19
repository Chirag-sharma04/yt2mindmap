import { QueueServiceClient } from '@azure/storage-queue';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const queueName = process.env.AZURE_QUEUE_NAME || 'taskade-queue-1';

export async function sendMessageToQueue(message: { transcript: string; taskId: string }): Promise<void> {
    try {
        if (!connectionString) {
            throw new Error('Azure Storage connection string is not configured');
        }

        const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
        const queueClient = queueServiceClient.getQueueClient(queueName);

        // Ensure queue exists
        await queueClient.createIfNotExists();

        // Convert message to base64 to ensure it's properly encoded
        const encodedMessage = Buffer.from(JSON.stringify(message)).toString('base64');
        
        // Send message to queue
        await queueClient.sendMessage(encodedMessage);
        
        console.log(`Message sent to Azure Storage Queue ${queueName} successfully`);
    } catch (error) {
        console.error('Error sending message to Azure Storage Queue:', error);
        throw error;
    }
}