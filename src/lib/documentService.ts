import db from './db';
import fs from 'fs/promises';
import path from 'path';

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  file_path?: string | null;
}

export async function getDocuments(): Promise<Document[]> {
  try {
    const stmt = db.prepare('SELECT * FROM documents ORDER BY id DESC');
    const docs = stmt.all() as Document[];
    return docs;
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
}

export async function getDocumentById(id: string): Promise<Document | null> {
  try {
    const stmt = db.prepare('SELECT * FROM documents WHERE id = ?');
    const doc = stmt.get(id) as Document;
    return doc || null;
  } catch (error) {
    console.error('Error getting document by id:', error);
    return null;
  }
}

export async function uploadDocument(
  doc: Omit<Document, 'id' | 'file_path'>, 
  fileBuffer?: Buffer
): Promise<Document> {
  const newId = Math.random().toString(36).substr(2, 9);
  let filePath = null;

  if (fileBuffer) {
    const uploadsDir = path.resolve(process.cwd(), 'uploads');
    // Ensure filename is safe and unique
    const safeName = `${newId}-${doc.name.replace(/[^a-z0-9.]/gi, '_')}`;
    filePath = path.join(uploadsDir, safeName);
    await fs.writeFile(filePath, fileBuffer);
    // Store relative path for portability
    filePath = path.join('uploads', safeName);
  }

  const newDoc = { ...doc, id: newId, file_path: filePath };
  
  try {
    const stmt = db.prepare('INSERT INTO documents (id, name, type, date, size, file_path) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(newDoc.id, newDoc.name, newDoc.type, newDoc.date, newDoc.size, newDoc.file_path);
    return newDoc;
  } catch (error) {
    // Cleanup file if DB insert fails
    if (filePath) {
      await fs.unlink(path.resolve(process.cwd(), filePath)).catch(console.error);
    }
    console.error('Error uploading document:', error);
    throw error;
  }
}

export async function deleteDocument(id: string): Promise<boolean> {
  try {
    // Get file path before deleting from DB
    const doc = await getDocumentById(id);
    
    const stmt = db.prepare('DELETE FROM documents WHERE id = ?');
    const result = stmt.run(id);
    
    if (result.changes > 0 && doc?.file_path) {
      const fullPath = path.resolve(process.cwd(), doc.file_path);
      await fs.unlink(fullPath).catch(err => console.error('Error deleting file from disk:', err));
    }
    
    return result.changes > 0;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
}

export async function updateDocument(id: string, updates: Partial<Document>): Promise<Document | null> {
  try {
    const keys = Object.keys(updates).filter(k => k !== 'id' && k !== 'file_path');
    if (keys.length === 0) return null;

    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const values = keys.map(k => (updates as any)[k]);
    values.push(id);

    const stmt = db.prepare(`UPDATE documents SET ${setClause} WHERE id = ?`);
    const result = stmt.run(...values);

    if (result.changes > 0) {
        const updated = db.prepare('SELECT * FROM documents WHERE id = ?').get(id) as Document;
        return updated;
    }
    return null;
  } catch (error) {
    console.error('Error updating document:', error);
    return null;
  }
}
