import { registerExecutor } from '../executorRegistry';
import { PortValues, ExecutionContext } from '../types';

// image: passes through image data, extracts URL
registerExecutor('image', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const image = inputs.image_in || inputs.content || context.nodeSettings.content || null;
        return {
            image_out: image,
            url_out: typeof image === 'string' ? image : '',
        };
    }
});

// text: passes through text content
registerExecutor('text', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return { text_out: inputs.text_in || '' };
    }
});

// title: passes through title text
registerExecutor('title', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return { text_out: inputs.text_in || '' };
    }
});

// paragraph: passes through paragraph text
registerExecutor('paragraph', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return { text_out: inputs.text_in || '' };
    }
});

// palette: passes through color array, extracts primary
registerExecutor('palette', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        // Fallback to node settings or direct strings if array is missing
        let colors = (inputs.colors_in as string[]) || (context.nodeSettings.colors as string[]) || [];

        // If we only have a string/prompt, we simulate a palette generation
        if (colors.length === 0) {
            const seed = (inputs.text_in as string) || (context.nodeSettings.prompt as string) || '';
            if (seed) {
                colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']; // Stub palette based on "vibe"
            }
        }

        return {
            colors_out: colors,
            primary_out: colors[0] || '#000000',
        };
    }
});

// typography: passes through font data
registerExecutor('typography', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const font = (inputs.font_in as string) || (inputs.prompt as string) || (context.nodeSettings.prompt as string) || 'Inter';
        return {
            font_out: { family: font, weights: [400, 700] },
        };
    }
});

// icons: passes through icon set
registerExecutor('icons', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return { icons_out: inputs.set_in || [] };
    }
});

// reference: passes through URL and basic metadata
registerExecutor('reference', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const url = (inputs.url_in as string) || '';
        return {
            url_out: url,
            meta_out: { url, fetched: false },
        };
    }
});
