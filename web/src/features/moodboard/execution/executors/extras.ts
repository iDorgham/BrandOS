import { registerExecutor } from '../executorRegistry';
import { PortValues } from '../types';

registerExecutor('spotify', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const query = (inputs.query_in as string) || '';
        return {
            track_out: { query, service: 'spotify', stub: true },
            mood_out: 'energetic',
        };
    }
});

registerExecutor('weather', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const location = (inputs.location_in as string) || 'Unknown';
        return {
            weather_out: { location, temperature: 22, unit: 'C', stub: true },
            condition_out: 'Clear',
        };
    }
});

registerExecutor('competitor', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const name = (inputs.name_in as string) || '';
        return {
            analysis_out: { name, stub: true },
            share_out: 0,
        };
    }
});

registerExecutor('web_ref', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const url = (inputs.url_in as string) || '';
        return {
            html_out: `<!-- stub for ${url} -->`,
            meta_out: { url, fetched: false },
        };
    }
});

registerExecutor('cms_sync', {
    async execute(inputs: PortValues): Promise<PortValues> {
        return {
            synced_out: inputs.data_in || {},
            status_out: true,
        };
    }
});
