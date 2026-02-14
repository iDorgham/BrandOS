import React from 'react';
import { AssetType } from '@/types';

interface AssetTypeButtonProps {
    type: AssetType;
    isSelected: boolean;
    onClick: () => void;
}

export const AssetTypeButton: React.FC<AssetTypeButtonProps> = React.memo(({ type, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`group relative transition-all duration-300 flex flex-col items-center gap-4 md:gap-6 text-center p-6 md:p-8 rounded-none overflow-hidden h-48 md:h-64 justify-center ${isSelected
                ? 'bg-primary/5 shadow-[inset_0_0_40px_rgba(var(--primary-rgb),0.1)]'
                : 'bg-card/20 hover:bg-primary/[0.02]'
                }`}
        >
            {/* HUD Corner Markers */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-l border-t border-primary/30 transition-all duration-300 ${isSelected ? 'w-full h-full border-primary/50' : 'group-hover:border-primary/80 group-hover:w-4 group-hover:h-4'}`} style={{ clipPath: isSelected ? 'none' : 'polygon(0 0, 0 100%, 1px 100%, 1px 1px, 100% 1px, 100% 0)' }} />
            <div className={`absolute top-0 left-0 w-3 h-3 border-l border-t border-primary/30 transition-all duration-300 ${isSelected ? 'border-primary' : 'group-hover:border-primary'}`} />
            <div className={`absolute top-0 right-0 w-3 h-3 border-r border-t border-primary/30 transition-all duration-300 ${isSelected ? 'border-primary' : 'group-hover:border-primary'}`} />
            <div className={`absolute bottom-0 left-0 w-3 h-3 border-l border-b border-primary/30 transition-all duration-300 ${isSelected ? 'border-primary' : 'group-hover:border-primary'}`} />
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-r border-b border-primary/30 transition-all duration-300 ${isSelected ? 'border-primary' : 'group-hover:border-primary'}`} />

            {/* Selection Scanline */}
            {isSelected && (
                <div className="absolute inset-x-0 top-0 h-[1px] bg-primary shadow-[0_0_10px_#00ff00] animate-[scan_2s_ease-in-out_infinite]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent translate-y-[-200%] group-hover:translate-y-[200%] transition-transform duration-1000" />

            <div className={`w-16 h-16 flex items-center justify-center transition-all duration-500 relative ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                <div className={`absolute inset-0 border border-primary/20 rotate-45 transition-all duration-700 ${isSelected ? 'scale-100 opacity-100 rotate-90' : 'scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100'}`} />
                <type.icon size={28} strokeWidth={1} className={`relative z-10 transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
            </div>

            <div className="space-y-3 relative z-10">
                <h4 className={`font-mono font-black text-[12px] tracking-[0.2em] uppercase transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {type.label}
                </h4>
                <div className="flex items-center justify-center gap-2 opacity-60">
                    <span className="w-1 h-1 bg-primary/50 rounded-full" />
                    <p className="text-[9px] text-muted-foreground font-mono tracking-widest uppercase">
                        {type.aspectRatio}
                    </p>
                    <span className="w-1 h-1 bg-primary/50 rounded-full" />
                </div>
            </div>
        </button>
    );
});
