export type PortDataType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'image'
    | 'json'
    | 'brand_context'
    | 'text_array'
    | 'color'
    | 'color_array'
    | 'model'
    | 'latent'
    | 'clip'
    | 'vae_model'
    | 'schedule'
    | 'any';

export interface PortDefinition {
    id: string;
    label: string;
    type: PortDataType;
    direction: 'input' | 'output';
    required?: boolean;
    defaultValue?: unknown;
}

export interface NodePortSpec {
    inputs: PortDefinition[];
    outputs: PortDefinition[];
    executable: boolean;
}

const COERCION_MAP: Record<string, Set<string>> = {
    number: new Set(['string']),
    boolean: new Set(['string', 'number']),
    color: new Set(['string']),
    color_array: new Set(['text_array', 'json']),
    text_array: new Set(['json']),
    image: new Set(['string']),
    schedule: new Set(['json']),
};

export function arePortsCompatible(
    sourceType: PortDataType,
    targetType: PortDataType
): boolean {
    if (sourceType === targetType) return true;
    if (sourceType === 'any' || targetType === 'any') return true;
    return COERCION_MAP[sourceType]?.has(targetType) ?? false;
}

export const PORT_TYPE_ICONS: Record<PortDataType, string> = {
    string: 'T',
    number: '#',
    boolean: '?',
    image: 'IMG',
    json: '{}',
    brand_context: 'DNA',
    text_array: '[]',
    color: 'CLR',
    color_array: 'CLR',
    model: 'MDL',
    latent: 'LAT',
    clip: 'CLP',
    vae_model: 'VAE',
    schedule: 'SCH',
    any: '*',
};

export const PORT_TYPE_COLORS: Record<PortDataType, string> = {
    string: '#3b82f6',
    number: '#22c55e',
    boolean: '#f59e0b',
    image: '#ec4899',
    json: '#8b5cf6',
    brand_context: '#f97316',
    text_array: '#06b6d4',
    color: '#e11d48',
    color_array: '#be185d',
    model: '#6366f1',
    latent: '#a855f7',
    clip: '#14b8a6',
    vae_model: '#ef4444',
    schedule: '#84cc16',
    any: '#6b7280',
};
