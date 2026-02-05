import React from 'react';
import { Folder } from 'lucide-react';
import styles from './FolderGrid.module.css';

const folders = [
    { id: 1, name: 'Contratos 2024', count: 12 },
    { id: 2, name: 'Demandas Civiles', count: 8 },
    { id: 3, name: 'Actas Administrativas', count: 24 },
    { id: 4, name: 'Recursos Humanos', count: 5 },
];

export default function FolderGrid() {
    return (
        <div className={styles.grid}>
            {folders.map((folder) => (
                <div key={folder.id} className={styles.card}>
                    <div className={styles.iconContainer}>
                        <Folder size={24} className={styles.icon} />
                    </div>
                    <div className={styles.info}>
                        <h3 className={styles.name}>{folder.name}</h3>
                        <span className={styles.count}>{folder.count} documentos</span>
                    </div>
                </div>
            ))}
            <div className={`${styles.card} ${styles.addCard}`}>
                <span className={styles.plus}>+</span>
                <span className={styles.addText}>Nueva Carpeta</span>
            </div>
        </div>
    );
}
