import React from 'react';
import { Check } from 'lucide-react';

interface PromptVariation {
    id: string;
    label: string;
    prompt: string;
    energy: number;
    warmth: number;
    sophistication: number;
    description: string;
}

interface VariationCardProps {
    variation: PromptVariation;
    isSelected: boolean;
    onClick: (id: string) => void;
}

export const VariationCard: React.FC<VariationCardProps> = React.memo(({ variation, isSelected, onClick }) => {
    return (
        <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${isSelected
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/30 bg-card'
                }`}
            onClick={() => onClick(variation.id)}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${variation.energy >= 70 ? 'bg-red-500' :
                            variation.energy >= 50 ? 'bg-orange-500' :
                                variation.energy >= 30 ? 'bg-yellow-500' :
                                    'bg-green-500'
                            }`}>
                            {variation.energy}%
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="font-medium">{variation.label}</div>
                            <div className="text-sm text-muted-foreground">{variation.description}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${variation.warmth >= 70 ? 'bg-red-500' :
                            variation.warmth >= 50 ? 'bg-orange-500' :
                                variation.warmth >= 30 ? 'bg-yellow-500' :
                                    'bg-blue-500'
                            }`}>
                            {variation.warmth}%
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${variation.sophistication >= 80 ? 'bg-purple-500' :
                            variation.sophistication >= 60 ? 'bg-blue-500' :
                                variation.sophistication >= 40 ? 'bg-green-500' :
                                    'bg-gray-500'
                            }`}>
                            {variation.sophistication}%
                        </div>
                    </div>
                    {isSelected && (
                        <Check size={16} className="text-primary mt-2" />
                    )}
                </div>
            </div>
        </div>
    );
});
