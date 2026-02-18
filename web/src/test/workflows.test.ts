import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { PORT_SPECS } from '../features/moodboard/execution/portSpecs';

const WORKFLOW_ROOT = path.resolve(__dirname, '../../../docs/Workflows');

describe('Workflow Comprehensive Verification', () => {
    // Read all JSON files from the root of Workflows directory
    const files = fs.readdirSync(WORKFLOW_ROOT).filter(f => f.endsWith('.json'));

    files.forEach(file => {
        it(`should validate ${file}`, () => {
            const filePath = path.join(WORKFLOW_ROOT, file);
            const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            try {
                expect(content).toHaveProperty('id');
                // Allow 'nodes' to be missing if it's an empty workflow, or check if it should always be there.
                // Assuming valid workflows should have nodes.
                expect(content).toHaveProperty('nodes');
                expect(content).toHaveProperty('edges');

                const nodeIds = new Set(content.nodes.map((n: any) => n.id));

                content.nodes.forEach((node: any) => {
                    // Check if node type exists in PORT_SPECS.
                    // Note: 'group' type is handled specially in the original code, preserving that.
                    const spec = PORT_SPECS[node.type];
                    if (!spec && node.type !== 'group') {
                        // Some nodes might be new or not in PORT_SPECS yet.
                        // But for verification we stick to strict check for now.
                        throw new Error(`Invalid node type "${node.type}"`);
                    }
                });

                content.edges.forEach((edge: any) => {
                    if (!nodeIds.has(edge.source)) throw new Error(`Missing source node ${edge.source}`);
                    if (!nodeIds.has(edge.target)) throw new Error(`Missing target node ${edge.target}`);
                });

                // Cycle Detection
                const adj = new Map<string, string[]>();
                nodeIds.forEach(id => adj.set(String(id), []));
                content.edges.forEach((e: any) => {
                    const source = adj.get(String(e.source));
                    if (source) source.push(String(e.target));
                });

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
                    if (!visited.has(String(id))) {
                        if (hasCycle(String(id))) throw new Error('Graph contains a cycle');
                    }
                });

            } catch (e: unknown) {
                const message = e instanceof Error ? e.message : String(e);
                console.error(`[FAIL] ${file}: ${message}`);
                throw e;
            }
        });
    });
});
