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
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const name = (inputs.name_in as string) || (inputs.competitorName as string) || (context.nodeSettings.competitorName as string) || '';
        const share = typeof inputs.share_in === 'number' ? inputs.share_in : (typeof inputs.marketShare === 'number' ? inputs.marketShare : (typeof context.nodeSettings.marketShare === 'number' ? context.nodeSettings.marketShare : 20));

        return {
            analysis_out: { name, share, stub: true },
            share_out: share,
        };
    }
});

registerExecutor('web_ref', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const url = (inputs.url_in as string) || (inputs.linkUrl as string) || (context.nodeSettings.linkUrl as string) || '';
        return {
            html_out: `<!-- stub for ${url} -->`,
            meta_out: { url, fetched: false },
        };
    }
});

registerExecutor('cms_sync', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const data = inputs.data_in || inputs.content || context.nodeSettings.content || {};
        return {
            synced_out: data,
            status_out: true,
        };
    }
});
