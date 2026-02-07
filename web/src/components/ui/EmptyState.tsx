import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
    className = ''
}) => {
    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className={`flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border/50 rounded-sm bg-muted/5 ${className}`}
        >
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4 border border-border/50">
                <Icon size={32} className="text-muted-foreground/50" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed mb-6">{description}</p>

            {actionLabel && onAction && (
                <Button
                    onClick={onAction}
                    variant="secondary"
                    size="sm"
                    className="h-8 px-4 text-xs font-bold border border-border hover:bg-muted/50"
                >
                    {actionLabel}
                </Button>
            )}
        </motion.div>
    );
};
