import { registerExecutor } from '../executorRegistry';
import { PortValues } from '../types';

registerExecutor('social_poster', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const platform = (inputs.platform as string) || (context.nodeSettings.platform as string) || 'instagram';
        return {
            post_id: `post_${Date.now()}`,
            status: { platform, published: false, stub: true, content: inputs.content },
        };
    }
});

registerExecutor('scheduler', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return {
            scheduled: {
                content: inputs.content,
                schedule: inputs.schedule,
                created: new Date().toISOString(),
            },
            confirmation: true,
        };
    }
});

registerExecutor('story_creator', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return {
            story_out: {
                images: inputs.images || null,
                text: inputs.text || '',
                template: inputs.template || 'default',
            },
            preview: null,
        };
    }
});
