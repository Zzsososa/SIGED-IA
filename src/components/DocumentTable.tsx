'use client';

import React, { useEffect, useState } from 'react';
import { FileText, MoreHorizontal, Trash2, Edit2, Check, X } from 'lucide-react';
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
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');

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

    useEffect(() => {
        fetchDocuments();

        const handleRefresh = () => {
            fetchDocuments();
        };

        window.addEventListener('document-added', handleRefresh);
        return () => window.removeEventListener('document-added', handleRefresh);
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este documento?')) return;
        
        try {
            const response = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setDocuments(documents.filter(doc => doc.id !== id));
            } else {
                alert('Error al eliminar el documento');
            }
        } catch (err) {
            alert('Error de conexión');
        }
    };

    const [editExtension, setEditExtension] = useState('');

    const startEdit = (doc: Document) => {
        setEditingId(doc.id);
        const lastDotIndex = doc.name.lastIndexOf('.');
        if (lastDotIndex !== -1) {
            setEditName(doc.name.substring(0, lastDotIndex));
            setEditExtension(doc.name.substring(lastDotIndex));
        } else {
            setEditName(doc.name);
            setEditExtension('');
        }
    };

    const handleUpdate = async (id: string) => {
        const fullName = `${editName}${editExtension}`;
        try {
            const response = await fetch(`/api/documents/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: fullName }),
            });
            
            if (response.ok) {
                const updatedDoc = await response.json();
                setDocuments(documents.map(doc => doc.id === id ? updatedDoc : doc));
                setEditingId(null);
            } else {
                alert('Error al actualizar el documento');
            }
        } catch (err) {
            alert('Error de conexión');
        }
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Cargando documentos...</div>;
    if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: '#ff4d4d' }}>{error}</div>;

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Tamaño</th>
                        <th style={{ textAlign: 'right' }}>Acciones</th>
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
                                    {editingId === doc.id ? (
                                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <input 
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white', padding: '4px 8px', borderRadius: '4px', flex: 1 }}
                                                autoFocus
                                            />
                                            <span style={{ color: 'var(--text-secondary)', marginLeft: '4px', fontSize: '0.8rem' }}>{editExtension}</span>
                                        </div>
                                    ) : (
                                        <span>{doc.name}</span>
                                    )}
                                </div>
                            </td>
                            <td>{doc.date}</td>
                            <td>{doc.size}</td>
                            <td className={styles.actionCell}>
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    {editingId === doc.id ? (
                                        <>
                                            <button onClick={() => handleUpdate(doc.id)} className={styles.actionButton} title="Guardar">
                                                <Check size={18} style={{ color: '#4caf50' }} />
                                            </button>
                                            <button onClick={() => setEditingId(null)} className={styles.actionButton} title="Cancelar">
                                                <X size={18} style={{ color: '#ff4d4d' }} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEdit(doc)} className={styles.actionButton} title="Editar">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(doc.id)} className={styles.actionButton} title="Eliminar">
                                                <Trash2 size={18} style={{ color: '#ff4d4d' }} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
