import { test } from 'vitest';
import fs from 'fs';
import path from 'path';
import { PORT_SPECS } from '../features/moodboard/execution/portSpecs';

test('debug wave-6', () => {
    const file = path.resolve(__dirname, '../../../docs/Workflows/wave-6/saas-broadcaster.json');
    const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
    console.log('ID:', content.id);
    content.nodes.forEach(n => {
        console.log(`Node ${n.id} type: ${n.type} - Valid: ${!!PORT_SPECS[n.type]}`);
    });
});
