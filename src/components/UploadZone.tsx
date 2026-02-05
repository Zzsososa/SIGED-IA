import React from 'react';
import { UploadCloud } from 'lucide-react';
import styles from './UploadZone.module.css';

export default function UploadZone() {
    return (
        <div className={styles.zone}>
            <UploadCloud className={styles.icon} size={48} />
            <div className={styles.text}>
                <span className={styles.highlight}>Haz clic para subir</span> o arrastra y suelta aquí
            </div>
            <p className={styles.subtext}>PDF, DOCX, JPG (Max. 10MB)</p>
        </div>
    );
}
