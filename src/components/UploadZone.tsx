'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import styles from './UploadZone.module.css';

export default function UploadZone() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            // Simulated upload data
            const newDoc = {
                name: file.name,
                type: file.name.split('.').pop()?.toUpperCase() || 'PDF',
                date: new Date().toLocaleDateString('es-MX'),
                size: (file.size / 1024 / 1024).toFixed(1) + ' MB'
            };

            const response = await fetch('/api/documents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDoc),
            });

            if (response.ok) {
                // Trigger a refresh in DocumentTable (using a simple custom event)
                window.dispatchEvent(new Event('document-added'));
                if (fileInputRef.current) fileInputRef.current.value = '';
            } else {
                alert('Error al subir el documento');
            }
        } catch (err) {
            alert('Error de conexión');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={styles.zone} onClick={() => !isUploading && fileInputRef.current?.click()}>
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleUpload}
            />
            {isUploading ? (
                <Loader2 className={`${styles.icon} spin`} size={48} />
            ) : (
                <UploadCloud className={styles.icon} size={48} />
            )}
            <div className={styles.text}>
                {isUploading ? (
                    <span className={styles.highlight}>Procesando documento...</span>
                ) : (
                    <>
                        <span className={styles.highlight}>Haz clic para subir</span> o arrastra y suelta aquí
                    </>
                )}
            </div>
            <p className={styles.subtext}>PDF, DOCX, JPG (Max. 10MB)</p>
        </div>
    );
}
