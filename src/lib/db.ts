import Database from 'better-sqlite3';
import path from 'path';

// Path to the database file in the project root
const dbPath = path.resolve(process.cwd(), 'siged_ia.db');

const db = new Database(dbPath, { verbose: console.log });

// Initialize the database and create tables if they don't exist
export function initDB() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS documents (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            date TEXT NOT NULL,
            size TEXT NOT NULL
        )
    `);

    // Insert initial mock data if the table is empty
    const count = db.prepare('SELECT COUNT(*) as count FROM documents').get() as { count: number };
    
    if (count.count === 0) {
        const insert = db.prepare('INSERT INTO documents (id, name, type, date, size) VALUES (?, ?, ?, ?, ?)');
        
        const initialDocs = [
            { id: '1', name: 'Contrato de Arrendamiento - V.1.pdf', type: 'PDF', date: '15/02/2026', size: '1.2 MB' },
            { id: '2', name: 'Acta Constitutiva - Grupo A.docx', type: 'DOCX', date: '14/02/2026', size: '850 KB' },
            { id: '3', name: 'Presupuesto Trimestral 2026.xlsx', type: 'XLSX', date: '10/02/2026', size: '2.5 MB' },
            { id: '4', name: 'Demanda Laboral - Expediente 45/26.pdf', type: 'PDF', date: '08/02/2026', size: '3.1 MB' },
        ];

        const insertMany = db.transaction((docs) => {
            for (const doc of docs) insert.run(doc.id, doc.name, doc.type, doc.date, doc.size);
        });

        insertMany(initialDocs);
    }
}

// Call initialization
initDB();

export default db;
