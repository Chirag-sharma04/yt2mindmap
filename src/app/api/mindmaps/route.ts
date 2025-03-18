import { NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import { getServerSession } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, youtubeUrl, htmlContent } = await request.json();
    const containerName = session.user.email.toLowerCase().replace(/[^a-z0-9]/g, '');
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    // Create container if it doesn't exist
    await containerClient.createIfNotExists();

    const mindmapId = uuidv4();
    const blobName = `${mindmapId}.html`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the mindmap HTML content
    await blockBlobClient.upload(htmlContent, htmlContent.length);

    // Save metadata in a separate blob
    const metadataBlobClient = containerClient.getBlockBlobClient(`${mindmapId}.json`);
    const metadata = {
      id: mindmapId,
      title,
      youtubeUrl,
      createdAt: new Date().toISOString(),
    };

    await metadataBlobClient.upload(
      JSON.stringify(metadata),
      JSON.stringify(metadata).length
    );

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error saving mindmap:', error);
    return NextResponse.json(
      { error: 'Failed to save mindmap' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const containerName = session.user.email.toLowerCase().replace(/[^a-z0-9]/g, '');
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // List all JSON metadata blobs
    const mindmaps = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      if (blob.name.endsWith('.json')) {
        const blobClient = containerClient.getBlockBlobClient(blob.name);
        const downloadResponse = await blobClient.download();
        const metadata = await streamToString(downloadResponse.readableStreamBody);
        mindmaps.push(JSON.parse(metadata));
      }
    }

    return NextResponse.json(mindmaps.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  } catch (error) {
    console.error('Error fetching mindmaps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mindmaps' },
      { status: 500 }
    );
  }
}

async function streamToString(readableStream: NodeJS.ReadableStream | null): Promise<string> {
  if (!readableStream) {
    return '';
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of readableStream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8');
}