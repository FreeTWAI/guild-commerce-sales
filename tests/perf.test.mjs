import {test} from 'node:test';
import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {readFile} from 'node:fs/promises';
import {validateWorkspace, renderWorkspace} from '../scripts/build.mjs';

const workspace = JSON.parse(await readFile(new URL('../workspace.json', import.meta.url), 'utf8'));

test('performance check for validation and render', () => {
    const start = performance.now();
    for (let i = 0; i < 50000; i++) {
        validateWorkspace(workspace);
        renderWorkspace(workspace);
    }
    const end = performance.now();
    console.log(`Benchmark completed in ${end - start}ms`);
    assert.ok(end - start < 5000, `Performance regression: ${end - start}ms`);
});
