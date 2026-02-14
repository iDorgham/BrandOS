import { registerExecutor } from '../executorRegistry';
import { PortValues } from '../types';

registerExecutor('content_gen', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const prompt = (inputs.prompt as string) || '';
        const tone = (inputs.tone as string) || (context.nodeSettings.tone as string) || 'professional';
        // Stub: would call AI service
        return {
            content_out: `[Generated content for: "${prompt.slice(0, 50)}..." in ${tone} tone]`,
            variations: [
                `Variation 1: ${prompt.slice(0, 30)}...`,
                `Variation 2: ${prompt.slice(0, 30)}...`,
            ],
        };
    }
});

registerExecutor('headline_gen', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const topic = (inputs.topic as string) || '';
        const headlines = [
            `Breaking: ${topic}`,
            `Why ${topic} Matters Now`,
            `The Future of ${topic}`,
        ];
        return {
            headlines,
            best: headlines[0],
        };
    }
});

registerExecutor('seo_optimizer', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const content = (inputs.content as string) || '';
        const keywords = (inputs.keywords as string[]) || [];
        return {
            optimized: content,
            score: 75,
            suggestions: keywords.length === 0
                ? ['Add target keywords', 'Improve meta description']
                : [`Optimize for: ${keywords.join(', ')}`],
        };
    }
});

registerExecutor('hashtag_gen', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const content = (inputs.content as string) || '';
        const platform = (inputs.platform as string) || (context.nodeSettings.platform as string) || 'instagram';
        const words = content.split(/\s+/).filter(w => w.length > 3).slice(0, 5);
        const hashtags = words.map(w => `#${w.toLowerCase().replace(/[^a-z0-9]/g, '')}`);
        return {
            hashtags,
            formatted: hashtags.join(' '),
        };
    }
});

registerExecutor('content_rewriter', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const content = (inputs.content as string) || '';
        const tone = (inputs.tone as string) || (context.nodeSettings.tone as string) || 'casual';
        return {
            rewritten: `[Rewritten in ${tone} tone] ${content.slice(0, 100)}`,
            variations: [
                `[${tone} v1] ${content.slice(0, 50)}...`,
                `[${tone} v2] ${content.slice(0, 50)}...`,
            ],
        };
    }
});
