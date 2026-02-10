import React from 'react';
import { Layers } from 'lucide-react';
import { BrandProfile } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface AssetsTabProps {
    brand: BrandProfile;
}

export const AssetsTab: React.FC<AssetsTabProps> = ({ brand }) => {
    const { assets } = useAuth();

    return (
        <div className="p-3 space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Brand Colors */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Brand Palette</span>
                    <span className="text-[8px] font-mono text-primary/60">{brand.palette.length} COLORS</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {brand.palette.map((color: any, i: number) => (
                        <button
                            key={i}
                            title={`${color.label} (${color.hex})`}
                            className="aspect-square rounded-sm border border-border/40 relative group/color hover:scale-110 transition-transform cursor-copy"
                            style={{ backgroundColor: color.hex }}
                            onClick={() => {
                                navigator.clipboard.writeText(color.hex);
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 bg-black/20 text-white text-[8px] font-mono">
                                COPY
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-border/40" />

            {/* Typography */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Typography</span>
                </div>
                <div className="space-y-2">
                    {/* Primary Font */}
                    <div className="p-2 bg-muted/20 border border-border/40 rounded-sm space-y-1">
                        <span className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground/60 block">Primary Display</span>
                        <div className="text-xl font-bold" style={{ fontFamily: brand.typography?.fontFamily || 'Inter' }}>
                            {brand.typography?.fontFamily || 'Inter'}
                        </div>
                        <div className="text-xs opacity-60 truncate">The quick brown fox jumps over the lazy dog.</div>
                    </div>
                </div>
            </div>

            <div className="h-px bg-border/40" />

            {/* Library / Assets Browser */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Library</span>
                    <span className="text-[8px] font-mono text-primary/60">{assets.length} ASSETS</span>
                </div>

                {assets.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                        {assets.map((asset) => (
                            <div
                                key={asset.id}
                                className="aspect-square bg-muted/20 rounded-sm overflow-hidden border border-border/40 hover:border-primary/60 group/asset cursor-grab active:cursor-grabbing relative"
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('application/reactflow/type', 'image');
                                    e.dataTransfer.setData('application/reactflow/url', asset.url);
                                    e.dataTransfer.effectAllowed = 'copy';
                                }}
                            >
                                <img
                                    src={asset.url}
                                    alt={asset.prompt || 'Asset'}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/asset:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/asset:bg-black/20 transition-colors" />
                                <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover/asset:opacity-100 transition-opacity">
                                    <div className="bg-background/90 backdrop-blur-sm px-1.5 py-0.5 rounded-[1px] border border-border/20">
                                        <span className="text-[6px] font-mono font-bold uppercase truncate block text-foreground">
                                            {asset.assetType || 'IMG'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 border border-dashed border-border/40 rounded-sm bg-muted/10 flex flex-col items-center justify-center text-center gap-2">
                        <Layers size={16} className="text-muted-foreground/40" />
                        <span className="text-[8px] font-mono uppercase text-muted-foreground/60">No generated assets found</span>
                    </div>
                )}
            </div>
        </div>
    );
};
