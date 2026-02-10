import React, { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';
import { Input } from '../ui';

export const GlobalSearch: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // Shortcut listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                const input = document.getElementById('global-search') as HTMLInputElement;
                input?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="relative group w-full max-w-[400px]">
            <div className={`
                absolute inset-0 bg-primary/5 transition-opacity duration-300 pointer-events-none
                ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
            `} />

            <Search className={`
                absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10
                ${isFocused ? 'text-primary' : 'text-muted-foreground/40 group-hover:text-muted-foreground/60'}
            `} size={14} />

            <Input
                id="global-search"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search brand OS..."
                className={`
                    w-full pl-9 pr-12 h-9 text-[11px] font-medium tracking-wide
                    bg-transparent border-border/50 transition-all duration-300
                    placeholder:text-muted-foreground/30
                    ${isFocused ? 'border-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] pr-12 bg-muted/40' : 'hover:border-border'}
                `}
            />

            <div className={`
                absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1
                px-1.5 py-0.5 rounded border border-border/50 bg-muted/50
                transition-all duration-300 pointer-events-none
                ${isFocused || searchValue ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}
            `}>
                <Command size={8} className="text-muted-foreground/60" />
                <span className="text-[9px] font-black text-muted-foreground/60 tracking-tighter">K</span>
            </div>

            {/* Visual highlight bar */}
            <div className={`
                absolute bottom-0 left-0 h-[1px] bg-primary transition-all duration-500
                ${isFocused ? 'w-full' : 'w-0'}
            `} />
        </div>
    );
};
