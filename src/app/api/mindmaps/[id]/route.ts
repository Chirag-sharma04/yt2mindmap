import { NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import { getServerSession } from 'next-auth';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, youtubeUrl, htmlContent } = await request.json();
    const resolvedParams = await params; // Await the Promise to get { id: string }
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: 'Mindmap ID is required' }, { status: 400 });
    }

    const containerName = 'html';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const userEmail = session.user.email.toLowerCase();

    // Update metadata
    const metadataBlobName = `user-${userEmail.split("@")[0]}/${id}.json`;
    const metadataBlobClient = containerClient.getBlockBlobClient(metadataBlobName);
    const metadata = {
      id,
      title,
      youtubeUrl,
      createdAt: new Date().toISOString(),
    };
    await metadataBlobClient.upload(
      JSON.stringify(metadata),
      JSON.stringify(metadata).length
    );

    // Update HTML content
    const htmlBlobName = `user-${userEmail.split("@")[0]}/${id}.html`;
    const htmlBlobClient = containerClient.getBlockBlobClient(htmlBlobName);
    await htmlBlobClient.upload(htmlContent, htmlContent.length);

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error updating mindmap:', error);
    return NextResponse.json(
      { error: 'Failed to update mindmap' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params; // Await the Promise to get { id: string }
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: 'Mindmap ID is required' }, { status: 400 });
    }

    const containerName = 'html';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const userEmail = session.user.email.toLowerCase();

    // Get metadata
    const metadataBlobName = `user-${userEmail.split("@")[0]}/${id}.json`;
    const metadataBlobClient = containerClient.getBlockBlobClient(metadataBlobName);
    const metadataResponse = await metadataBlobClient.download();
    const metadataContent = await streamToString(metadataResponse.readableStreamBody || null);
    if (!metadataContent) {
      return NextResponse.json({ error: 'Mindmap not found' }, { status: 404 });
    }
    const metadata = JSON.parse(metadataContent);

    // Get HTML content
    const htmlBlobName = `user-${userEmail.split("@")[0]}/${id}.html`;
    const htmlBlobClient = containerClient.getBlockBlobClient(htmlBlobName);
    const htmlResponse = await htmlBlobClient.download();
    const htmlContent = await streamToString(htmlResponse.readableStreamBody || null);
    if (!htmlContent) {
      return NextResponse.json({ error: 'Mindmap HTML content not found' }, { status: 404 });
    }

    return NextResponse.json({
      metadata,
      htmlContent,
    });
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