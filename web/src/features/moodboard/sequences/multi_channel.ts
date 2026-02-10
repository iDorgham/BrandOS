import { WorkflowTemplate } from './types';

export const multi_channel_distro: WorkflowTemplate = {
    id: 'multi_channel',
    label: 'Multi_Channel_Distro',
    description: 'Distribute content to Email, Drive, and Telegram at once.',
    category: 'Automations',
    nodes: [
        { id: 'r1', type: 'receiver', position: { x: 100, y: 300 }, data: { label: 'Final_Review', type: 'receiver' } },
        { id: 's1', type: 'switch', position: { x: 450, y: 300 }, data: { label: 'Fan_Out', type: 'switch', mode: 'Broadcaster' } },
        { id: 'em1', type: 'emitter', position: { x: 850, y: 100 }, data: { label: 'Email_Blast', type: 'emitter' } },
        { id: 'em2', type: 'emitter', position: { x: 850, y: 300 }, data: { label: 'Backup_Drive', type: 'emitter' } },
        { id: 'em3', type: 'emitter', position: { x: 850, y: 500 }, data: { label: 'Telegram_Alert', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 'r1', target: 's1' },
        { id: 'e2', source: 's1', target: 'em1', sourceHandle: 'source-0' },
        { id: 'e3', source: 's1', target: 'em2', sourceHandle: 'source-1' },
        { id: 'e4', source: 's1', target: 'em3', sourceHandle: 'source-2' },
    ],
};
