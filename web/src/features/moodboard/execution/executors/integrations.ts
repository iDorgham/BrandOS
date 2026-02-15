import { registerExecutor } from '../executorRegistry';
import { PortValues } from '../types';

registerExecutor('email_sender', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const to = (inputs.to as string) || (inputs.prompt as string) || (context.nodeSettings.prompt as string) || (context.nodeSettings.to as string) || '';
        const subject = (inputs.subject as string) || (inputs.subtitle as string) || (context.nodeSettings.subtitle as string) || (context.nodeSettings.subject as string) || 'No Subject';
        const body = (inputs.body as string) || (inputs.content as string) || (context.nodeSettings.content as string) || (context.nodeSettings.body as string) || '';

        // Stub: would call email API in real implementation
        return {
            sent: false,
            message_id: `msg_stub_${Date.now()}`,
            details: { to, subject, body_length: body.length }
        };
    }
});

registerExecutor('webhook', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const url = (inputs.url as string) || '';
        const method = (inputs.method as string) || 'POST';

        if (!url) {
            return { response: { error: 'No URL provided' }, status_code: 400 };
        }

        // Stub: would make HTTP request in real implementation
        return {
            response: { stub: true, url, method },
            status_code: 200,
        };
    }
});

registerExecutor('api_request', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const url = (inputs.url as string) || '';
        const method = (inputs.method as string) || 'GET';

        if (!url) {
            return { response: { error: 'No URL provided' }, status_code: 400, headers_out: {} };
        }

        // Stub: would make HTTP request in real implementation
        return {
            response: { stub: true, url, method },
            status_code: 200,
            headers_out: {},
        };
    }
});

registerExecutor('google_sheet', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const sheetUrl = (inputs.sheet_url as string) || '';
        const range = (inputs.range as string) || '';
        const operation = (inputs.operation as string) || 'read';

        if (!sheetUrl) {
            return { result: { error: 'No Sheet URL provided' }, rows: 0 };
        }

        // Stub: would call Google Sheets API in real implementation
        return {
            result: { stub: true, sheetUrl, range, operation },
            rows: 0,
        };
    }
});

registerExecutor('slack', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const channel = (inputs.channel as string) || (inputs.prompt as string) || (context.nodeSettings.prompt as string) || (context.nodeSettings.channel as string) || '';
        const message = (inputs.message as string) || (inputs.content as string) || (context.nodeSettings.content as string) || (context.nodeSettings.message as string) || '';

        if (!channel || !message) {
            return { message_id: '', status: { error: 'Channel and message required' } };
        }

        // Stub: would call Slack Web API in real implementation
        return {
            message_id: `slack_stub_${Date.now()}`,
            status: { ok: true, channel, stub: true, message_preview: message.slice(0, 50) },
        };
    }
});

registerExecutor('telegram', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const chatId = (inputs.chat_id as string) || '';
        const message = (inputs.message as string) || '';

        if (!chatId || !message) {
            return { message_id: 0, status: { error: 'Chat ID and message required' } };
        }

        // Stub: would call Telegram Bot API in real implementation
        return {
            message_id: Date.now(),
            status: { ok: true, chat_id: chatId, stub: true },
        };
    }
});

registerExecutor('whatsapp', {
    async execute(inputs: PortValues): Promise<PortValues> {
        const phone = (inputs.phone as string) || '';
        const message = (inputs.message as string) || '';

        if (!phone || !message) {
            return { message_id: '', status: { error: 'Phone and message required' } };
        }

        // Stub: would call WhatsApp Business API in real implementation
        return {
            message_id: `wamid_stub_${Date.now()}`,
            status: { ok: true, phone, stub: true },
        };
    }
});

registerExecutor('research', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const query = (inputs.query as string) || (inputs.prompt as string) || (context.nodeSettings.prompt as string) || '';
        const type = (inputs.type as string) || (context.nodeSettings.variant as string) || 'Market Analysis';
        const depth = (inputs.depth as string) || (context.nodeSettings.subtitle as string) || 'Standard';

        if (!query) {
            return { findings: { error: 'No query/prompt provided' }, summary: '', sources: [] };
        }

        // Stub: would call AI research API in real implementation
        return {
            findings: { stub: true, query, type, depth },
            summary: `Research results for: ${query}`,
            sources: [],
        };
    }
});

registerExecutor('content_plan', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const topic = (inputs.topic as string) || (inputs.prompt as string) || (context.nodeSettings.prompt as string) || '';
        const planType = (inputs.plan_type as string) || (context.nodeSettings.variant as string) || 'Editorial Calendar';
        const timeframe = (inputs.timeframe as string) || (context.nodeSettings.subtitle as string) || '1 Month';

        if (!topic) {
            return { plan: { error: 'No topic provided' }, calendar: {}, summary: '' };
        }

        // Stub: would call AI planning API in real implementation
        return {
            plan: { stub: true, topic, planType, timeframe },
            calendar: {},
            summary: `Content plan for: ${topic} (${timeframe})`,
        };
    }
});

registerExecutor('meta_ads', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const campaignName = (inputs.campaign_name as string) || (inputs.prompt as string) || (context.nodeSettings.prompt as string) || '';
        const objective = (inputs.objective as string) || (inputs.variant as string) || (context.nodeSettings.variant as string) || 'Awareness';

        if (!campaignName) {
            return { campaign_id: '', status: { error: 'Campaign name required' }, preview: {} };
        }

        // Stub: would call Meta Marketing API in real implementation
        return {
            campaign_id: `meta_stub_${Date.now()}`,
            status: { ok: true, objective, stub: true, campaignName },
            preview: {},
        };
    }
});

registerExecutor('google_ads', {
    async execute(inputs: PortValues, context): Promise<PortValues> {
        const campaignName = (inputs.campaign_name as string) || (inputs.prompt as string) || (context.nodeSettings.prompt as string) || '';
        const campaignType = (inputs.campaign_type as string) || (inputs.variant as string) || (context.nodeSettings.variant as string) || 'Search';

        if (!campaignName) {
            return { campaign_id: '', status: { error: 'Campaign name required' }, quality_score: 0 };
        }

        // Stub: would call Google Ads API in real implementation
        return {
            campaign_id: `gads_stub_${Date.now()}`,
            status: { ok: true, campaignType, stub: true, campaignName },
            quality_score: 0,
        };
    }
});
