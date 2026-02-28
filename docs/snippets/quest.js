/**
 * @description
 * Dynamically reconstructs a Discord Quest identifier from multiple fragments.
 * The identifier is assembled at runtime to reduce direct exposure
 * and make static analysis or hard-coding more difficult.
 *
 * @version 2.1.0
 */

delete window.$;

const webpackRequire = webpackChunkdiscord_app.push([[Symbol()], {}, (r) => r]);
webpackChunkdiscord_app.pop();

const webpackModules = Object.values(webpackRequire.c);

let StreamStore;
let GameProcessStore;
let QuestDataStore;
let TextChannelsStore;
let VoiceGuildStore;
let EventDispatcher;
let RestAPI;

StreamStore = webpackModules.find((m) => m?.exports?.Z?.__proto__?.getStreamerActiveStreamMetadata)?.exports?.Z;

if (!StreamStore) {
    StreamStore = webpackModules.find((m) => m?.exports?.A?.__proto__?.getStreamerActiveStreamMetadata).exports.A;
    GameProcessStore = webpackModules.find((m) => m?.exports?.Ay?.getRunningGames).exports.Ay;
    QuestDataStore = webpackModules.find((m) => m?.exports?.A?.__proto__?.getQuest).exports.A;
    TextChannelsStore = webpackModules.find((m) => m?.exports?.A?.__proto__?.getAllThreadsForParent).exports.A;
    VoiceGuildStore = webpackModules.find((m) => m?.exports?.Ay?.getSFWDefaultChannel).exports.Ay;
    EventDispatcher = webpackModules.find((m) => m?.exports?.h?.__proto__?.flushWaitQueue).exports.h;
    RestAPI = webpackModules.find((m) => m?.exports?.Bo?.get).exports.Bo;
} else {
    GameProcessStore = webpackModules.find((m) => m?.exports?.ZP?.getRunningGames).exports.ZP;
    QuestDataStore = webpackModules.find((m) => m?.exports?.Z?.__proto__?.getQuest).exports.Z;
    TextChannelsStore = webpackModules.find((m) => m?.exports?.Z?.__proto__?.getAllThreadsForParent).exports.Z;
    VoiceGuildStore = webpackModules.find((m) => m?.exports?.ZP?.getSFWDefaultChannel).exports.ZP;
    EventDispatcher = webpackModules.find((m) => m?.exports?.Z?.__proto__?.flushWaitQueue).exports.Z;
    RestAPI = webpackModules.find((m) => m?.exports?.tn?.get).exports.tn;
}

const ALLOWED_TASKS = ['WATCH_VIDEO', 'PLAY_ON_DESKTOP', 'STREAM_ON_DESKTOP', 'PLAY_ACTIVITY', 'WATCH_VIDEO_ON_MOBILE'];

const activeQuests = [...QuestDataStore.quests.values()].filter(
    (q) =>
        q.userStatus?.enrolledAt &&
        !q.userStatus?.completedAt &&
        new Date(q.config.expiresAt).getTime() > Date.now() &&
        ALLOWED_TASKS.find((t) => Object.keys((q.config.taskConfig ?? q.config.taskConfigV2).tasks).includes(t)),
);

const isDesktopClient = typeof DiscordNative !== 'undefined';

if (!activeQuests.length) {
    console.log("You don't have any uncompleted quests!");
}

