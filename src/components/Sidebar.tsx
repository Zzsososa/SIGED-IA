import React from 'react';
import Link from 'next/link';
import {
    Home,
    FileText,
    Folder,
    MessageSquare,
    Users,
    Settings,
    LogOut
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
    { icon: Home, label: 'Inicio', href: '/dashboard' },
    { icon: FileText, label: 'Documentos', href: '/dashboard/documents' },
    { icon: Folder, label: 'Carpetas', href: '/dashboard/folders' },
    { icon: MessageSquare, label: 'Chat IA', href: '/dashboard/chat' },
    { icon: Users, label: 'Usuarios', href: '/dashboard/users' },
    { icon: Settings, label: 'Configuración', href: '/dashboard/settings' },
];

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <div className={styles.logoIndicator}></div>
                <h1 className={styles.logoText}>SIGED-IA</h1>
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className={styles.navItem}>
                        <item.icon className={styles.icon} size={20} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.footer}>
                <Link href="/" className={styles.navItem}>
                    <LogOut className={styles.icon} size={20} />
                    <span>Cerrar Sesión</span>
                </Link>
            </div>
        </aside>
    );
}
