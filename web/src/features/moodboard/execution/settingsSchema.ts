export type SettingsFieldType =
    | 'text'
    | 'textarea'
    | 'number'
    | 'range'
    | 'select'
    | 'toggle'
    | 'color'
    | 'tags'
    | 'key-value'
    | 'code';

export interface SettingsField {
    key: string;
    label: string;
    type: SettingsFieldType;
    defaultValue?: unknown;
    description?: string;
    // For number/range
    min?: number;
    max?: number;
    step?: number;
    // For select
    options?: { label: string; value: string }[];
    // For text/textarea
    placeholder?: string;
}

export interface NodeSettingsSchema {
    nodeType: string;
    sections: {
        label: string;
        fields: SettingsField[];
    }[];
}
