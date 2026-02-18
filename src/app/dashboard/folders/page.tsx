import React from 'react';
import { Search, FolderPlus } from 'lucide-react';
import FolderGrid from '@/components/FolderGrid';
import styles from '../page.module.css';

export default function FoldersPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Carpetas</h1>
                    <p className={styles.subtitle}>Organización por expedientes y categorías</p>
                </div>
                <div className={styles.actions}>
                    <div className={styles.searchBox}>
                        <Search size={18} className={styles.searchIcon} />
                        <input type="text" placeholder="Buscar carpeta..." className={styles.searchInput} />
                    </div>
                    <button className={styles.iconBtn} style={{ background: 'var(--accent-color)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FolderPlus size={18} />
                        <span>Nueva Carpeta</span>
                    </button>
                </div>
            </header>

            <section className={styles.section} style={{ marginTop: '2rem' }}>
                <FolderGrid />
            </section>
        </div>
    );
}
