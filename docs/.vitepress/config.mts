import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';

function getExamplesSidebar() {
    const items = [{ text: 'Examples Hub', link: '/examples/examples-hub' }];

    const snippetsDir1 = path.resolve('docs/snippets');
    const snippetsDir2 = path.resolve('snippets');

    const targetDir = fs.existsSync(snippetsDir1) ? snippetsDir1 : fs.existsSync(snippetsDir2) ? snippetsDir2 : null;

    if (targetDir) {
        const files = fs.readdirSync(targetDir).filter((file) => file.endsWith('.js'));

        files.forEach((file) => {
            const name = file.replace('.js', '');

            const title = name.charAt(0).toUpperCase() + name.slice(1);

            items.push({ text: title, link: `/examples/${name}` });
        });
    }

    return items;
}

export default defineConfig({
    base: '/api.discord.com/',
    title: 'Gathering Discord API',
    description: "Explore and master Discord's client-side API using webpackChunkdiscord_app snippets",
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/examples/examples-hub' },
            { text: 'Docs', link: '/docs/introduction' },
        ],

        sidebar: {
            '/examples/': [
                {
                    text: 'Examples',
                    items: getExamplesSidebar(),
                },
            ],
            '/docs/': [
                {
                    text: 'Documentation',
                    items: [
                        { text: 'Introduction', link: '/docs/introduction' },
                        { text: 'Explanations', link: '/docs/explanation' },
                    ],
                },
            ],
            '/': [{ text: 'Home', link: '/' }],
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/RlxChap2/api.discord.com' }],

        outline: [2, 3],
    },
});
