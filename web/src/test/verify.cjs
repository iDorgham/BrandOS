const fs = require('fs');
const path = require('path');

// Mock PORT_SPECS or read it from the file
// For simplicity, I'll just extract the keys from the file
const portSpecsContent = fs.readFileSync(path.resolve(__dirname, '../features/moodboard/execution/portSpecs.ts'), 'utf-8');
const validTypes = new Set();
const typeMatches = portSpecsContent.matchAll(/([a-z0-9_]+):\s*{/g);
for (const match of typeMatches) {
    validTypes.add(match[1]);
}
// Add group manually
validTypes.add('group');

const WORKFLOW_ROOT = path.resolve(__dirname, '../../../docs/Workflows');

// Recursive function to get all json files
function getFiles(dir, allFiles = []) {
    if (!fs.existsSync(dir)) return allFiles;
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const name = path.join(dir, f);
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, allFiles);
        } else if (f.endsWith('.json')) {
            allFiles.push(name);
        }
    }
    return allFiles;
}

const allWorkflowFiles = getFiles(WORKFLOW_ROOT);

let total = 0;
let passed = 0;
let failed = 0;

allWorkflowFiles.forEach(filePath => {
    total++;
    const relativePath = path.relative(WORKFLOW_ROOT, filePath);
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const nodeIds = new Set(content.nodes.map(n => n.id));

        content.nodes.forEach(node => {
            if (!validTypes.has(node.type)) {
                throw new Error(`Invalid node type: ${node.type}`);
            }
        });

        content.edges.forEach(edge => {
            if (!nodeIds.has(edge.source)) throw new Error(`Missing source node ${edge.source}`);
            if (!nodeIds.has(edge.target)) throw new Error(`Missing target node ${edge.target}`);
        });

        passed++;
    } catch (e) {
        failed++;
        console.log(`[FAIL] ${relativePath}: ${e.message}`);
    }
});

console.log(`\nSummary: ${passed}/${total} passed, ${failed} failed.`);

