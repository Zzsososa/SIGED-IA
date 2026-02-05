import React from 'react';
import { FileText, MoreHorizontal } from 'lucide-react';
import styles from './DocumentTable.module.css';

const documents = [
    { id: 1, name: 'Borrador Contrato Servicios.docx', date: '04 Oct, 2024', size: '2.4 MB', type: 'DOCX' },
    { id: 2, name: 'Declaración Jurada.pdf', date: '03 Oct, 2024', size: '1.1 MB', type: 'PDF' },
    { id: 3, name: 'Notificación Juzgado.pdf', date: '01 Oct, 2024', size: '850 KB', type: 'PDF' },
    { id: 4, name: 'Acta de Reunión.docx', date: '28 Sep, 2024', size: '1.8 MB', type: 'DOCX' },
    { id: 5, name: 'Informe Preliminar Caso X.pdf', date: '25 Sep, 2024', size: '3.2 MB', type: 'PDF' },
];

export default function DocumentTable() {
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
