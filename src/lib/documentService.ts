import db from './db';

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
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

export async function uploadDocument(doc: Omit<Document, 'id'>): Promise<Document> {
  const newId = Math.random().toString(36).substr(2, 9);
  const newDoc = { ...doc, id: newId };
  
  try {
    const stmt = db.prepare('INSERT INTO documents (id, name, type, date, size) VALUES (?, ?, ?, ?, ?)');
    stmt.run(newDoc.id, newDoc.name, newDoc.type, newDoc.date, newDoc.size);
    return newDoc;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}

export async function deleteDocument(id: string): Promise<boolean> {
  try {
    const stmt = db.prepare('DELETE FROM documents WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
}

export async function updateDocument(id: string, updates: Partial<Document>): Promise<Document | null> {
  try {
    // Dynamically build update statement
    const keys = Object.keys(updates).filter(k => k !== 'id');
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
