import React, { useState, useCallback } from 'react';
import { NodeSettingsSchema, SettingsField } from '../../execution/settingsSchema';
import { Input } from '@/components/ui';

interface DynamicSettingsRendererProps {
    schema: NodeSettingsSchema;
    values: Record<string, unknown>;
    onChange: (key: string, value: unknown) => void;
}

const FieldRenderer: React.FC<{
    field: SettingsField;
    value: unknown;
    onChange: (value: unknown) => void;
}> = ({ field, value, onChange }) => {
    const val = value ?? field.defaultValue;

    switch (field.type) {
        case 'text':
            return (
                <Input
                    value={(val as string) || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={field.placeholder}
                    className="h-7 text-[11px] rounded-none bg-muted/10 border-border/20 focus-visible:ring-0 focus-visible:border-primary/40"
                />
            );

        case 'textarea':
            return (
                <textarea
                    value={(val as string) || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full bg-muted/10 border border-border/20 px-2.5 py-2 text-[11px] outline-none focus:border-primary/40 transition-colors placeholder:text-muted-foreground/20 resize-none font-mono"
                />
            );

        case 'number':
            return (
                <Input
                    type="number"
                    value={val !== undefined ? String(val) : ''}
                    onChange={(e) => onChange(Number(e.target.value))}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className="h-7 text-[11px] rounded-none bg-muted/10 border-border/20 focus-visible:ring-0 focus-visible:border-primary/40 font-mono"
                />
            );

        case 'range': {
            const numVal = typeof val === 'number' ? val : (field.defaultValue as number) || 0;
            return (
                <div className="flex items-center gap-2">
                    <input
                        type="range"
                        min={field.min ?? 0}
                        max={field.max ?? 100}
                        step={field.step ?? 1}
                        value={numVal}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="flex-1 h-1 bg-muted/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-foreground/60 w-10 text-right shrink-0">
                        {typeof numVal === 'number' && numVal % 1 !== 0 ? numVal.toFixed(2) : numVal}
                    </span>
                </div>
            );
        }

        case 'select':
            return (
                <select
                    value={(val as string) || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-7 bg-muted/10 border border-border/20 text-[11px] px-2 outline-none focus:border-primary/40 transition-colors appearance-none cursor-pointer"
                >
                    {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            );

        case 'toggle':
            return (
                <button
                    onClick={() => onChange(!val)}
                    className={`relative w-8 h-4 transition-colors ${val ? 'bg-primary' : 'bg-muted/30'}`}
                >
                    <div className={`absolute top-0.5 w-3 h-3 bg-white transition-transform ${val ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
            );

        case 'color':
            return (
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={(val as string) || '#3b82f6'}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-7 h-7 cursor-pointer border border-border/30"
                    />
                    <Input
                        value={(val as string) || '#3b82f6'}
                        onChange={(e) => onChange(e.target.value)}
                        className="h-7 flex-1 font-mono text-[10px] rounded-none bg-muted/10 border-border/20 focus-visible:ring-0 uppercase"
                    />
                </div>
            );

        case 'tags': {
            const tags = (val as string[]) || [];
            const [inputVal, setInputVal] = useState('');

            return (
                <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-1">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-primary/10 text-primary text-[9px] font-mono cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => onChange(tags.filter((_, j) => j !== i))}
                            >
                                {tag} &times;
                            </span>
                        ))}
                    </div>
                    <Input
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && inputVal.trim()) {
                                onChange([...tags, inputVal.trim()]);
                                setInputVal('');
                            }
                        }}
                        placeholder={field.placeholder || 'Press Enter to add'}
                        className="h-6 text-[10px] rounded-none bg-muted/10 border-border/20 focus-visible:ring-0"
                    />
                </div>
            );
        }

        case 'code':
            return (
                <textarea
                    value={(val as string) || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full bg-zinc-950 border border-border/20 px-2.5 py-2 text-[10px] font-mono outline-none focus:border-primary/40 transition-colors placeholder:text-muted-foreground/20 resize-none text-emerald-400"
                    spellCheck={false}
                />
            );

        case 'key-value':
            return (
                <div className="text-[9px] text-muted-foreground/50">Key-value editor (coming soon)</div>
            );

        default:
            return null;
    }
};

export const DynamicSettingsRenderer: React.FC<DynamicSettingsRendererProps> = ({
    schema,
    values,
    onChange,
}) => {
    return (
        <div className="space-y-3">
            {schema.sections.map((section, si) => (
                <div key={si} className="space-y-2">
                    <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider px-3">
                        {section.label}
                    </span>
                    <div className="px-3 space-y-2.5">
                        {section.fields.map((field) => (
                            <div key={field.key} className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                                        {field.label}
                                    </span>
                                    {field.description && (
                                        <span className="text-[8px] text-muted-foreground/30" title={field.description}>?</span>
                                    )}
                                </div>
                                <FieldRenderer
                                    field={field}
                                    value={values[field.key]}
                                    onChange={(v) => onChange(field.key, v)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
