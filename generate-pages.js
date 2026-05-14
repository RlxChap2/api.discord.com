import fs from 'fs';
import path from 'path';
import { getSnippetByFilename } from './docs/examples/snippets.metadata.js';

const snippetsDir = path.resolve('docs/snippets');
const examplesDir = path.resolve('docs/examples');

if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir, { recursive: true });
}

if (fs.existsSync(snippetsDir)) {
    const files = fs.readdirSync(snippetsDir).filter((file) => file.endsWith('.js'));

    files.forEach((file) => {
        const name = file.replace('.js', '');
        const metadata = getSnippetByFilename(file);
        const title = metadata?.title ?? name.charAt(0).toUpperCase() + name.slice(1);
        const slug = metadata?.slug ?? name;
        const mdFilePath = path.join(examplesDir, `${slug}.md`);

        const mdContent = `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(metadata?.summary ?? `Reference notes for ${name}.`)}
---

# ${title}

::: ${metadata?.tone ?? 'warning'} Risk: ${metadata?.risk ?? 'Unknown'}
${metadata?.summary ?? 'This snippet touches Discord client internals. Review carefully before testing.'}
:::

## Overview

${metadata?.useCase ?? 'This page documents the snippet behavior, dependencies, and failure modes.'}

## What The Code Does

${renderList(metadata?.behavior)}

## Main Dependencies

${renderDependencyTable(metadata?.dependencies)}

## Implementation Notes

${renderList(metadata?.notes)}

## Failure Modes

${renderList(metadata?.failureModes)}

## Safer Study Path

${renderList(metadata?.saferStudy)}

## Source

The source below is included from \`docs/snippets/${file}\` so this page stays connected to the real snippet file.

<<< ../snippets/${file}
`;

        fs.writeFileSync(mdFilePath, mdContent, 'utf8');
        console.log(`Generated: docs/examples/${slug}.md`);
    });
} else {
    console.log('Directory docs/snippets/ not found!');
}

function renderList(items = []) {
    if (!items.length) return '- No notes recorded.';
    return items.map((item) => `- ${item}`).join('\n');
}

function renderDependencyTable(rows = []) {
    if (!rows.length) return 'No dependency notes recorded.';

    const body = rows.map(([area, detail]) => `| ${area} | ${detail} |`).join('\n');

    return `| Area | Details |\n| --- | --- |\n${body}`;
}
