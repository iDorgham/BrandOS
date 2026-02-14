import React from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Download, RefreshCw, Archive, Shield, Zap } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { GeneratedAsset } from '@/types';
import { downloadFile } from '@/utils';
import { LazyImage } from '@/components/ui/LazyImage';

interface LibraryViewProps {
    assets: GeneratedAsset[];
    onRefine: (asset: GeneratedAsset, customFeedback?: string) => void;
}

export const LibraryView = React.memo<LibraryViewProps>(({ assets, onRefine }) => {
    const [selectedAssetId, setSelectedAssetId] = React.useState<string | null>(null);

    const handleExport = (asset: GeneratedAsset) => {
        downloadFile(asset.url, `brand-os-${asset.id}.png`);
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            className="w-full space-y-0 relative antialiased"
        >
            <ViewHeader
                icon={Archive}
                title="Brand"
                subtitle="Vault"
                badge="Asset Repository"
                rightContent={
                    <>
                        <div className="text-right hidden md:block">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Vault integrity</p>
                            <div className="flex items-center justify-end gap-2 text-emerald-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-xs font-mono font-black tracking-widest uppercase">Secured</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-border/20 hidden md:block" />
                        <div className="text-right">
                            <p className="text-[8px] font-mono uppercase tracking-[0.4em] opacity-40 mb-1">Sync status</p>
                            <p className="text-xs font-mono font-black tracking-widest text-primary uppercase">Active_v0.9</p>
                        </div>
                    </>
                }
            />

            <div className="w-full px-4 md:px-8 py-8 md:py-12 space-y-12 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 md:gap-6 pb-20">
                    {assets.length === 0 ? (
                        <div className="col-span-full py-40 text-center opacity-40">
                            <ImageIcon size={64} className="mx-auto mb-6 text-muted-foreground" strokeWidth={1} />
                            <h3 className="text-[18px] font-medium text-foreground tracking-tight uppercase">Vault Empty</h3>
                            <p className="text-[12px] text-muted-foreground mt-2">No generated assets found in the current workspace.</p>
                        </div>
                    ) : assets.map(asset => (
                        <Card key={asset.id} className="overflow-hidden group hover:border-primary/50 transition-all flex flex-col relative bg-card border-border rounded-none shadow-xl">
                            {/* Asset Preview */}
                            <div className="relative aspect-square overflow-hidden bg-muted/20">
                                <LazyImage
                                    src={asset.url}
                                    className="w-full h-full transition-transform group-hover:scale-105 duration-700"
                                    alt="Generated"
                                />

                                {/* Compliance Score Badge */}
                                <div className={`absolute top-3 right-3 backdrop-blur-md px-2 py-1 rounded-none text-[10px] font-mono font-black border flex items-center gap-2 shadow-sm ${asset.complianceScore >= 90
                                    ? 'bg-emerald-500/90 text-white border-emerald-500/20'
                                    : asset.complianceScore >= 70
                                        ? 'bg-amber-500/90 text-white border-amber-500/20'
                                        : 'bg-destructive/90 text-white border-destructive/20'
                                    }`}>
                                    {asset.complianceScore}% DNA
                                </div>
                            </div>

                            {/* Asset Details */}
                            <div className="p-4 flex-1 flex flex-col gap-4">
                                <p className="text-[11px] text-muted-foreground line-clamp-2 italic opacity-80 leading-relaxed border-l-2 border-primary/20 pl-3 uppercase tracking-tight">
                                    "{asset.prompt}"
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 mt-auto">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-full rounded-none gap-2 border-border hover:bg-muted/50 text-[10px] font-mono font-black uppercase h-9"
                                        onClick={() => handleExport(asset)}
                                    >
                                        <Download size={14} /> EXPORT MASTER
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full rounded-none gap-2 text-muted-foreground hover:text-primary transition-colors text-[10px] font-mono font-black uppercase h-8"
                                        onClick={() => onRefine(asset)}
                                    >
                                        <RefreshCw size={12} /> RE-PROCESS
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </motion.div>
    );
});
