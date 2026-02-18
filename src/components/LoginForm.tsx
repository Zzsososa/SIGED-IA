"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import Input from './ui/Input';
import Button from './ui/Button';

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('victor@siged.ia');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/dashboard');
            } else {
                setError(data.message || 'Credenciales incorrectas');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
                <h1 className={styles.title}>Iniciar Sesión</h1>
                <p className={styles.subtitle}>Sistema de Gestión Documental SIGED-IA</p>
            </div>

            <div className={styles.fields}>
                <Input
                    label="Usuario (Email)"
                    placeholder="victor@siged.ia"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                />
                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                />
            </div>

            {error && <p className={styles.errorText} style={{ color: '#ff4d4d', fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Accediendo...' : 'Ingresar'}
            </Button>

            <p className={styles.footer}>
                Departamento Jurídico Institucional
            </p>
        </form>
    );
}
