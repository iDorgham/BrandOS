import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
    freezeOnceVisible?: boolean;
}

/**
 * Custom hook for observing intersections
 * @param elementRef - Ref to the element to observe
 * @param options - IntersectionObserver options
 * @returns IntersectionObserverEntry
 */
export function useIntersectionObserver(
    elementRef: React.RefObject<Element>,
    {
        threshold = 0,
        root = null,
        rootMargin = '0px',
        freezeOnceVisible = false,
    }: UseIntersectionObserverProps = {}
): IntersectionObserverEntry | undefined {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    };

    useEffect(() => {
        const node = elementRef?.current;
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();
    }, [elementRef, threshold, root, rootMargin, frozen]);

    return entry;
}
