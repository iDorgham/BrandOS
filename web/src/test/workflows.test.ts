import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { PORT_SPECS } from '../features/moodboard/execution/portSpecs';

const WORKFLOW_ROOT = path.resolve(__dirname, '../../../docs/Workflows');

describe('Workflow Comprehensive Verification (Waves 1-7)', () => {
    const waves = ['wave-1', 'wave-2', 'wave-3', 'wave-4', 'wave-5', 'wave-6', 'wave-7'];

    waves.forEach(wave => {
        const wavePath = path.join(WORKFLOW_ROOT, wave);
        if (!fs.existsSync(wavePath)) return;

        const files = fs.readdirSync(wavePath).filter(f => f.endsWith('.json'));

        describe(`Wave: ${wave}`, () => {
            files.forEach(file => {
                it(`should validate ${file}`, () => {
                    const filePath = path.join(wavePath, file);
                    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                    try {
                        expect(content).toHaveProperty('id');
                        expect(content).toHaveProperty('nodes');
                        expect(content).toHaveProperty('edges');

                        const nodeIds = new Set(content.nodes.map((n: any) => n.id));

                        content.nodes.forEach((node: any) => {
                            const spec = PORT_SPECS[node.type];
                            if (!spec && node.type !== 'group') {
                                throw new Error(`Invalid node type "${node.type}"`);
                            }
                        });

                        content.edges.forEach((edge: any) => {
                            if (!nodeIds.has(edge.source)) throw new Error(`Missing source node ${edge.source}`);
                            if (!nodeIds.has(edge.target)) throw new Error(`Missing target node ${edge.target}`);
                        });

                        // Cycle Detection
                        const adj = new Map<string, string[]>();
                        nodeIds.forEach(id => adj.set(id, []));
                        content.edges.forEach((e: any) => adj.get(e.source)?.push(e.target));
                        const visited = new Set<string>();
                        const stack = new Set<string>();
                        function hasCycle(v: string): boolean {
                            visited.add(v);
                            stack.add(v);
                            for (const neighbor of adj.get(v) || []) {
                                if (!visited.has(neighbor)) {
                                    if (hasCycle(neighbor)) return true;
                                } else if (stack.has(neighbor)) return true;
                            }
                            stack.delete(v);
                            return false;
                        }
                        nodeIds.forEach(id => {
                            if (!visited.has(id)) {
                                if (hasCycle(id)) throw new Error('Graph contains a cycle');
                            }
                        });
                    } catch (e: any) {
                        console.error(`[FAIL] ${wave}/${file}: ${e.message}`);
                        throw e;
                    }
                });
            });
        });
    });
});
