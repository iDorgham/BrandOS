import React, { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    placeholderColor?: string;
    threshold?: number;
    rootMargin?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className,
    placeholderColor = 'bg-muted/20',
    threshold = 0.1,
    rootMargin = '200px',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);

    const entry = useIntersectionObserver(imgRef, {
        threshold,
        rootMargin,
        freezeOnceVisible: true,
    });

    useEffect(() => {
        if (entry?.isIntersecting) {
            setShouldLoad(true);
        }
    }, [entry?.isIntersecting]);

    return (
        <div
            ref={imgRef}
            className={`relative overflow-hidden ${!isLoaded ? placeholderColor : ''} ${className}`}
        >
            {shouldLoad && (
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    {...props}
                />
            )}

            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse" />
                </div>
            )}
        </div>
    );
};
