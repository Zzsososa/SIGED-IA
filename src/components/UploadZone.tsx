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
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/documents', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Trigger a refresh in DocumentTable (using a simple custom event)
                window.dispatchEvent(new Event('document-added'));
                if (fileInputRef.current) fileInputRef.current.value = '';
            } else {
                const errorData = await response.json();
                alert(`Error al subir el documento: ${errorData.error || 'Error desconocido'}`);
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
            <p className={styles.subtext}>Cualquier archivo (Max. 10MB)</p>
        </div>
    );
}
