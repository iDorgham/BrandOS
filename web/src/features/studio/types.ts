import { AssetType, GeneratedAsset } from '@/types';

export interface BatchItem {
    type: AssetType;
    orchestratedPrompt: string;
    status: 'pending' | 'orchestrating' | 'rendering' | 'auditing' | 'complete' | 'failed';
    result?: GeneratedAsset;
}
