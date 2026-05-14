import fs from 'node:fs';
import path from 'node:path';

const descriptions = {
    allBadges: 'Legacy badge-related inspection snippet. Review before testing.',
    clydeMessage: 'Legacy local bot-message UI experiment.',
    createFriendLink: 'Legacy friend-invite helper that touches account-facing client internals.',
    Experiments: 'Legacy experiment-store inspection snippet.',
    fakeDeafen: 'Legacy voice-state behavior experiment.',
    findByUsername: 'Legacy local user lookup helper.',
    groupInvite: 'Legacy group-invite helper that touches invite creation internals.',
    hideTexting: 'Legacy typing-indicator behavior experiment.',
    ManuallyExperiment: 'Legacy manual experiment-store example.',
    official: 'Legacy official-looking client module example.',
    Quest: 'Legacy quest-related client-internal experiment.',
    serverAccess: 'Legacy guild or channel access inspection snippet.',
    TouchingGlitch: 'Legacy UI or interaction behavior experiment.',
    videoPauseRemoval: 'Legacy media behavior experiment.',
    VoiceFilter: 'Legacy voice filter and audio-related experiment.',
};

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
                link: `/examples/${name}`,
                description: descriptions[name] ?? 'Legacy client-internal snippet. Review before testing.',
            };
        });
    },
};
