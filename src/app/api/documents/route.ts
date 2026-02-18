import { NextResponse } from 'next/server';
import { getDocuments } from '@/lib/documentService';

export async function GET() {
  try {
    const docs = await getDocuments();
    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
