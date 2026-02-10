import React, { useState } from 'react';
import { Button, Card, Input, Switch } from '@/components/ui';
import {
    Plus,
    Layers,
    Calendar,
    Edit3,
    Trash2,
    ChevronRight,
    Sparkles,
    Grid3X3
} from 'lucide-react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import { Moodboard } from '@/types';

interface MoodboardSelectorProps {
    moodboards: Moodboard[];
    loading: boolean;
    onSelect: (moodboard: Moodboard) => void;
    onCreate: (name: string, description?: string) => Promise<Moodboard>;
    onToggleActive: (moodboardId: string, isActive: boolean) => Promise<void>;
    onDelete: (moodboardId: string) => Promise<void>;
}

export const MoodboardSelector: React.FC<MoodboardSelectorProps> = ({
    moodboards,
    loading,
    onSelect,
    onCreate,
    onToggleActive,
    onDelete,
}) => {
    const [isCreating, setIsCreating] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [createLoading, setCreateLoading] = useState(false);

    const handleCreate = async () => {
        if (!newName.trim()) return;

        try {
            setCreateLoading(true);
            const moodboard = await onCreate(newName.trim(), newDescription.trim() || undefined);
            setNewName('');
            setNewDescription('');
            setIsCreating(false);
            // Auto-select the newly created moodboard
            onSelect(moodboard);
        } catch (error) {
            // Error handled by hook
        } finally {
            setCreateLoading(false);
        }
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-muted-foreground">Loading moodboards...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-background">
            <ViewHeader
                icon={Layers}
                title="Moodboards"
                subtitle="Visual Orchestration"
                badge="Semantic Synthesis Registry"
                rightContent={
                    !isCreating && (
                        <Button
                            onClick={() => setIsCreating(true)}
                            className="gap-3 h-11 px-6 text-[10px] font-black tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
                        >
                            <Plus size={16} />
                            New
                        </Button>
                    )
                }
            />

            <div className="max-w-[1400px] mx-auto space-y-12 p-12">

                {/* Create Form */}
                {isCreating && (
                    <Card className="p-8 border-primary/30 bg-card/40 backdrop-blur-xl rounded-none animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl">
                        <div className="flex items-start gap-6">
                            <div className="p-3 bg-primary/20 border border-primary/40 rounded-none">
                                <Sparkles size={24} className="text-primary" />
                            </div>
                            <div className="flex-1 space-y-6">
                                <div>
                                    <h3 className="text-[10px] font-mono font-black tracking-[0.2em] uppercase text-primary mb-3">Initiate_New_Board</h3>
                                    <Input
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="Moodboard name (e.g., Summer Campaign 2024)"
                                        className="h-12 bg-muted/20 border-border/40 rounded-none font-mono text-xs tracking-widest uppercase"
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={newDescription}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                        placeholder="Description (optional)"
                                        className="h-12 bg-muted/20 border-border/40 rounded-none font-mono text-xs tracking-widest uppercase"
                                    />
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <Button
                                        onClick={handleCreate}
                                        disabled={!newName.trim() || createLoading}
                                        className="gap-3 h-11 px-8 text-[10px] font-black tracking-widest uppercase"
                                    >
                                        {createLoading ? (
                                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Plus size={16} />
                                        )}
                                        Create
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            setIsCreating(false);
                                            setNewName('');
                                            setNewDescription('');
                                        }}
                                        className="h-11 px-6 text-[10px] font-black tracking-widest uppercase opacity-60 hover:opacity-100"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Moodboard List */}
                {moodboards.length === 0 && !isCreating ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-border/30 bg-muted/5">
                        <div className="p-8 bg-muted/10 border border-border/20 rounded-none mb-8 opacity-20">
                            <Grid3X3 size={64} className="text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-black tracking-[0.3em] uppercase mb-3 opacity-40">Registry_Empty</h3>
                        <p className="text-[9px] font-mono text-muted-foreground/60 max-w-[280px] mb-8 uppercase tracking-widest leading-relaxed">
                            No visual orchestration boards detected in the current brand context.
                        </p>
                        <Button onClick={() => setIsCreating(true)} className="gap-3 h-11 px-10 text-[10px] font-black tracking-widest uppercase">
                            <Plus size={16} />
                            Create First Board
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {moodboards.map((moodboard) => (
                            <Card
                                key={moodboard.id}
                                className={`
                                  group relative h-20 overflow-hidden cursor-pointer transition-all duration-300 rounded-none
                                  bg-card/30 backdrop-blur-sm border-border/40
                                  hover:bg-muted/10 hover:border-primary/40 hover:translate-x-1
                                  ${!moodboard.isActive ? 'opacity-50 grayscale' : ''}
                                `}
                                onClick={() => onSelect(moodboard)}
                            >
                                {/* Active Status Indicator Strip */}
                                <div className={`absolute top-0 left-0 w-1 h-full ${moodboard.isActive ? 'bg-primary' : 'bg-muted-foreground/20'}`} />

                                <div className="flex items-center h-full px-8 gap-12">
                                    {/* Section 1: Name & Desc */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-black text-xs uppercase tracking-widest truncate">
                                                {moodboard.name}
                                            </h3>
                                            {!moodboard.isActive && (
                                                <span className="text-[7px] font-mono font-black uppercase tracking-[0.2em] px-1.5 py-0.5 bg-muted/40 text-muted-foreground border border-border/30">
                                                    Inactive
                                                </span>
                                            )}
                                        </div>
                                        {moodboard.description && (
                                            <p className="text-[8px] font-mono font-medium text-muted-foreground/60 uppercase tracking-widest truncate mt-1">
                                                {moodboard.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Section 2: Metadata (Middle-Right) */}
                                    <div className="hidden lg:flex items-center gap-12 text-[8px] font-mono font-bold tracking-[0.15em] uppercase text-muted-foreground/50">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[7px] text-muted-foreground/30">Created</span>
                                            <div className="flex items-center gap-2 text-muted-foreground/70">
                                                <Calendar size={10} className="opacity-40" />
                                                {formatDate(moodboard.createdAt)}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1 w-24">
                                            <span className="text-[7px] text-muted-foreground/30">Elements</span>
                                            <div className="flex items-center gap-2 text-muted-foreground/70">
                                                <Layers size={10} className="opacity-40" />
                                                {moodboard.nodes?.length || 0} Nodes
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3: Actions (Far-Right) */}
                                    <div className="flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
                                        <div className="h-8 w-[1px] bg-border/20 hidden md:block" />

                                        <div className="flex items-center gap-4 group-hover:opacity-100 transition-opacity">
                                            <div className="flex flex-col items-end gap-1 px-4">
                                                <span className="text-[6px] font-mono font-black uppercase tracking-widest opacity-20 group-hover:opacity-40">Status</span>
                                                <Switch
                                                    checked={moodboard.isActive}
                                                    onCheckedChange={(checked) => onToggleActive(moodboard.id, checked)}
                                                    className="scale-75 data-[state=checked]:bg-primary/80"
                                                />
                                            </div>

                                            <button
                                                onClick={() => onDelete(moodboard.id)}
                                                className="w-10 h-10 flex items-center justify-center bg-muted/5 hover:bg-rose-500/10 hover:text-rose-500 border border-border/20 hover:border-rose-500/30 transition-all rounded-none opacity-40 hover:opacity-100"
                                                title="Delete Moodboard"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>

                                        <div className="w-8 h-8 flex items-center justify-center bg-primary/5 border border-primary/20 group-hover:bg-primary transition-all duration-300">
                                            <ChevronRight size={14} className="group-hover:text-primary-foreground group-hover:translate-x-0.5 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
