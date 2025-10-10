import { defineConfig } from 'vitepress';

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
                    items: [
                        { text: 'Examples Hub', link: '/examples/examples-hub' },
                        { text: 'Quest', link: '/examples/quest' },
                    ],
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
