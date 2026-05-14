import fs from 'node:fs';
import path from 'node:path';
import { getSnippetByFilename } from './snippets.metadata.js';

export default {
    load() {
        const snippetsDir = path.resolve(__dirname, '../snippets');

        if (!fs.existsSync(snippetsDir)) {
            return [];
        }

        const files = fs.readdirSync(snippetsDir).filter((file) => file.endsWith('.js'));

        return files.map((file) => {
            const name = file.replace('.js', '');
            const metadata = getSnippetByFilename(file);

            return {
                filename: file,
                name,
                title: metadata?.title ?? name,
                category: metadata?.category ?? 'Client-internal snippet',
                risk: metadata?.risk ?? 'Unknown',
                link: `/examples/${metadata?.slug ?? name}`,
                description: metadata?.summary ?? 'Client-internal snippet. Review carefully before testing.',
            };
        });
    },
};
