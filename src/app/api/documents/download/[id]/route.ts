import { NextResponse } from 'next/server';
import { getDocumentById } from '@/lib/documentService';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const doc = await getDocumentById(id);

        if (!doc || !doc.file_path) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        const fullPath = path.resolve(process.cwd(), doc.file_path);
        const fileBuffer = await fs.readFile(fullPath);

        const response = new NextResponse(fileBuffer);
        
        // Determine content type based on name
        const ext = path.extname(doc.name).toLowerCase();
        let contentType = 'application/octet-stream';
        if (ext === '.pdf') contentType = 'application/pdf';
        else if (ext === '.docx') contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
        else if (ext === '.png') contentType = 'image/png';

        response.headers.set('Content-Type', contentType);
        response.headers.set('Content-Disposition', `attachment; filename="${doc.name}"`);

        return response;
    } catch (error) {
        console.error('Error in download route:', error);
        return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
    }
}
