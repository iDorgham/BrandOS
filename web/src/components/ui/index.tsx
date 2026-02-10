import React from 'react';

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive', size?: 'sm' | 'md' | 'lg' | 'icon' }>(
    ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90",
            secondary: "bg-transparent border border-foreground text-foreground hover:bg-foreground/10",
            tertiary: "bg-transparent border border-primary text-primary hover:bg-primary/10",
            ghost: "bg-transparent text-foreground hover:bg-foreground/10",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        };
        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
            icon: "h-10 w-10",
        };
        return (
            <button
                ref={ref}
                className={`inline-flex items-center justify-center rounded-none font-normal tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export const Card = ({ className = '', children, onClick, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={`rounded-none border border-border bg-card text-card-foreground ${className} ${onClick ? 'cursor-pointer hover:bg-card/80 transition-colors' : ''}`}
        onClick={onClick}
        {...props}
    >
        {children}
    </div>
);


export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className = '', ...props }, ref) => (
        <input
            ref={ref}
            className={`flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    )
);

Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className = '', ...props }, ref) => (
        <textarea
            ref={ref}
            className={`flex min-h-[80px] w-full rounded-none border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    )
);

Textarea.displayName = 'Textarea';
export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`animate-pulse rounded-none bg-muted ${className}`} {...props} />
);


export * from './EmptyState';
export * from './Switch';
export * from './ThemeToggle';
export * from './Popover';

