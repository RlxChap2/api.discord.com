import { defineConfig } from 'vitepress';
import { snippets as snippetMetadata } from '../examples/snippets.metadata.js';

function getExamplesSidebar() {
    return [
        { text: 'Snippet Reference', link: '/examples/examples-hub' },
        ...snippetMetadata.map((snippet) => ({
            text: snippet.title,
            link: `/examples/${snippet.slug}`,
        })),
    ];
}

export default defineConfig({
    base: '/api.discord.com/',
    cleanUrls: true,
    lang: 'en-US',
    lastUpdated: true,
    title: 'Discord Client Research',
    titleTemplate: ':title | Discord Client Research',
    description: "A safer guide to Discord client Webpack research, module discovery, React and Flux inspection, and security context.",
    markdown: {
        lineNumbers: true,
    },
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/docs/introduction' },
            { text: 'Snippets', link: '/examples/examples-hub' },
            { text: 'Security', link: '/docs/security' },
        ],
        search: {
            provider: 'local',
        },

        sidebar: {
            '/examples/': [
                {
                    text: 'Snippet Reference',
                    items: getExamplesSidebar(),
                },
            ],
            '/docs/': [
                {
                    text: 'Start',
                    items: [
                        { text: 'Introduction', link: '/docs/introduction' },
                        { text: 'Architecture Overview', link: '/docs/explanation' },
                    ],
                },
                {
                    text: 'Research Workflow',
                    items: [
                        { text: 'Webpack Runtime', link: '/docs/webpack-runtime' },
                        { text: 'Module Discovery', link: '/docs/module-discovery' },
                        { text: 'React and Flux', link: '/docs/react-flux' },
                        { text: 'BetterDiscord Workflow', link: '/docs/betterdiscord-workflow' },
                    ],
                },
                {
                    text: 'Safety',
                    items: [
                        { text: 'Security Notes', link: '/docs/security' },
                        { text: 'Sources', link: '/docs/sources' },
                    ],
                },
            ],
            '/': [{ text: 'Home', link: '/' }],
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/RlxChap2/api.discord.com' }],
        docFooter: {
            prev: 'Previous',
            next: 'Next',
        },
        footer: {
            message: 'Unofficial educational research documentation. Use official Discord APIs for production integrations.',
            copyright: 'Released under the project license.',
        },

        outline: [2, 3],
    },
});
