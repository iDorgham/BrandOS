import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
            ) : (
                <Moon size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
            )}
        </button>
    );
};
