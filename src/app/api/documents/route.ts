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
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    const docData = {
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'PDF',
      date: new Date().toLocaleDateString('es-MX'),
      size: (file.size / 1024 / 1024).toFixed(1) + ' MB'
    };

    const newDoc = await uploadDocument(docData, buffer);
    return NextResponse.json(newDoc, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/documents:', error);
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
  }
}
