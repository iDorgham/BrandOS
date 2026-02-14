import React, { useCallback, useMemo } from 'react';
import { ViewHeader } from '@/components/layout/ViewHeader';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Archive } from 'lucide-react';
import { GeneratedAsset } from '@/types';
import { downloadFile } from '@/utils';
import { AssetCard } from './AssetCard';

interface LibraryViewProps {
    assets: GeneratedAsset[];
    onRefine: (asset: GeneratedAsset, customFeedback?: string) => void;
}

export const LibraryView = React.memo<LibraryViewProps>(({ assets, onRefine }) => {
    const handleExport = useCallback((asset: GeneratedAsset) => {
        downloadFile(asset.url, `brand-os-${asset.id}.png`);
    }, []);

    const handleRefine = useCallback((asset: GeneratedAsset) => {
        onRefine(asset);
    }, [onRefine]);

    const assetList = useMemo(() => {
        if (assets.length === 0) {
            return (
                <div className="col-span-full py-40 text-center opacity-40">
                    <ImageIcon size={64} className="mx-auto mb-6 text-muted-foreground" strokeWidth={1} />
                    <h3 className="text-[18px] font-medium text-foreground tracking-tight uppercase">Vault Empty</h3>
                    <p className="text-[12px] text-muted-foreground mt-2">No generated assets found in the current workspace.</p>
                </div>
            );
        }
        return assets.map(asset => (
            <div key={asset.id} className="h-full">
                <AssetCard
                    asset={asset}
                    onExport={handleExport}
                    onRefine={handleRefine}
                />
            </div>
        ));
    }, [assets, handleExport, handleRefine]);

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
                    {assetList}
                </div>
            </div>
        </motion.div>
    );
});
