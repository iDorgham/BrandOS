import { NodePortSpec, PortDefinition } from './portTypes';

function inp(id: string, label: string, type: PortDefinition['type'], required = false, defaultValue?: unknown): PortDefinition {
    return { id, label, type, direction: 'input', required, defaultValue };
}

function out(id: string, label: string, type: PortDefinition['type']): PortDefinition {
    return { id, label, type, direction: 'output' };
}

export const PORT_SPECS: Record<string, NodePortSpec> = {
    // ── CORE ──
    image: {
        inputs: [inp('image_in', 'Image In', 'image')],
        outputs: [out('image_out', 'Image', 'image'), out('url_out', 'URL', 'string')],
        executable: true,
    },
    text: {
        inputs: [inp('text_in', 'Text In', 'string')],
        outputs: [out('text_out', 'Text', 'string')],
        executable: true,
    },
    title: {
        inputs: [inp('text_in', 'Text In', 'string')],
        outputs: [out('text_out', 'Text', 'string')],
        executable: true,
    },
    paragraph: {
        inputs: [inp('text_in', 'Text In', 'string')],
        outputs: [out('text_out', 'Text', 'string')],
        executable: true,
    },
    palette: {
        inputs: [inp('colors_in', 'Colors In', 'color_array')],
        outputs: [out('colors_out', 'Colors', 'color_array'), out('primary_out', 'Primary', 'color')],
        executable: true,
    },
    typography: {
        inputs: [inp('font_in', 'Font In', 'string')],
        outputs: [out('font_out', 'Font Data', 'json')],
        executable: true,
    },
    icons: {
        inputs: [inp('set_in', 'Set In', 'text_array')],
        outputs: [out('icons_out', 'Icons', 'text_array')],
        executable: true,
    },
    reference: {
        inputs: [inp('url_in', 'URL In', 'string')],
        outputs: [out('url_out', 'URL', 'string'), out('meta_out', 'Meta', 'json')],
        executable: true,
    },

    // ── REFINEMENT ──
    attribute: {
        inputs: [inp('text_in', 'Text In', 'string')],
        outputs: [out('attribute_out', 'Attribute', 'string'), out('tags_out', 'Tags', 'text_array')],
        executable: true,
    },
    texture: {
        inputs: [inp('input', 'Input', 'any')],
        outputs: [out('texture_out', 'Texture', 'json')],
        executable: true,
    },
    tone: {
        inputs: [inp('value_in', 'Value In', 'number')],
        outputs: [out('tone_out', 'Tone', 'number'), out('label_out', 'Label', 'string')],
        executable: true,
    },
    negative: {
        inputs: [inp('text_in', 'Text In', 'string')],
        outputs: [out('negatives_out', 'Negatives', 'text_array')],
        executable: true,
    },
    logic: {
        inputs: [
            inp('condition', 'Condition', 'boolean', true),
            inp('input_true', 'If True', 'any'),
            inp('input_false', 'If False', 'any'),
        ],
        outputs: [out('output', 'Output', 'any')],
        executable: true,
    },
    preset: {
        inputs: [inp('input', 'Input', 'any')],
        outputs: [out('preset_out', 'Preset', 'json')],
        executable: true,
    },

    // ── AI_GEN ──
    checkpoint: {
        inputs: [inp('path_in', 'Path', 'string')],
        outputs: [out('model_out', 'Model', 'model'), out('clip_out', 'CLIP', 'clip'), out('vae_out', 'VAE', 'vae_model')],
        executable: true,
    },
    ksampler: {
        inputs: [
            inp('model', 'Model', 'model', true),
            inp('positive', 'Positive', 'string', true),
            inp('negative', 'Negative', 'string'),
            inp('latent_image', 'Latent', 'latent'),
        ],
        outputs: [out('latent_out', 'Latent', 'latent')],
        executable: true,
    },
    vae: {
        inputs: [
            inp('samples', 'Samples', 'latent', true),
            inp('vae_model', 'VAE Model', 'vae_model', true),
        ],
        outputs: [out('image_out', 'Image', 'image')],
        executable: true,
    },
    mood_gauge: {
        inputs: [inp('value_in', 'Value In', 'number')],
        outputs: [out('gauge_out', 'Gauge', 'number'), out('label_out', 'Label', 'string')],
        executable: true,
    },
    model_profile: {
        inputs: [inp('context_in', 'Context', 'brand_context')],
        outputs: [out('profile_out', 'Profile', 'json')],
        executable: true,
    },
    midjourney: {
        inputs: [inp('prompt_in', 'Prompt', 'string'), inp('image_in', 'Image', 'image')],
        outputs: [out('prompt_out', 'Prompt', 'string'), out('image_out', 'Image', 'image')],
        executable: true,
    },

    // ── SIGNAL ──
    trigger: {
        inputs: [],
        outputs: [out('trigger_out', 'Trigger', 'json'), out('timestamp', 'Time', 'string')],
        executable: true,
    },
    engine: {
        inputs: [
            inp('prompt', 'Prompt', 'string', true),
            inp('context', 'Context', 'brand_context'),
            inp('system', 'System', 'string'),
        ],
        outputs: [out('response', 'Response', 'string'), out('json_out', 'JSON', 'json')],
        executable: true,
    },
    switch: {
        inputs: [
            inp('input_0', 'In 0', 'any'),
            inp('input_1', 'In 1', 'any'),
            inp('input_2', 'In 2', 'any'),
            inp('input_3', 'In 3', 'any'),
        ],
        outputs: [
            out('output_0', 'Out 0', 'any'),
            out('output_1', 'Out 1', 'any'),
            out('output_2', 'Out 2', 'any'),
            out('output_3', 'Out 3', 'any'),
        ],
        executable: true,
    },
    receiver: {
        inputs: [inp('data_in', 'Data In', 'any', true)],
        outputs: [out('validated', 'Validated', 'any'), out('errors', 'Errors', 'text_array')],
        executable: true,
    },
    encoder: {
        inputs: [inp('input', 'Input', 'any', true), inp('format', 'Format', 'string')],
        outputs: [out('file_out', 'File', 'image'), out('url_out', 'URL', 'string')],
        executable: true,
    },
    emitter: {
        inputs: [inp('content', 'Content', 'any', true), inp('channel', 'Channel', 'string')],
        outputs: [out('status_out', 'Status', 'json'), out('sent', 'Sent', 'boolean')],
        executable: true,
    },
    content: {
        inputs: [inp('input', 'Input', 'any')],
        outputs: [out('content_out', 'Content', 'json')],
        executable: true,
    },

    // ── SYSTEM (non-executable) ──
    label: { inputs: [], outputs: [], executable: false },
    section: { inputs: [], outputs: [], executable: false },
    grid: { inputs: [], outputs: [], executable: false },

    // ── EXTRAS ──
    spotify: {
        inputs: [inp('query_in', 'Query', 'string')],
        outputs: [out('track_out', 'Track', 'json'), out('mood_out', 'Mood', 'string')],
        executable: true,
    },
    weather: {
        inputs: [inp('location_in', 'Location', 'string')],
        outputs: [out('weather_out', 'Weather', 'json'), out('condition_out', 'Condition', 'string')],
        executable: true,
    },
    competitor: {
        inputs: [inp('name_in', 'Name', 'string')],
        outputs: [out('analysis_out', 'Analysis', 'json'), out('share_out', 'Share', 'number')],
        executable: true,
    },
    web_ref: {
        inputs: [inp('url_in', 'URL', 'string')],
        outputs: [out('html_out', 'HTML', 'string'), out('meta_out', 'Meta', 'json')],
        executable: true,
    },
    cms_sync: {
        inputs: [inp('data_in', 'Data In', 'json')],
        outputs: [out('synced_out', 'Synced', 'json'), out('status_out', 'Status', 'boolean')],
        executable: true,
    },

    // ── TEXT_PROCESSING ──
    content_gen: {
        inputs: [
            inp('prompt', 'Prompt', 'string', true),
            inp('context', 'Context', 'brand_context'),
            inp('tone', 'Tone', 'string'),
        ],
        outputs: [out('content_out', 'Content', 'string'), out('variations', 'Variations', 'text_array')],
        executable: true,
    },
    headline_gen: {
        inputs: [
            inp('topic', 'Topic', 'string', true),
            inp('context', 'Context', 'brand_context'),
        ],
        outputs: [out('headlines', 'Headlines', 'text_array'), out('best', 'Best', 'string')],
        executable: true,
    },
    seo_optimizer: {
        inputs: [
            inp('content', 'Content', 'string', true),
            inp('keywords', 'Keywords', 'text_array'),
        ],
        outputs: [out('optimized', 'Optimized', 'string'), out('score', 'Score', 'number'), out('suggestions', 'Tips', 'text_array')],
        executable: true,
    },
    hashtag_gen: {
        inputs: [
            inp('content', 'Content', 'string', true),
            inp('platform', 'Platform', 'string'),
        ],
        outputs: [out('hashtags', 'Hashtags', 'text_array'), out('formatted', 'Formatted', 'string')],
        executable: true,
    },
    content_rewriter: {
        inputs: [
            inp('content', 'Content', 'string', true),
            inp('tone', 'Tone', 'string'),
            inp('context', 'Context', 'brand_context'),
        ],
        outputs: [out('rewritten', 'Rewritten', 'string'), out('variations', 'Variations', 'text_array')],
        executable: true,
    },

    // ── SOCIAL_MEDIA ──
    social_poster: {
        inputs: [
            inp('content', 'Content', 'string', true),
            inp('image', 'Image', 'image'),
            inp('platform', 'Platform', 'string'),
        ],
        outputs: [out('post_id', 'Post ID', 'string'), out('status', 'Status', 'json')],
        executable: true,
    },
    scheduler: {
        inputs: [
            inp('content', 'Content', 'any', true),
            inp('schedule', 'Schedule', 'schedule', true),
        ],
        outputs: [out('scheduled', 'Scheduled', 'json'), out('confirmation', 'OK', 'boolean')],
        executable: true,
    },
    story_creator: {
        inputs: [
            inp('images', 'Images', 'image'),
            inp('text', 'Text', 'string'),
            inp('template', 'Template', 'string'),
        ],
        outputs: [out('story_out', 'Story', 'json'), out('preview', 'Preview', 'image')],
        executable: true,
    },

    // ── INTEGRATIONS ──
    email_sender: {
        inputs: [
            inp('to', 'To', 'string', true),
            inp('subject', 'Subject', 'string', true),
            inp('body', 'Body', 'string', true),
        ],
        outputs: [out('sent', 'Sent', 'boolean'), out('message_id', 'Msg ID', 'string')],
        executable: true,
    },
    webhook: {
        inputs: [
            inp('url', 'URL', 'string', true),
            inp('payload', 'Payload', 'json'),
            inp('method', 'Method', 'string'),
        ],
        outputs: [out('response', 'Response', 'json'), out('status_code', 'Status', 'number')],
        executable: true,
    },
    api_request: {
        inputs: [
            inp('url', 'URL', 'string', true),
            inp('method', 'Method', 'string'),
            inp('headers', 'Headers', 'json'),
            inp('body', 'Body', 'json'),
        ],
        outputs: [out('response', 'Response', 'json'), out('status_code', 'Status', 'number'), out('headers_out', 'Headers', 'json')],
        executable: true,
    },
    google_sheet: {
        inputs: [
            inp('sheet_url', 'Sheet URL', 'string', true),
            inp('range', 'Range', 'string', true),
            inp('data', 'Data', 'json'),
            inp('operation', 'Operation', 'string'),
        ],
        outputs: [out('result', 'Result', 'json'), out('rows', 'Rows', 'number')],
        executable: true,
    },
    slack: {
        inputs: [
            inp('channel', 'Channel', 'string', true),
            inp('message', 'Message', 'string', true),
            inp('thread_ts', 'Thread', 'string'),
        ],
        outputs: [out('message_id', 'Msg ID', 'string'), out('status', 'Status', 'json')],
        executable: true,
    },
    telegram: {
        inputs: [
            inp('chat_id', 'Chat ID', 'string', true),
            inp('message', 'Message', 'string', true),
            inp('parse_mode', 'Parse Mode', 'string'),
        ],
        outputs: [out('message_id', 'Msg ID', 'number'), out('status', 'Status', 'json')],
        executable: true,
    },
    whatsapp: {
        inputs: [
            inp('phone', 'Phone', 'string', true),
            inp('message', 'Message', 'string', true),
            inp('template', 'Template', 'string'),
        ],
        outputs: [out('message_id', 'Msg ID', 'string'), out('status', 'Status', 'json')],
        executable: true,
    },
    research: {
        inputs: [
            inp('query', 'Query', 'string', true),
            inp('type', 'Type', 'string'),
            inp('depth', 'Depth', 'string'),
            inp('context', 'Context', 'string'),
        ],
        outputs: [out('findings', 'Findings', 'json'), out('summary', 'Summary', 'string'), out('sources', 'Sources', 'json')],
        executable: true,
    },
    content_plan: {
        inputs: [
            inp('topic', 'Topic', 'string', true),
            inp('plan_type', 'Plan Type', 'string'),
            inp('timeframe', 'Timeframe', 'string'),
            inp('brief', 'Brief', 'string'),
        ],
        outputs: [out('plan', 'Plan', 'json'), out('calendar', 'Calendar', 'json'), out('summary', 'Summary', 'string')],
        executable: true,
    },
    meta_ads: {
        inputs: [
            inp('campaign_name', 'Campaign', 'string', true),
            inp('objective', 'Objective', 'string', true),
            inp('targeting', 'Targeting', 'json'),
            inp('creative', 'Creative', 'json'),
        ],
        outputs: [out('campaign_id', 'Campaign ID', 'string'), out('status', 'Status', 'json'), out('preview', 'Preview', 'json')],
        executable: true,
    },
    google_ads: {
        inputs: [
            inp('campaign_name', 'Campaign', 'string', true),
            inp('campaign_type', 'Type', 'string', true),
            inp('keywords', 'Keywords', 'string'),
            inp('bid_strategy', 'Bidding', 'string'),
        ],
        outputs: [out('campaign_id', 'Campaign ID', 'string'), out('status', 'Status', 'json'), out('quality_score', 'Quality', 'number')],
        executable: true,
    },
};
