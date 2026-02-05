"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import Input from './ui/Input';
import Button from './ui/Button';

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login delay
        setTimeout(() => {
            router.push('/dashboard');
        }, 800);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
                <h1 className={styles.title}>Iniciar Sesión</h1>
                <p className={styles.subtitle}>Sistema de Gestión Documental SIGED-IA</p>
            </div>

            <div className={styles.fields}>
                <Input
                    label="Usuario"
                    placeholder="admin"
                    defaultValue="admin"
                />
                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    defaultValue="123456"
                />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Accediendo...' : 'Ingresar'}
            </Button>

            <p className={styles.footer}>
                Departamento Jurídico Institucional
            </p>
        </form>
    );
}
