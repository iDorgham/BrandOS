import { registerExecutor } from '../executorRegistry';
import { PortValues } from '../types';

registerExecutor('attribute', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const text = (inputs.text_in as string) || '';
        const tags = text.split(/[,;]\s*/).filter(Boolean);
        return { attribute_out: text, tags_out: tags };
    }
});

registerExecutor('texture', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return { texture_out: { type: 'material', value: inputs.input || null } };
    }
});

registerExecutor('tone', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const value = typeof inputs.value_in === 'number' ? inputs.value_in : 50;
        const labels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
        const label = labels[Math.min(Math.floor(value / 20), 4)];
        return { tone_out: value, label_out: label };
    }
});

registerExecutor('negative', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const text = (inputs.text_in as string) || '';
        const negatives = text.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean);
        return { negatives_out: negatives };
    }
});

registerExecutor('logic', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const condition = Boolean(inputs.condition);
        return { output: condition ? inputs.input_true : inputs.input_false };
    }
});

registerExecutor('preset', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return { preset_out: { applied: true, source: inputs.input || null } };
    }
});
