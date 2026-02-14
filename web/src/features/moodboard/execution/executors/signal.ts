import { registerExecutor } from '../executorRegistry';
import { PortValues } from '../types';

registerExecutor('trigger', {
    async execute(): Promise<PortValues> {
        return {
            trigger_out: { triggered: true },
            timestamp: new Date().toISOString(),
        };
    }
});

registerExecutor('engine', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const prompt = (inputs.prompt as string) || '';
        const system = (inputs.system as string) || '';

        // Stub: would call AI service in real implementation
        // TODO: integrate with gemini.service.ts or ai.service.ts
        return {
            response: `[Engine stub] Prompt: ${prompt.slice(0, 100)}`,
            json_out: { prompt, system, context: inputs.context || null, model: context.nodeSettings.model || 'default' },
        };
    }
});

registerExecutor('switch', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const mode = (context.nodeSettings.mode as string) || 'passthrough';
        const outputs: PortValues = {};

        if (mode === 'broadcast') {
            // Copy first non-null input to all outputs
            const firstValue = Object.values(inputs).find(v => v !== undefined);
            for (let i = 0; i < 4; i++) {
                outputs[`output_${i}`] = firstValue;
            }
        } else {
            // Passthrough: input_N → output_N
            for (let i = 0; i < 4; i++) {
                outputs[`output_${i}`] = inputs[`input_${i}`];
            }
        }

        return outputs;
    }
});

registerExecutor('receiver', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const data = inputs.data_in;
        const errors: string[] = [];

        if (data === undefined || data === null) {
            errors.push('No data received');
        }

        return {
            validated: errors.length === 0 ? data : null,
            errors,
        };
    }
});

registerExecutor('encoder', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const format = (inputs.format as string) || (context.nodeSettings.format as string) || 'png';
        return {
            file_out: { type: 'encoded', format, source: inputs.input },
            url_out: `data:image/${format};base64,stub`,
        };
    }
});

registerExecutor('emitter', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const channel = (inputs.channel as string) || (context.nodeSettings.channel as string) || 'default';
        // Stub: would send to channel in real implementation
        return {
            status_out: { channel, sent: true, content: inputs.content },
            sent: true,
        };
    }
});

registerExecutor('content', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return {
            content_out: inputs.input || { empty: true },
        };
    }
});
