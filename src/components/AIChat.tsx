import React from 'react';
import { Send, Sparkles } from 'lucide-react';
import styles from './AIChat.module.css';

export default function AIChat() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Sparkles size={16} className={styles.sparkle} />
                    <span>Asistente Legal IA</span>
                </div>
            </div>

            <div className={styles.messages}>
                <div className={styles.messageBot}>
                    Hola, soy tu asistente jurídico. ¿En qué puedo ayudarte hoy con tus documentos?
                </div>
                <div className={styles.messageUser}>
                    Necesito un resumen del contrato de servicios.
                </div>
                <div className={styles.messageBot}>
                    Claro. Analizando el documento "Borrador Contrato Servicios.docx"...
                    <br /><br />
                    El contrato establece una duración de 12 meses renovables, con una cláusula de confidencialidad estricta y jurisdicción en...
                </div>
            </div>

            <div className={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Escribe una consulta..."
                    className={styles.input}
                />
                <button className={styles.sendButton}>
                    <Send size={16} />
                </button>
            </div>
        </div>
    );
}
