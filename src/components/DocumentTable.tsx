'use client';

import React, { useEffect, useState } from 'react';
import { FileText, MoreHorizontal } from 'lucide-react';
import styles from './DocumentTable.module.css';

interface Document {
    id: string;
    name: string;
    date: string;
    size: string;
    type: string;
}

export default function DocumentTable() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch('/api/documents');
                if (!response.ok) throw new Error('Failed to fetch documents');
                const data = await response.json();
                setDocuments(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    if (loading) return <div className={styles.loading}>Cargando documentos...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Tamaño</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc) => (
                        <tr key={doc.id}>
                            <td>
                                <div className={styles.nameCell}>
                                    <div className={styles.iconBox}>
                                        <FileText size={16} />
                                    </div>
                                    <span>{doc.name}</span>
                                </div>
                            </td>
                            <td>{doc.date}</td>
                            <td>{doc.size}</td>
                            <td className={styles.actionCell}>
                                <button className={styles.actionButton}>
                                    <MoreHorizontal size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
