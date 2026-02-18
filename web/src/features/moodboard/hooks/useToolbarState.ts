import { useState, useEffect, useCallback, useRef } from 'react';

export type ToolbarVisibilityState = 'VISIBLE_IDLE' | 'VISIBLE_HOVER' | 'VISIBLE_ACTIVE' | 'HIDDEN';

export const useToolbarState = (timeoutMs: number = 3000) => {
    const [state, setState] = useState<ToolbarVisibilityState>('VISIBLE_IDLE');
    const [activeToolId, setActiveToolId] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        // Don't auto-hide if in ACTIVE or HOVER state (optional: based on requirements)
        // The brief says: Establishing 3-second inactivity timeout with reset on interaction
        timeoutRef.current = setTimeout(() => {
            setState((prev) => (prev !== 'VISIBLE_ACTIVE' ? 'HIDDEN' : prev));
        }, timeoutMs);
    }, [timeoutMs]);

    const onInteraction = useCallback(() => {
        setState((prev) => (prev === 'HIDDEN' ? 'VISIBLE_IDLE' : prev));
        resetTimer();
    }, [resetTimer]);

    const onHoverStart = useCallback((toolId: string) => {
        setState('VISIBLE_HOVER');
        setActiveToolId(toolId);
        resetTimer();
    }, [resetTimer]);

    const onHoverEnd = useCallback(() => {
        // Transfer label logic or simple delay
        // Brief: Transfer label (no hide/show flicker)
        resetTimer();
    }, [resetTimer]);

    const onToolClick = useCallback((toolId: string) => {
        setState('VISIBLE_ACTIVE');
        setActiveToolId(toolId);
        resetTimer();
    }, [resetTimer]);

    const onClickOutside = useCallback(() => {
        setState('HIDDEN');
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        const handleGlobalInteraction = () => onInteraction();
        const handleMouseMove = () => onInteraction();
        const handleClick = (e: MouseEvent) => {
            const isToolbar = (e.target as HTMLElement).closest('[role="toolbar"]');
            if (!isToolbar) onClickOutside();
        };

        window.addEventListener('mousedown', handleClick);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleGlobalInteraction);

        resetTimer();

        return () => {
            window.removeEventListener('mousedown', handleClick);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleGlobalInteraction);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [onInteraction, onClickOutside, resetTimer]);

    return {
        state,
        activeToolId,
        onHoverStart,
        onHoverEnd,
        onToolClick,
        onInteraction
    };
};
