import React from 'react';
import { Image as ImageIcon, Download, RefreshCw } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { GeneratedAsset } from '@/types';
import { downloadFile } from '@/utils';

interface LibraryViewProps {
    assets: GeneratedAsset[];
    onRefine: (asset: GeneratedAsset) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ assets, onRefine }) => {
    const handleExport = (asset: GeneratedAsset) => {
        // In a real app, this would download the 8K master
        // For now, we simulate by downloading the preview
        downloadFile(asset.url, `brand-os-${asset.id}.png`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500 pb-20">
            {assets.length === 0 ? (
                <div className="col-span-full py-40 text-center opacity-20">
                    <ImageIcon size={100} className="mx-auto mb-6" />
                    <h3 className="text-2xl font-display font-black uppercase">Vault Empty</h3>
                </div>
            ) : assets.map(asset => (
                <Card key={asset.id} className="overflow-hidden group hover:border-primary transition-all flex flex-col">
                    <div className="relative aspect-square overflow-hidden bg-accent">
                        <img src={asset.url} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" alt="Generated" />
                        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black text-primary border border-primary/20">
                            {asset.complianceScore}% COMPLIANT
                        </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                        <p className="text-[10px] text-muted-foreground line-clamp-3 italic mb-4">"{asset.prompt}"</p>
                        {asset.auditDetails?.feedback && (
                            <p className="text-[10px] text-primary/80 mb-4 border-l-2 border-primary pl-2">{asset.auditDetails.feedback}</p>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-auto rounded-lg gap-2"
                            onClick={() => handleExport(asset)}
                        >
                            <Download size={14} /> EXPORT 8K
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};
