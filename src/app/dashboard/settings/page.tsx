import React from 'react';
import styles from '../page.module.css';

export default function SettingsPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Configuración</h1>
            <p className={styles.subtitle}>Ajustes del sistema y perfiles</p>
            <div style={{ padding: '2rem', border: '1px dashed #333', borderRadius: '12px', marginTop: '2rem', textAlign: 'center', color: '#666' }}>
                Modulo en desarrollo - Próximamente
            </div>
        </div>
    );
}