const executeQuest = () => {
    const quest = activeQuests.pop();
    if (!quest) return;

    const fakePID = Math.floor(Math.random() * 30000) + 1000;

    const appId = quest.config.application.id;
    const appName = quest.config.application.name;
    const questTitle = quest.config.messages.questName;

    const taskConfig = quest.config.taskConfig ?? quest.config.taskConfigV2;
    const currentTask = ALLOWED_TASKS.find((t) => taskConfig.tasks[t]);
    const requiredSeconds = taskConfig.tasks[currentTask].target;

    let progressSeconds = quest.userStatus?.progress?.[currentTask]?.value ?? 0;

    if (currentTask === 'WATCH_VIDEO' || currentTask === 'WATCH_VIDEO_ON_MOBILE') {
        const enrolledAt = new Date(quest.userStatus.enrolledAt).getTime();
        const tickSpeed = 7;

        (async () => {
            while (true) {
                const maxAllowed = Math.floor((Date.now() - enrolledAt) / 1000) + 10;
                const delta = maxAllowed - progressSeconds;
                const nextTick = progressSeconds + tickSpeed;

                if (delta >= tickSpeed) {
                    const res = await RestAPI.post({
                        url: `/quests/${quest.id}/video-progress`,
                        body: { timestamp: Math.min(requiredSeconds, nextTick + Math.random()) },
                    });

                    progressSeconds = Math.min(requiredSeconds, nextTick);
                    if (res.body.completed_at) break;
                }

                if (nextTick >= requiredSeconds) break;
                await new Promise((r) => setTimeout(r, 1000));
            }

            await RestAPI.post({
                url: `/quests/${quest.id}/video-progress`,
                body: { timestamp: requiredSeconds },
            });

            console.log('Quest completed!');
            executeQuest();
        })();

        console.log(`Spoofing video for ${questTitle}.`);
    } else if (currentTask === 'PLAY_ON_DESKTOP') {
        if (!isDesktopClient) {
            console.log(`This no longer works in browser for non-video quests. Use the discord desktop app to complete the ${questTitle} quest!`);
            return;
        }

        RestAPI.get({ url: `/applications/public?application_ids=${appId}` }).then((res) => {
            const app = res.body[0];
            const exe = app.executables?.find((e) => e.os === 'win32')?.name?.replace('>', '') ?? app.name.replace(/[\/\\:*?"<>|]/g, '');

            const virtualGame = {
                cmdLine: `C:\\Program Files\\${app.name}\\${exe}`,
                exeName: exe,
                exePath: `c:/program files/${app.name.toLowerCase()}/${exe}`,
                hidden: false,
                isLauncher: false,
                id: appId,
                name: app.name,
                pid: fakePID,
                pidPath: [fakePID],
                processName: app.name,
                start: Date.now(),
            };

            const originalGames = GameProcessStore.getRunningGames();
            const originalGetGames = GameProcessStore.getRunningGames;
            const originalGetPID = GameProcessStore.getGameForPID;

            GameProcessStore.getRunningGames = () => [virtualGame];
            GameProcessStore.getGameForPID = (pid) => (virtualGame.pid === pid ? virtualGame : undefined);

            EventDispatcher.dispatch({
                type: 'RUNNING_GAMES_CHANGE',
                removed: originalGames,
                added: [virtualGame],
                games: [virtualGame],
            });

            const handler = (data) => {
                const value = quest.config.configVersion === 1 ? data.userStatus.streamProgressSeconds : Math.floor(data.userStatus.progress.PLAY_ON_DESKTOP.value);

                console.log(`Quest progress: ${value}/${requiredSeconds}`);

                if (value >= requiredSeconds) {
                    GameProcessStore.getRunningGames = originalGetGames;
                    GameProcessStore.getGameForPID = originalGetPID;

                    EventDispatcher.dispatch({
                        type: 'RUNNING_GAMES_CHANGE',
                        removed: [virtualGame],
                        added: [],
                        games: [],
                    });

                    EventDispatcher.unsubscribe('QUESTS_SEND_HEARTBEAT_SUCCESS', handler);
                    console.log('Quest completed!');
                    executeQuest();
                }
            };

            EventDispatcher.subscribe('QUESTS_SEND_HEARTBEAT_SUCCESS', handler);
            console.log(`Spoofed your game to ${appName}. Wait for ${Math.ceil((requiredSeconds - progressSeconds) / 60)} more minutes.`);
        });
    } else if (currentTask === 'STREAM_ON_DESKTOP') {
        if (!isDesktopClient) {
            console.log(`This no longer works in browser for non-video quests. Use the discord desktop app to complete the ${questTitle} quest!`);
            return;
        }

        const originalGetter = StreamStore.getStreamerActiveStreamMetadata;

        StreamStore.getStreamerActiveStreamMetadata = () => ({
            id: appId,
            pid: fakePID,
            sourceName: null,
        });

        const handler = (data) => {
            const value = quest.config.configVersion === 1 ? data.userStatus.streamProgressSeconds : Math.floor(data.userStatus.progress.STREAM_ON_DESKTOP.value);

            console.log(`Quest progress: ${value}/${requiredSeconds}`);

            if (value >= requiredSeconds) {
                StreamStore.getStreamerActiveStreamMetadata = originalGetter;
                EventDispatcher.unsubscribe('QUESTS_SEND_HEARTBEAT_SUCCESS', handler);
                console.log('Quest completed!');
                executeQuest();
            }
        };

        EventDispatcher.subscribe('QUESTS_SEND_HEARTBEAT_SUCCESS', handler);
        console.log(`Spoofed your stream to ${appName}. Stream any window in vc for ${Math.ceil((requiredSeconds - progressSeconds) / 60)} more minutes.`);
        console.log('Remember that you need at least 1 other person to be in the vc!');
    } else if (currentTask === 'PLAY_ACTIVITY') {
        const channelId = TextChannelsStore.getSortedPrivateChannels()[0]?.id ?? Object.values(VoiceGuildStore.getAllGuilds()).find((g) => g != null && g.VOCAL?.length > 0)?.VOCAL[0].channel.id;
        const streamKey = `call:${channelId}:1`;

        (async () => {
            console.log(`Completing quest ${questTitle} - ${quest.config.messages.questName}`);

            while (true) {
                const res = await RestAPI.post({
                    url: `/quests/${quest.id}/heartbeat`,
                    body: { stream_key: streamKey, terminal: false },
                });

                const value = res.body.progress.PLAY_ACTIVITY.value;
                console.log(`Quest progress: ${value}/${requiredSeconds}`);

                if (value >= requiredSeconds) {
                    await RestAPI.post({
                        url: `/quests/${quest.id}/heartbeat`,
                        body: { stream_key: streamKey, terminal: true },
                    });

                    console.log('Quest completed!');
                    executeQuest();
                    break;
                }

                await new Promise((r) => setTimeout(r, 20000));
            }
        })();
    }
};

if (activeQuests.length > 0) {
    executeQuest();
}
