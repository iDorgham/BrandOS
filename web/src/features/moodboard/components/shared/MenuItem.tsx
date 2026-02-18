
import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface MenuItemProps {
    icon?: React.ReactNode;
    label: string;
    shortcut?: string;
    onClick?: (e: React.MouseEvent) => void;
    variant?: 'default' | 'danger' | 'warning';
    disabled?: boolean;
    hasSubmenu?: boolean;
    className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    icon,
    label,
    shortcut,
    onClick,
    variant = 'default',
    disabled,
    hasSubmenu,
    className = ''
}) => {
    // Carbon Design System Colors mapped to Tailwind
    const variants = {
        default: 'text-[var(--cds-text-primary)] hover:bg-[var(--cds-layer-hover)] hover:text-[var(--cds-text-primary)]',
        danger: 'text-[var(--cds-support-error)] hover:bg-[var(--cds-support-error)]/10 hover:text-[var(--cds-support-error)]',
        warning: 'text-[var(--cds-support-warning)] hover:bg-[var(--cds-support-warning)]/10 hover:text-[var(--cds-support-warning)]'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full flex items-center gap-3 px-4 py-2 text-[13px] font-normal tracking-wide transition-colors
                disabled:opacity-40 disabled:pointer-events-none outline-none focus-visible:ring-1 focus-visible:ring-[var(--cds-interactive-01)] focus-visible:ring-inset
                ${variants[variant]}
                ${className}
            `}
        >
            {icon && (
                <span className="w-4 h-4 flex items-center justify-center shrink-0 opacity-80">
                    {icon}
                </span>
            )}

            <span className="flex-1 text-left truncate">{label}</span>

            {(shortcut || hasSubmenu) && (
                <div className="flex items-center ml-auto pl-4 text-xs opacity-50 font-mono text-[var(--cds-text-secondary)]">
                    {shortcut && <span>{shortcut}</span>}
                    {hasSubmenu && <ChevronRight size={14} className="ml-1" />}
                </div>
            )}
        </button>
    );
};

export const MenuDivider: React.FC = () => (
    <div className="h-px bg-[var(--cds-layer-03)] my-1 mx-0" />
);

export const MenuSection: React.FC<{ label: string }> = ({ label }) => (
    <div className="px-4 py-1.5 text-[10px] font-semibold text-[var(--cds-text-placeholder)] uppercase tracking-widest mt-1">
        {label}
    </div>
);
