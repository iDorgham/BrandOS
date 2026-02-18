
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface DropdownMenuProps {
    isOpen: boolean;
    onClose: () => void;
    anchorEl?: HTMLElement | null;
    position?: { x: number; y: number };
    children: React.ReactNode;
    className?: string;
    width?: number; // Optional fixed width
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    isOpen,
    onClose,
    anchorEl,
    position,
    children,
    className = '',
    width = 220
}) => {
    const menuRef = useRef<HTMLDivElement>(null);

    // Calculate position
    const getStyle = (): React.CSSProperties => {
        if (position) {
            return {
                top: position.y,
                left: position.x,
                width
            };
        }

        if (anchorEl) {
            const rect = anchorEl.getBoundingClientRect();
            return {
                top: rect.bottom + 4,
                left: rect.left,
                width
            };
        }

        return { width };
    };

    // Handle click outside & escape
    useEffect(() => {
        if (!isOpen) return;

        const handleMouseDown = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
                (!anchorEl || !anchorEl.contains(e.target as Node))) {
                onClose();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', onClose, { capture: true }); // Close on scroll
        window.addEventListener('resize', onClose); // Close on resize

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('scroll', onClose, { capture: true });
            window.removeEventListener('resize', onClose);
        };
    }, [isOpen, onClose, anchorEl]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9998] bg-transparent"
            // Transparent overlay to catch clicks outside if needed, 
            // though mousedown handler above handles specific outside clicks.
            // This is primarily to block interaction with background if desired, 
            // but for toolbars we usually want modeless feels.
            // For now, let's keep it pointer-events-none for the overlay and handle clicks via event listener
            style={{ pointerEvents: 'none' }}
        >
            <div
                ref={menuRef}
                style={getStyle()}
                className={`
                    fixed z-[9999] bg-[var(--cds-layer-02)] border border-[var(--cds-layer-03)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]
                    rounded-sm py-1 animate-in fade-in zoom-in-95 duration-100 ease-out origin-top-left
                    pointer-events-auto flex flex-col backdrop-blur-xl
                    ${className}
                `}
            >
                {children}
            </div>
        </div>,
        document.body
    );
};
