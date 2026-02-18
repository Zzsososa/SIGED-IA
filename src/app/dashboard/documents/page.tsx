import React from 'react';
import { Search, FilePlus } from 'lucide-react';
import DocumentTable from '@/components/DocumentTable';
import styles from '../page.module.css';

export default function DocumentsPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Documentos</h1>
                    <p className={styles.subtitle}>Gestión centralizada de expedientes jurídicos</p>
                </div>
                <div className={styles.actions}>
                    <div className={styles.searchBox}>
                        <Search size={18} className={styles.searchIcon} />
                        <input type="text" placeholder="Buscar por nombre o tipo..." className={styles.searchInput} />
                    </div>
                    <button className={styles.iconBtn} style={{ background: 'var(--accent-color)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FilePlus size={18} />
                        <span>Nuevo Doc</span>
                    </button>
                </div>
            </header>

            <section className={styles.section} style={{ marginTop: '2rem' }}>
                <DocumentTable />
            </section>
        </div>
    );
}
