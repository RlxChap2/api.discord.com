import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';

function getExamplesSidebar() {
    const items = [{ text: 'Legacy Snippets Hub', link: '/examples/examples-hub' }];

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
    title: 'Discord Client Research',
    description: "A safer guide to Discord client Webpack research, module discovery, React and Flux inspection, and security context.",
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Docs', link: '/docs/introduction' },
            { text: 'Legacy Snippets', link: '/examples/examples-hub' },
        ],

        sidebar: {
            '/examples/': [
                {
                    text: 'Legacy Snippets',
                    items: getExamplesSidebar(),
                },
            ],
            '/docs/': [
                {
                    text: 'Documentation',
                    items: [
                        { text: 'Introduction', link: '/docs/introduction' },
                        { text: 'Architecture Overview', link: '/docs/explanation' },
                        { text: 'Webpack Runtime', link: '/docs/webpack-runtime' },
                        { text: 'Module Discovery', link: '/docs/module-discovery' },
                        { text: 'React and Flux', link: '/docs/react-flux' },
                        { text: 'BetterDiscord Workflow', link: '/docs/betterdiscord-workflow' },
                        { text: 'Security Notes', link: '/docs/security' },
                        { text: 'Sources', link: '/docs/sources' },
                    ],
                },
            ],
            '/': [{ text: 'Home', link: '/' }],
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/RlxChap2/api.discord.com' }],

        outline: [2, 3],
    },
});
