import { useEffect } from 'react';

/**
 * Custom hook for throttling resize events
 * @param callback - Function to call on resize
 * @param delay - Delay in milliseconds (default: 150ms)
 */
export function useThrottledResize(callback: () => void, delay: number = 150): void {
    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
        let lastRan: number = 0;

        const handleResize = () => {
            const now = Date.now();

            if (!lastRan) {
                // First call
                callback();
                lastRan = now;
            } else {
                // Clear existing timeout
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }

                // Throttle subsequent calls
                const timeSinceLastRan = now - lastRan;
                if (timeSinceLastRan >= delay) {
                    callback();
                    lastRan = now;
                } else {
                    timeoutId = setTimeout(() => {
                        callback();
                        lastRan = Date.now();
                    }, delay - timeSinceLastRan);
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [callback, delay]);
}
