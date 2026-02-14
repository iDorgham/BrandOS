import { NodeSettingsSchema } from './settingsSchema';

const MODEL_OPTIONS = [
    { label: 'GPT-4o', value: 'gpt-4o' },
    { label: 'Claude 4.5 Sonnet', value: 'claude-sonnet-4-5-20250929' },
    { label: 'Gemini 2.5 Pro', value: 'gemini-2.5-pro' },
    { label: 'Gemini 2.0 Flash', value: 'gemini-2.0-flash' },
];

const PLATFORM_OPTIONS = [
    { label: 'Instagram', value: 'instagram' },
    { label: 'Twitter / X', value: 'twitter' },
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'TikTok', value: 'tiktok' },
    { label: 'Facebook', value: 'facebook' },
];

export const SETTINGS_REGISTRY: Record<string, NodeSettingsSchema> = {
    // ── SIGNAL ──
    trigger: {
        nodeType: 'trigger',
        sections: [
            {
                label: 'Source',
                fields: [
                    {
                        key: 'triggerMode', label: 'Mode', type: 'select', defaultValue: 'schedule', options: [
                            { label: 'Schedule', value: 'schedule' },
                            { label: 'Telegram', value: 'telegram' },
                            { label: 'Manual', value: 'manual' },
                        ]
                    },
                ],
            },
            {
                label: 'Schedule',
                fields: [
                    {
                        key: 'recurrence', label: 'Repeat', type: 'select', defaultValue: 'daily', options: [
                            { label: 'Daily', value: 'daily' },
                            { label: 'Weekly', value: 'weekly' },
                            { label: 'Monthly', value: 'monthly' },
                            { label: 'Specific Date', value: 'once' },
                        ]
                    },
                    { key: 'time', label: 'Time', type: 'text', defaultValue: '09:00', placeholder: 'HH:MM' },
                    { key: 'specificDate', label: 'Date (once)', type: 'text', placeholder: 'YYYY-MM-DD', description: 'Only for "Specific Date" recurrence' },
                    { key: 'selectedDays', label: 'Days (weekly)', type: 'tags', description: 'Which days to run on for weekly recurrence' },
                ],
            },
            {
                label: 'Telegram',
                fields: [
                    { key: 'telegramBotToken', label: 'Bot Token', type: 'text', placeholder: '123456:ABC-DEF...' },
                    { key: 'telegramChatId', label: 'Chat ID', type: 'text', placeholder: '-1001234567890' },
                ],
            },
        ],
    },
    engine: {
        nodeType: 'engine',
        sections: [{
            label: 'Model Settings',
            fields: [
                { key: 'model', label: 'Model', type: 'select', defaultValue: 'gemini-2.0-flash', options: MODEL_OPTIONS },
                { key: 'temperature', label: 'Temperature', type: 'range', defaultValue: 0.7, min: 0, max: 2, step: 0.1 },
                { key: 'maxTokens', label: 'Max Tokens', type: 'number', defaultValue: 2048, min: 1, max: 128000 },
                { key: 'systemPrompt', label: 'System Prompt', type: 'textarea', placeholder: 'You are a brand-aware assistant...' },
                {
                    key: 'responseFormat', label: 'Response Format', type: 'select', defaultValue: 'text', options: [
                        { label: 'Text', value: 'text' },
                        { label: 'JSON', value: 'json' },
                    ]
                },
            ],
        }],
    },
    switch: {
        nodeType: 'switch',
        sections: [{
            label: 'Routing',
            fields: [
                {
                    key: 'mode', label: 'Mode', type: 'select', defaultValue: 'passthrough', options: [
                        { label: 'Passthrough (1:1)', value: 'passthrough' },
                        { label: 'Broadcast (1:N)', value: 'broadcast' },
                        { label: 'Round Robin', value: 'round_robin' },
                    ]
                },
                { key: 'routeCount', label: 'Route Count', type: 'number', defaultValue: 4, min: 2, max: 10 },
            ],
        }],
    },
    receiver: {
        nodeType: 'receiver',
        sections: [{
            label: 'Validation',
            fields: [
                { key: 'validationSchema', label: 'JSON Schema', type: 'code', placeholder: '{ "type": "object" }' },
                { key: 'strictMode', label: 'Strict Mode', type: 'toggle', defaultValue: false },
            ],
        }],
    },
    encoder: {
        nodeType: 'encoder',
        sections: [{
            label: 'Export Settings',
            fields: [
                {
                    key: 'format', label: 'Format', type: 'select', defaultValue: 'png', options: [
                        { label: 'PNG', value: 'png' },
                        { label: 'JPEG', value: 'jpeg' },
                        { label: 'WebP', value: 'webp' },
                        { label: 'SVG', value: 'svg' },
                    ]
                },
                { key: 'quality', label: 'Quality', type: 'range', defaultValue: 90, min: 1, max: 100 },
                { key: 'width', label: 'Width', type: 'number', defaultValue: 1024, min: 1, max: 8192 },
                { key: 'height', label: 'Height', type: 'number', defaultValue: 1024, min: 1, max: 8192 },
            ],
        }],
    },
    emitter: {
        nodeType: 'emitter',
        sections: [{
            label: 'Distribution',
            fields: [
                {
                    key: 'channel', label: 'Channel', type: 'select', defaultValue: 'download', options: [
                        { label: 'Download', value: 'download' },
                        { label: 'Clipboard', value: 'clipboard' },
                        { label: 'Webhook', value: 'webhook' },
                        { label: 'Email', value: 'email' },
                    ]
                },
                { key: 'retryCount', label: 'Retry Count', type: 'number', defaultValue: 3, min: 0, max: 10 },
            ],
        }],
    },

    // ── AI_GEN ──
    ksampler: {
        nodeType: 'ksampler',
        sections: [{
            label: 'Sampler Settings',
            fields: [
                { key: 'steps', label: 'Steps', type: 'range', defaultValue: 20, min: 1, max: 150 },
                { key: 'cfg', label: 'CFG Scale', type: 'range', defaultValue: 7, min: 1, max: 30, step: 0.5 },
                { key: 'seed', label: 'Seed', type: 'number', defaultValue: -1, min: -1, max: 2147483647, description: '-1 for random' },
                {
                    key: 'samplerName', label: 'Sampler', type: 'select', defaultValue: 'euler', options: [
                        { label: 'Euler', value: 'euler' },
                        { label: 'Euler A', value: 'euler_ancestral' },
                        { label: 'DPM++ 2M', value: 'dpmpp_2m' },
                        { label: 'DPM++ 2M Karras', value: 'dpmpp_2m_karras' },
                        { label: 'DPM++ SDE Karras', value: 'dpmpp_sde_karras' },
                    ]
                },
                {
                    key: 'scheduler', label: 'Scheduler', type: 'select', defaultValue: 'normal', options: [
                        { label: 'Normal', value: 'normal' },
                        { label: 'Karras', value: 'karras' },
                        { label: 'Exponential', value: 'exponential' },
                    ]
                },
                { key: 'denoise', label: 'Denoise', type: 'range', defaultValue: 1.0, min: 0, max: 1, step: 0.01 },
            ],
        }],
    },
    checkpoint: {
        nodeType: 'checkpoint',
        sections: [{
            label: 'Model Config',
            fields: [
                { key: 'modelPath', label: 'Model Path', type: 'text', placeholder: 'models/sd_xl_base_1.0.safetensors' },
                {
                    key: 'modelType', label: 'Model Type', type: 'select', defaultValue: 'sdxl', options: [
                        { label: 'SD 1.5', value: 'sd15' },
                        { label: 'SDXL', value: 'sdxl' },
                        { label: 'Flux', value: 'flux' },
                    ]
                },
                { key: 'clipSkip', label: 'CLIP Skip', type: 'number', defaultValue: 1, min: 1, max: 12 },
            ],
        }],
    },
    midjourney: {
        nodeType: 'midjourney',
        sections: [{
            label: 'MJ Parameters',
            fields: [
                {
                    key: 'aspectRatio', label: 'Aspect Ratio', type: 'select', defaultValue: '1:1', options: [
                        { label: '1:1', value: '1:1' },
                        { label: '16:9', value: '16:9' },
                        { label: '9:16', value: '9:16' },
                        { label: '4:3', value: '4:3' },
                        { label: '3:2', value: '3:2' },
                    ]
                },
                { key: 'stylize', label: 'Stylize', type: 'range', defaultValue: 100, min: 0, max: 1000 },
                { key: 'chaos', label: 'Chaos', type: 'range', defaultValue: 0, min: 0, max: 100 },
                {
                    key: 'quality', label: 'Quality', type: 'select', defaultValue: '1', options: [
                        { label: '0.25', value: '0.25' },
                        { label: '0.5', value: '0.5' },
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                    ]
                },
            ],
        }],
    },

    // ── TEXT_PROCESSING ──
    content_gen: {
        nodeType: 'content_gen',
        sections: [{
            label: 'Generation Settings',
            fields: [
                { key: 'model', label: 'Model', type: 'select', defaultValue: 'gemini-2.0-flash', options: MODEL_OPTIONS },
                { key: 'temperature', label: 'Temperature', type: 'range', defaultValue: 0.7, min: 0, max: 2, step: 0.1 },
                { key: 'maxLength', label: 'Max Length', type: 'number', defaultValue: 1000, min: 50, max: 10000 },
                { key: 'outputCount', label: 'Variations', type: 'number', defaultValue: 2, min: 1, max: 10 },
                {
                    key: 'tone', label: 'Tone', type: 'select', defaultValue: 'professional', options: [
                        { label: 'Professional', value: 'professional' },
                        { label: 'Casual', value: 'casual' },
                        { label: 'Playful', value: 'playful' },
                        { label: 'Authoritative', value: 'authoritative' },
                        { label: 'Empathetic', value: 'empathetic' },
                    ]
                },
                {
                    key: 'language', label: 'Language', type: 'select', defaultValue: 'en', options: [
                        { label: 'English', value: 'en' },
                        { label: 'Spanish', value: 'es' },
                        { label: 'French', value: 'fr' },
                        { label: 'German', value: 'de' },
                        { label: 'Arabic', value: 'ar' },
                    ]
                },
            ],
        }],
    },
    headline_gen: {
        nodeType: 'headline_gen',
        sections: [{
            label: 'Headline Settings',
            fields: [
                { key: 'count', label: 'Count', type: 'number', defaultValue: 5, min: 1, max: 20 },
                { key: 'maxLength', label: 'Max Length', type: 'number', defaultValue: 80, min: 20, max: 200 },
                {
                    key: 'style', label: 'Style', type: 'select', defaultValue: 'engaging', options: [
                        { label: 'Engaging', value: 'engaging' },
                        { label: 'Clickbait', value: 'clickbait' },
                        { label: 'Informative', value: 'informative' },
                        { label: 'Question', value: 'question' },
                    ]
                },
            ],
        }],
    },
    seo_optimizer: {
        nodeType: 'seo_optimizer',
        sections: [{
            label: 'SEO Settings',
            fields: [
                { key: 'targetKeywords', label: 'Target Keywords', type: 'tags', placeholder: 'Add keyword...' },
                { key: 'minScore', label: 'Min Score', type: 'range', defaultValue: 70, min: 0, max: 100 },
                {
                    key: 'language', label: 'Language', type: 'select', defaultValue: 'en', options: [
                        { label: 'English', value: 'en' },
                        { label: 'Spanish', value: 'es' },
                        { label: 'French', value: 'fr' },
                    ]
                },
            ],
        }],
    },
    hashtag_gen: {
        nodeType: 'hashtag_gen',
        sections: [{
            label: 'Hashtag Settings',
            fields: [
                { key: 'count', label: 'Count', type: 'number', defaultValue: 10, min: 1, max: 30 },
                { key: 'platform', label: 'Platform', type: 'select', defaultValue: 'instagram', options: PLATFORM_OPTIONS },
                { key: 'includeTrending', label: 'Include Trending', type: 'toggle', defaultValue: true },
            ],
        }],
    },
    content_rewriter: {
        nodeType: 'content_rewriter',
        sections: [{
            label: 'Rewrite Settings',
            fields: [
                {
                    key: 'tone', label: 'Tone', type: 'select', defaultValue: 'casual', options: [
                        { label: 'Casual', value: 'casual' },
                        { label: 'Formal', value: 'formal' },
                        { label: 'Humorous', value: 'humorous' },
                        { label: 'Technical', value: 'technical' },
                    ]
                },
                { key: 'preserveKeywords', label: 'Preserve Keywords', type: 'toggle', defaultValue: true },
                { key: 'creativityLevel', label: 'Creativity', type: 'range', defaultValue: 50, min: 0, max: 100 },
            ],
        }],
    },

    // ── SOCIAL_MEDIA ──
    social_poster: {
        nodeType: 'social_poster',
        sections: [{
            label: 'Posting Settings',
            fields: [
                { key: 'platform', label: 'Platform', type: 'select', defaultValue: 'instagram', options: PLATFORM_OPTIONS },
                { key: 'account', label: 'Account ID', type: 'text', placeholder: '@youraccount' },
                { key: 'autoHashtags', label: 'Auto Hashtags', type: 'toggle', defaultValue: true },
            ],
        }],
    },
    scheduler: {
        nodeType: 'scheduler',
        sections: [{
            label: 'Schedule Config',
            fields: [
                { key: 'dateTime', label: 'Date/Time', type: 'text', placeholder: '2026-03-01T09:00:00' },
                {
                    key: 'timezone', label: 'Timezone', type: 'select', defaultValue: 'UTC', options: [
                        { label: 'UTC', value: 'UTC' },
                        { label: 'US Eastern', value: 'America/New_York' },
                        { label: 'US Pacific', value: 'America/Los_Angeles' },
                        { label: 'Europe/London', value: 'Europe/London' },
                        { label: 'Asia/Tokyo', value: 'Asia/Tokyo' },
                    ]
                },
                {
                    key: 'recurrence', label: 'Recurrence', type: 'select', defaultValue: 'none', options: [
                        { label: 'None', value: 'none' },
                        { label: 'Daily', value: 'daily' },
                        { label: 'Weekly', value: 'weekly' },
                        { label: 'Monthly', value: 'monthly' },
                    ]
                },
            ],
        }],
    },
    story_creator: {
        nodeType: 'story_creator',
        sections: [{
            label: 'Story Settings',
            fields: [
                {
                    key: 'template', label: 'Template', type: 'select', defaultValue: 'default', options: [
                        { label: 'Default', value: 'default' },
                        { label: 'Product', value: 'product' },
                        { label: 'Behind the Scenes', value: 'bts' },
                        { label: 'Announcement', value: 'announcement' },
                    ]
                },
                { key: 'duration', label: 'Duration (s)', type: 'number', defaultValue: 15, min: 5, max: 60 },
                { key: 'music', label: 'Music Track', type: 'text', placeholder: 'Track name or URL' },
            ],
        }],
    },

    // ── INTEGRATIONS ──
    email_sender: {
        nodeType: 'email_sender',
        sections: [{
            label: 'Email Config',
            fields: [
                { key: 'fromAddress', label: 'From Address', type: 'text', placeholder: 'noreply@yourbrand.com' },
                { key: 'cc', label: 'CC', type: 'text', placeholder: 'cc@example.com' },
                { key: 'bcc', label: 'BCC', type: 'text', placeholder: 'bcc@example.com' },
                {
                    key: 'apiProvider', label: 'Provider', type: 'select', defaultValue: 'smtp', options: [
                        { label: 'SMTP', value: 'smtp' },
                        { label: 'SendGrid', value: 'sendgrid' },
                        { label: 'Resend', value: 'resend' },
                    ]
                },
            ],
        }],
    },
    webhook: {
        nodeType: 'webhook',
        sections: [{
            label: 'Webhook Config',
            fields: [
                {
                    key: 'method', label: 'Method', type: 'select', defaultValue: 'POST', options: [
                        { label: 'GET', value: 'GET' },
                        { label: 'POST', value: 'POST' },
                        { label: 'PUT', value: 'PUT' },
                        { label: 'PATCH', value: 'PATCH' },
                        { label: 'DELETE', value: 'DELETE' },
                    ]
                },
                { key: 'headers', label: 'Headers (JSON)', type: 'code', placeholder: '{ "Authorization": "Bearer ..." }' },
                {
                    key: 'authType', label: 'Auth Type', type: 'select', defaultValue: 'none', options: [
                        { label: 'None', value: 'none' },
                        { label: 'Bearer Token', value: 'bearer' },
                        { label: 'Basic Auth', value: 'basic' },
                        { label: 'API Key', value: 'apikey' },
                    ]
                },
                { key: 'retryCount', label: 'Retries', type: 'number', defaultValue: 0, min: 0, max: 5 },
            ],
        }],
    },
    api_request: {
        nodeType: 'api_request',
        sections: [{
            label: 'Request Config',
            fields: [
                {
                    key: 'method', label: 'Method', type: 'select', defaultValue: 'GET', options: [
                        { label: 'GET', value: 'GET' },
                        { label: 'POST', value: 'POST' },
                        { label: 'PUT', value: 'PUT' },
                        { label: 'PATCH', value: 'PATCH' },
                        { label: 'DELETE', value: 'DELETE' },
                    ]
                },
                { key: 'headers', label: 'Headers (JSON)', type: 'code', placeholder: '{ "Content-Type": "application/json" }' },
                { key: 'queryParams', label: 'Query Params', type: 'code', placeholder: '{ "key": "value" }' },
                {
                    key: 'authType', label: 'Auth', type: 'select', defaultValue: 'none', options: [
                        { label: 'None', value: 'none' },
                        { label: 'Bearer Token', value: 'bearer' },
                        { label: 'Basic Auth', value: 'basic' },
                    ]
                },
                { key: 'timeout', label: 'Timeout (ms)', type: 'number', defaultValue: 30000, min: 1000, max: 120000 },
            ],
        }],
    },
    google_sheet: {
        nodeType: 'google_sheet',
        sections: [{
            label: 'Sheet Config',
            fields: [
                {
                    key: 'operation', label: 'Operation', type: 'select', defaultValue: 'read', options: [
                        { label: 'Read Range', value: 'read' },
                        { label: 'Write Range', value: 'write' },
                        { label: 'Append Row', value: 'append' },
                        { label: 'Clear Range', value: 'clear' },
                        { label: 'Create Sheet', value: 'create' },
                    ]
                },
                { key: 'sheetName', label: 'Sheet Name', type: 'text', placeholder: 'Sheet1' },
                { key: 'headerRow', label: 'Has Header Row', type: 'toggle', defaultValue: true },
                { key: 'serviceAccountKey', label: 'Service Account Key', type: 'code', placeholder: '{ "type": "service_account", ... }' },
            ],
        }],
    },
    slack: {
        nodeType: 'slack',
        sections: [{
            label: 'Slack Config',
            fields: [
                {
                    key: 'action', label: 'Action', type: 'select', defaultValue: 'send_message', options: [
                        { label: 'Send Message', value: 'send_message' },
                        { label: 'Send File', value: 'send_file' },
                        { label: 'Update Status', value: 'update_status' },
                        { label: 'Create Channel', value: 'create_channel' },
                    ]
                },
                { key: 'botToken', label: 'Bot Token', type: 'text', placeholder: 'xoxb-...' },
                { key: 'unfurlLinks', label: 'Unfurl Links', type: 'toggle', defaultValue: true },
                { key: 'notifyChannel', label: 'Notify Channel', type: 'toggle', defaultValue: false },
            ],
        }],
    },
    telegram: {
        nodeType: 'telegram',
        sections: [{
            label: 'Telegram Config',
            fields: [
                { key: 'botToken', label: 'Bot Token', type: 'text', placeholder: '123456:ABC-DEF...' },
                {
                    key: 'parseMode', label: 'Parse Mode', type: 'select', defaultValue: 'Markdown', options: [
                        { label: 'Markdown', value: 'Markdown' },
                        { label: 'HTML', value: 'HTML' },
                        { label: 'Plain Text', value: 'plain' },
                    ]
                },
                { key: 'disableNotification', label: 'Silent', type: 'toggle', defaultValue: false },
                { key: 'disablePreview', label: 'Disable Preview', type: 'toggle', defaultValue: false },
            ],
        }],
    },
    whatsapp: {
        nodeType: 'whatsapp',
        sections: [{
            label: 'WhatsApp Config',
            fields: [
                { key: 'apiToken', label: 'API Token', type: 'text', placeholder: 'Bearer token...' },
                { key: 'phoneNumberId', label: 'Phone Number ID', type: 'text', placeholder: '1234567890' },
                {
                    key: 'action', label: 'Action', type: 'select', defaultValue: 'send_text', options: [
                        { label: 'Send Text', value: 'send_text' },
                        { label: 'Send Template', value: 'send_template' },
                        { label: 'Send Media', value: 'send_media' },
                        { label: 'Send Location', value: 'send_location' },
                    ]
                },
                {
                    key: 'templateLanguage', label: 'Template Lang', type: 'select', defaultValue: 'en', options: [
                        { label: 'English', value: 'en' },
                        { label: 'Arabic', value: 'ar' },
                        { label: 'Spanish', value: 'es' },
                        { label: 'French', value: 'fr' },
                    ]
                },
            ],
        }],
    },
    research: {
        nodeType: 'research',
        sections: [{
            label: 'Research Config',
            fields: [
                {
                    key: 'researchType', label: 'Type', type: 'select', defaultValue: 'Market Analysis', options: [
                        { label: 'Market Analysis', value: 'Market Analysis' },
                        { label: 'Competitor Audit', value: 'Competitor Audit' },
                        { label: 'Audience Insights', value: 'Audience Insights' },
                        { label: 'Trend Report', value: 'Trend Report' },
                        { label: 'Keyword Research', value: 'Keyword Research' },
                    ]
                },
                {
                    key: 'depth', label: 'Depth', type: 'select', defaultValue: 'Standard', options: [
                        { label: 'Quick Scan', value: 'Quick Scan' },
                        { label: 'Standard', value: 'Standard' },
                        { label: 'Deep Dive', value: 'Deep Dive' },
                    ]
                },
                { key: 'maxSources', label: 'Max Sources', type: 'number', defaultValue: 10, min: 1, max: 50 },
            ],
        }],
    },
    content_plan: {
        nodeType: 'content_plan',
        sections: [{
            label: 'Planning Config',
            fields: [
                {
                    key: 'planType', label: 'Plan Type', type: 'select', defaultValue: 'Editorial Calendar', options: [
                        { label: 'Editorial Calendar', value: 'Editorial Calendar' },
                        { label: 'Campaign Brief', value: 'Campaign Brief' },
                        { label: 'Content Pillars', value: 'Content Pillars' },
                        { label: 'Channel Strategy', value: 'Channel Strategy' },
                        { label: 'Content Audit', value: 'Content Audit' },
                    ]
                },
                {
                    key: 'timeframe', label: 'Timeframe', type: 'select', defaultValue: '1 Month', options: [
                        { label: '1 Week', value: '1 Week' },
                        { label: '2 Weeks', value: '2 Weeks' },
                        { label: '1 Month', value: '1 Month' },
                        { label: '1 Quarter', value: '1 Quarter' },
                        { label: '1 Year', value: '1 Year' },
                    ]
                },
                { key: 'postsPerWeek', label: 'Posts/Week', type: 'number', defaultValue: 3, min: 1, max: 21 },
            ],
        }],
    },
    meta_ads: {
        nodeType: 'meta_ads',
        sections: [{
            label: 'Meta Ads Config',
            fields: [
                {
                    key: 'objective', label: 'Objective', type: 'select', defaultValue: 'Awareness', options: [
                        { label: 'Awareness', value: 'Awareness' },
                        { label: 'Traffic', value: 'Traffic' },
                        { label: 'Engagement', value: 'Engagement' },
                        { label: 'Leads', value: 'Leads' },
                        { label: 'Conversions', value: 'Conversions' },
                        { label: 'App Installs', value: 'App Installs' },
                    ]
                },
                {
                    key: 'placement', label: 'Placement', type: 'select', defaultValue: 'Automatic', options: [
                        { label: 'Automatic', value: 'Automatic' },
                        { label: 'Feed', value: 'Feed' },
                        { label: 'Stories', value: 'Stories' },
                        { label: 'Reels', value: 'Reels' },
                        { label: 'Messenger', value: 'Messenger' },
                    ]
                },
                { key: 'dailyBudget', label: 'Daily Budget ($)', type: 'number', defaultValue: 20, min: 1, max: 10000 },
                { key: 'accessToken', label: 'Access Token', type: 'text', placeholder: 'EAAx...' },
            ],
        }],
    },
    google_ads: {
        nodeType: 'google_ads',
        sections: [{
            label: 'Google Ads Config',
            fields: [
                {
                    key: 'campaignType', label: 'Campaign Type', type: 'select', defaultValue: 'Search', options: [
                        { label: 'Search', value: 'Search' },
                        { label: 'Display', value: 'Display' },
                        { label: 'Shopping', value: 'Shopping' },
                        { label: 'Video', value: 'Video' },
                        { label: 'Performance Max', value: 'Performance Max' },
                        { label: 'App', value: 'App' },
                    ]
                },
                {
                    key: 'bidStrategy', label: 'Bid Strategy', type: 'select', defaultValue: 'Max Clicks', options: [
                        { label: 'Max Clicks', value: 'Max Clicks' },
                        { label: 'Max Conversions', value: 'Max Conversions' },
                        { label: 'Target CPA', value: 'Target CPA' },
                        { label: 'Target ROAS', value: 'Target ROAS' },
                        { label: 'Manual CPC', value: 'Manual CPC' },
                    ]
                },
                { key: 'dailyBudget', label: 'Daily Budget ($)', type: 'number', defaultValue: 30, min: 1, max: 10000 },
                { key: 'customerId', label: 'Customer ID', type: 'text', placeholder: '123-456-7890' },
            ],
        }],
    },

    // ── CORE/REFINEMENT (minimal settings) ──
    image: {
        nodeType: 'image',
        sections: [{
            label: 'Image Settings',
            fields: [
                {
                    key: 'quality', label: 'Quality', type: 'select', defaultValue: 'high', options: [
                        { label: 'Low', value: 'low' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'High', value: 'high' },
                    ]
                },
            ],
        }],
    },
    palette: {
        nodeType: 'palette',
        sections: [{
            label: 'Color Settings',
            fields: [
                {
                    key: 'format', label: 'Format', type: 'select', defaultValue: 'hex', options: [
                        { label: 'HEX', value: 'hex' },
                        { label: 'RGB', value: 'rgb' },
                        { label: 'HSL', value: 'hsl' },
                    ]
                },
            ],
        }],
    },
    tone: {
        nodeType: 'tone',
        sections: [{
            label: 'Tone Config',
            fields: [
                {
                    key: 'scale', label: 'Scale', type: 'select', defaultValue: '5-point', options: [
                        { label: '3-Point', value: '3-point' },
                        { label: '5-Point', value: '5-point' },
                        { label: '10-Point', value: '10-point' },
                    ]
                },
            ],
        }],
    },
    logic: {
        nodeType: 'logic',
        sections: [{
            label: 'Logic Config',
            fields: [
                {
                    key: 'operator', label: 'Operator', type: 'select', defaultValue: 'equals', options: [
                        { label: 'Equals', value: 'equals' },
                        { label: 'Not Equals', value: 'not_equals' },
                        { label: 'Greater Than', value: 'gt' },
                        { label: 'Less Than', value: 'lt' },
                        { label: 'Contains', value: 'contains' },
                    ]
                },
            ],
        }],
    },
};
