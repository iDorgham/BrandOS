import { registerExecutor } from '../executorRegistry';
import { PortValues } from '../types';

registerExecutor('social_poster', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const content = (inputs.content as string) || (inputs.prompt as string) || (context.nodeSettings.content as string) || (context.nodeSettings.prompt as string) || '';
        const platform = (inputs.platform as string) || (context.nodeSettings.platform as string) || (Array.isArray(context.nodeSettings.tags) ? context.nodeSettings.tags[0] : 'instagram');

        return {
            post_id: `post_${Date.now()}`,
            status: { platform, published: false, stub: true, content },
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
