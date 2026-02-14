import { registerExecutor } from '../executorRegistry';
import { PortValues, ExecutionContext } from '../types';

// image: passes through image data, extracts URL
registerExecutor('image', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const image = inputs.image_in || null;
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
    async execute(inputs: PortValues): Promise<PortValues> {
        const colors = (inputs.colors_in as string[]) || [];
        return {
            colors_out: colors,
            primary_out: colors[0] || '#000000',
        };
    }
});

// typography: passes through font data
registerExecutor('typography', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const font = inputs.font_in || 'Inter';
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
