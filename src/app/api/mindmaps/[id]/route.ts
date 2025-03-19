import { NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import { getServerSession } from 'next-auth';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

export async function GET(request: Request, { params }: { params:  Promise<{ id : string }> }) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const containerName = session.user.email.toLowerCase().replace(/[^a-z0-9]/g, '');
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    // Get the HTML content blob
    const { id } = await params;
    const blobName = `${id}.html`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    // Download the HTML content
    const downloadResponse = await blockBlobClient.download();
    const htmlContent = await streamToString(downloadResponse.readableStreamBody || null);

    return NextResponse.json({ htmlContent });
  } catch (error) {
    console.error('Error fetching mindmap:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mindmap' },
      { status: 500 }
    );
  }
}

async function streamToString(readableStream: NodeJS.ReadableStream | null): Promise<string> {
  if (!readableStream) {
    return '';
  }

  const chunks: Buffer[] = [];
  for await (const chunk of readableStream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf-8');
}