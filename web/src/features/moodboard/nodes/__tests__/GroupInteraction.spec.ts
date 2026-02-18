import { test, expect } from '@playwright/test';

test('node group interaction validation', async ({ page }) => {
    // Select multiple nodes
    await page.getByText('Text ModuleGBPL').click();
    await page.getByText('Image ModuleBXVD').click({
        modifiers: ['ControlOrMeta']
    });

    // Trigger grouping (assuming button location based on recording)
    await page.locator('div:nth-child(2) > .relative.inline-block > .h-8').click();

    // Verify Group 1 selection and interaction
    const groupNode = page.getByTestId('rf__node-2uq5b4m31').locator('div').filter({ hasText: 'Group 1NODE_ARRAY_ROOT' }).nth(2);

    await groupNode.click();
    await groupNode.click();

    // Click pane to deselect
    await page.locator('.react-flow__pane').click();
    await page.locator('.react-flow__pane').dblclick();

    // Interaction stress test on group node
    await groupNode.click();
    await groupNode.click();
    await groupNode.click();
    await groupNode.dblclick();
    await groupNode.click();

    // Deselect
    await page.locator('.react-flow__pane').click();
    await page.locator('.react-flow__pane').click();

    // Verify Resizer interaction (Temporal Integrity)
    await page.locator('.react-flow__resize-control.nodrag.bottom.right').click();
    await page.locator('.react-flow__pane').click();
});
