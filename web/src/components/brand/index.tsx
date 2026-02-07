import React, { useState } from 'react';
import { Target } from 'lucide-react';

export { default as ReferenceAnalysisModal } from './ReferenceAnalysisModal';
export { DNAVisualization } from './DNAVisualization';

interface NegativeSpaceVisualizerProps {
    percentage: number;
    size?: 'sm' | 'md' | 'lg';
}

export const NegativeSpaceVisualizer: React.FC<NegativeSpaceVisualizerProps> = ({ percentage, size = 'md' }) => {
    const containerClasses = {
        sm: 'w-32 h-32 rounded-lg',
        md: 'w-48 h-48 rounded-xl',
        lg: 'w-72 h-72 rounded-2xl'
    };
    const innerScale = (100 - percentage) / 100;

    return (
        <div className={`${containerClasses[size]} bg-background border border-border flex items-center justify-center overflow-hidden relative shrink-0 shadow-inner group transition-all duration-500 p-8`}>
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(hsl(142.1 70.6% 45.3% / 0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(142.1 70.6% 45.3% / 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <div
                className="bg-primary/5 border border-primary/40 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-md shadow-[0_0_40px_rgba(15,98,254,0.1)] flex flex-col items-center justify-center relative z-10 overflow-hidden"
                style={{ width: `${innerScale * 100}%`, height: `${innerScale * 100}%` }}
            >
                <div className="absolute top-0 left-0 w-full h-px bg-primary/40 animate-[scan_3s_infinite_linear]" />
                {innerScale > 0.2 && (
                    <div className="flex flex-col items-center gap-1 opacity-60 scale-75 md:scale-100">
                        <Target size={14} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-mono text-primary font-bold">{Math.round(innerScale * 100)}% Content</span>
                    </div>
                )}
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-bold text-muted-foreground uppercase tracking-widest bg-background px-2 z-20">
                {percentage}% Empty
            </div>
        </div>
    );
};

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: 'right' | 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    };
    return (
        <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            {children}
            {isVisible && (
                <div className={`absolute z-[100] w-64 p-3 rounded-lg bg-popover border border-border text-popover-foreground shadow-lg pointer-events-none animate-in fade-in zoom-in-95 duration-200 backdrop-blur-md ${positionClasses[position]}`}>
                    <div className="text-xs leading-relaxed">
                        {typeof content === 'string' ? <p>{content}</p> : content}
                    </div>
                </div>
            )}
        </div>
    );
};
