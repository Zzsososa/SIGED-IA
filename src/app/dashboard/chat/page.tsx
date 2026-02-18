import React from 'react';
import AIChat from '@/components/AIChat';
import styles from '../page.module.css';

export default function ChatPage() {
    return (
        <div className={styles.container} style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Asistente Jurídico IA</h1>
                    <p className={styles.subtitle}>Consulta expedientes y leyes en tiempo real</p>
                </div>
            </header>

            <section className={styles.section} style={{ flex: 1, marginTop: '1rem', overflow: 'hidden' }}>
                <AIChat />
            </section>
        </div>
    );
}
