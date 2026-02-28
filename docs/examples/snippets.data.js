import fs from 'node:fs';
import path from 'node:path';

export default {
    load() {
        const snippetsDir = path.resolve(__dirname, '../snippets');

        if (!fs.existsSync(snippetsDir)) {
            return [];
        }

        const files = fs.readdirSync(snippetsDir).filter((file) => file.endsWith('.js'));

        return files.map((file) => {
            const name = file.replace('.js', '');
            return {
                filename: file,
                name: name,
                link: `/examples/${name.toLowerCase()}`,
            };
        });
    },
};
