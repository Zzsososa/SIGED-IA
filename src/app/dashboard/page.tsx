import React from 'react';
import { Search, Bell } from 'lucide-react';
import FolderGrid from '@/components/FolderGrid';
import DocumentTable from '@/components/DocumentTable';
import UploadZone from '@/components/UploadZone';
import AIChat from '@/components/AIChat';
import styles from './page.module.css';

export default function Dashboard() {
    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Panel Principal</h1>
                    <p className={styles.subtitle}>Bienvenido de vuelta, Dr. Victor</p>
                </div>
                <div className={styles.actions}>
                    <div className={styles.searchBox}>
                        <Search size={18} className={styles.searchIcon} />
                        <input type="text" placeholder="Buscar expedientes..." className={styles.searchInput} />
                    </div>
                    <button className={styles.iconBtn}>
                        <Bell size={20} />
                        <span className={styles.badge}>3</span>
                    </button>
                    <div className={styles.avatar}>V</div>
                </div>
            </header>

            {/* Folders Section */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Carpetas Recientes</h2>
                    <a href="#" className={styles.link}>Ver todas</a>
                </div>
                <FolderGrid />
            </section>

            {/* Main Content Grid */}
            <div className={styles.mainGrid}>

                {/* Left Column: Docs & Upload */}
                <div className={styles.leftCol}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Carga Rápida</h2>
                        <div style={{ height: '180px' }}>
                            <UploadZone />
                        </div>
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Documentos Recientes</h2>
                            <div className={styles.filters}>
                                <span className={`${styles.filter} ${styles.active}`}>Todos</span>
                                <span className={styles.filter}>Contratos</span>
                                <span className={styles.filter}>Actas</span>
                            </div>
                        </div>
                        <DocumentTable />
                    </section>
                </div>

                {/* Right Column: AI Chat */}
                <div className={styles.rightCol}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Asistente Jurídico</h2>
                        <AIChat />
                    </section>
                </div>
            </div>
        </div>
    );
}
