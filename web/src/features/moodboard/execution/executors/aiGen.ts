import { registerExecutor } from '../executorRegistry';
import { PortValues } from '../types';

registerExecutor('checkpoint', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const path = (inputs.path_in as string) || 'default_model';
        return {
            model_out: { type: 'model', path },
            clip_out: { type: 'clip', path },
            vae_out: { type: 'vae', path },
        };
    }
});

registerExecutor('ksampler', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const { nodeSettings } = context;
        // Stub: in real implementation this would call a diffusion backend
        return {
            latent_out: {
                type: 'latent',
                model: inputs.model,
                positive: inputs.positive,
                negative: inputs.negative || '',
                steps: nodeSettings.steps || 20,
                cfg: nodeSettings.cfg || 7,
                seed: nodeSettings.seed || Math.floor(Math.random() * 2147483647),
                sampler: nodeSettings.samplerName || 'euler',
                scheduler: nodeSettings.scheduler || 'normal',
                denoise: nodeSettings.denoise ?? 1.0,
            },
        };
    }
});

registerExecutor('vae', {
    async execute(inputs: PortValues): Promise<PortValues> {
        // Stub: decode latent to image placeholder
        return {
            image_out: { type: 'image', decoded: true, source: inputs.samples },
        };
    }
});

registerExecutor('mood_gauge', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const value = typeof inputs.value_in === 'number' ? inputs.value_in : 50;
        const labels = ['Serene', 'Calm', 'Balanced', 'Energetic', 'Intense'];
        return {
            gauge_out: value,
            label_out: labels[Math.min(Math.floor(value / 20), 4)],
        };
    }
});

registerExecutor('model_profile', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return {
            profile_out: {
                context: inputs.context_in || null,
                generated: true,
            },
        };
    }
});

registerExecutor('midjourney', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return {
            prompt_out: (inputs.prompt_in as string) || '',
            image_out: inputs.image_in || null,
        };
    }
});
