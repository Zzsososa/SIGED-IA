import { NextResponse } from 'next/server';
import { getDocuments, uploadDocument } from '@/lib/documentService';

export async function GET() {
  try {
    const docs = await getDocuments();
    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDoc = await uploadDocument(body);
    return NextResponse.json(newDoc, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
  }
}
