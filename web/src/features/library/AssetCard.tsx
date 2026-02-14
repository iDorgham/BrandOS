import React from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { LazyImage } from '@/components/ui/LazyImage';
import { GeneratedAsset } from '@/types';

interface AssetCardProps {
    asset: GeneratedAsset;
    onExport: (asset: GeneratedAsset) => void;
    onRefine: (asset: GeneratedAsset) => void;
}

export const AssetCard = React.memo<AssetCardProps>(({ asset, onExport, onRefine }) => {
    const complianceColor = asset.complianceScore >= 90
        ? 'bg-emerald-500/90 border-emerald-500/20'
        : asset.complianceScore >= 70
            ? 'bg-amber-500/90 border-amber-500/20'
            : 'bg-destructive/90 border-destructive/20';

    return (
        <Card className="overflow-hidden group hover:border-primary/50 transition-all flex flex-col relative bg-card border-border rounded-none shadow-xl h-full"
            style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 400px' } as React.CSSProperties}>
            {/* Asset Preview */}
            <div className="relative aspect-square overflow-hidden bg-muted/20">
                <LazyImage
                    src={asset.url}
                    className="w-full h-full transition-transform group-hover:scale-105 duration-700"
                    alt="Generated"
                />

                {/* Compliance Score Badge */}
                <div className={`absolute top-3 right-3 backdrop-blur-md px-2 py-1 rounded-none text-[10px] font-mono font-black border flex items-center gap-2 shadow-sm text-white ${complianceColor}`}>
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
                        onClick={() => onExport(asset)}
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
    );
});
