import React from 'react';
import { LucideIcon } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../../../components/ui/tooltip";

interface ToolbarButtonProps {
    id: string;
    label: string;
    icon: LucideIcon;
    shortcut?: string;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
    showLabel?: boolean;
    onHover?: (id: string) => void;
    onLeave?: () => void;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    id,
    label,
    icon: Icon,
    shortcut,
    onClick,
    isActive = false,
    isDisabled = false,
    showLabel = false,
    onHover,
    onLeave,
}) => {
    return (
        <TooltipProvider>
            <Tooltip open={showLabel} delayDuration={0}>
                <TooltipTrigger asChild>
                    <button
                        onClick={(e) => {
                            e.currentTarget.blur();
                            if (!isDisabled) onClick();
                        }}
                        onMouseEnter={() => onHover?.(id)}
                        onMouseLeave={onLeave}
                        disabled={isDisabled}
                        className={`
                            relative flex items-center justify-center min-w-[32px] h-7 px-2 rounded-md
                            transition-all duration-200 ease-in-out group
                            ${isDisabled
                                ? 'opacity-40 cursor-not-allowed grayscale'
                                : isActive
                                    ? 'bg-[var(--cds-interactive-01)]/20 text-[var(--cds-interactive-01)] shadow-sm'
                                    : 'text-[var(--cds-text-secondary)] hover:text-[var(--cds-text-primary)] hover:bg-[var(--cds-layer-hover)]'}
                        `}
                    >
                        <Icon
                            size={16}
                            strokeWidth={1.5}
                            className={`
                                transition-transform duration-200 
                                ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(66,153,225,0.4)]' : 'group-hover:scale-105'}
                            `}
                        />

                        {isActive && (
                            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--cds-interactive-01)] shadow-[0_0_4px_var(--cds-interactive-01)]" />
                        )}
                    </button>
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    className="flex flex-col gap-0.5 items-center bg-[var(--cds-layer-01)] text-[var(--cds-text-primary)] border-[var(--cds-layer-03)] backdrop-blur-xl py-1.5 px-3 shadow-xl"
                >
                    <span className="text-[12px] font-medium leading-tight">{label}</span>
                    {shortcut && (
                        <span className="text-[10px] text-[var(--cds-text-secondary)] font-mono opacity-80 uppercase tracking-widest">
                            {shortcut.replace('Ctrl', '⌘').replace('+', ' ')}
                        </span>
                    )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export const ToolbarSeparator: React.FC = () => (
    <div className="w-[1px] h-6 bg-[var(--cds-layer-03)] mx-2 opacity-50 self-center" />
);

export const ToolbarGroup: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/5 transition-colors duration-300 ${className}`} role="group">
        {children}
    </div>
);

interface ToolbarSearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const ToolbarSearchInput: React.FC<ToolbarSearchInputProps> = ({
    value,
    onChange,
    placeholder = "Search...",
}) => {
    return (
        <div className="relative group/search w-48 transition-all focus-within:w-64">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="
                    w-full h-7 pl-8 pr-2 rounded-md bg-white/5 border border-white/5 
                    text-[12px] text-[var(--cds-text-primary)] placeholder:text-[var(--cds-text-secondary)]
                    focus:bg-white/10 focus:border-[var(--cds-interactive-01)] focus:outline-none 
                    transition-all duration-200
                "
            />
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
            </div>
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
};

interface ToolbarSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string; style?: React.CSSProperties }[];
    placeholder?: string;
    width?: string;
}

export const ToolbarSelect: React.FC<ToolbarSelectProps> = ({
    value,
    onChange,
    options,
    placeholder = "Select...",
    width = "w-32"
}) => {
    return (
        <div className={`relative group/select ${width}`}>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                    w-full h-7 pl-2 pr-6 rounded-md bg-white/5 border border-white/5 appearance-none
                    text-[12px] text-[var(--cds-text-primary)]
                    focus:bg-white/10 focus:border-[var(--cds-interactive-01)] focus:outline-none
                    hover:bg-white/10 transition-all cursor-pointer truncate
                "
                style={{ fontFamily: options.find(o => o.value === value)?.label }}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value} style={opt.style}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down"
                >
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </div>
        </div>
    );
};
