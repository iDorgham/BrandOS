import { WorkflowTemplate } from './types';

export const vocal_to_video_pipeline: WorkflowTemplate = {
    id: 'vocal_to_video',
    label: 'Sonic-to-Visual Pipeline',
    description: 'Advanced transcription and visual synthesis for high-engagement video content.',
    category: 'Automations',
    nodes: [
        { id: 't1', type: 'trigger', position: { x: 0, y: 0 }, data: { label: 'Script_Prompt', type: 'trigger' } },
        { id: 'c1', type: 'content', position: { x: 350, y: 0 }, data: { label: 'Video_Scriptwriter', type: 'content' } },
        { id: 'e1', type: 'engine', position: { x: 700, y: -150 }, data: { label: 'Voice_Synth_Logic', type: 'engine' } },
        { id: 'm1', type: 'midjourney', position: { x: 700, y: 150 }, data: { label: 'Scene_Illustrations', type: 'midjourney' } },
        { id: 'enc1', type: 'encoder', position: { x: 1100, y: 0 }, data: { label: 'Video_Compositor', type: 'encoder' } },
        { id: 'em1', type: 'emitter', position: { x: 1450, y: 0 }, data: { label: 'YouTube_Upload', type: 'emitter' } },
    ],
    edges: [
        { id: 'e1', source: 't1', target: 'c1' },
        { id: 'e2', source: 'c1', target: 'e1' },
        { id: 'e3', source: 'c1', target: 'm1' },
        { id: 'e4', source: 'e1', target: 'enc1' },
        { id: 'e5', source: 'm1', target: 'enc1' },
        { id: 'e6', source: 'enc1', target: 'em1' },
    ],
};
