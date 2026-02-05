import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    children: React.ReactNode;
    className?: string;
}

export default function Button({
    variant = 'primary',
    children,
    className = '',
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
