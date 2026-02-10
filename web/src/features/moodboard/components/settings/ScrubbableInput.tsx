import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '@/components/ui';

interface ScrubbableInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    prefix?: string;
    className?: string;
}

export const ScrubbableInput: React.FC<ScrubbableInputProps> = ({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    unit = '',
    prefix = '',
    className = ''
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const startX = useRef(0);
    const startValue = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (isEditing) return;
        setIsDragging(true);
        startX.current = e.clientX;
        startValue.current = value;
        document.body.style.cursor = 'ew-resize';
    }, [value, isEditing]);

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;

        const delta = e.clientX - startX.current;
        let scale = step;

        if (e.shiftKey) scale *= 10;
        if (e.altKey) scale *= 0.1;

        let newValue = startValue.current + (delta * scale);

        if (min !== undefined) newValue = Math.max(min, newValue);
        if (max !== undefined) newValue = Math.min(max, newValue);

        // Round to 1 decimal place if step is small, else round to step
        const precision = step < 1 ? 2 : 0;
        onChange(Number(newValue.toFixed(precision)));
    }, [isDragging, step, min, max, onChange]);

    const onMouseUp = useCallback(() => {
        setIsDragging(false);
        document.body.style.cursor = 'default';
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        } else {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging, onMouseMove, onMouseUp]);

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsEditing(false);
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
            let newVal = val;
            if (min !== undefined) newVal = Math.max(min, newVal);
            if (max !== undefined) newVal = Math.min(max, newVal);
            onChange(newVal);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
        }
    };

    return (
        <div
            ref={containerRef}
            className={`flex flex-col gap-1.5 select-none group ${className}`}
        >
            <span
                className={`text-[12px] font-medium transition-colors cursor-ew-resize px-0.5 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`}
                onMouseDown={onMouseDown}
                onClick={() => !isDragging && setIsEditing(true)}
            >
                {label}
            </span>

            <div className={`relative overflow-hidden bg-muted/20 hover:bg-muted/30 transition-all h-9 flex items-center border-b-2 ${isDragging || isEditing ? 'border-primary' : 'border-border/40'}`}>
                {isEditing ? (
                    <Input
                        autoFocus
                        type="number"
                        defaultValue={value}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        className="h-full w-full bg-transparent border-none text-[13px] font-mono px-3 focus-visible:ring-0"
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-between px-3 cursor-ew-resize"
                        onMouseDown={onMouseDown}
                        onClick={() => setIsEditing(true)}
                    >
                        <span className="text-[13px] font-mono text-foreground font-medium">
                            {prefix}{value}
                        </span>

                        {unit && (
                            <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-wider">{unit}</span>
                        )}

                        {/* Drag Indicator Bar */}
                        {isDragging && (
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary/30" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
