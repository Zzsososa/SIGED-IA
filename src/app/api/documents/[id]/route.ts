import { NextResponse } from 'next/server';
import { deleteDocument, updateDocument } from '@/lib/documentService';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const success = await deleteDocument(id);
        if (success) {
            return NextResponse.json({ message: 'Document deleted successfully' });
        }
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const updatedDoc = await updateDocument(id, body);
        if (updatedDoc) {
            return NextResponse.json(updatedDoc);
        }
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
    }
}
