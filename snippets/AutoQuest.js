delete window.$;

const wpModules = webpackChunkdiscord_app.push([[Symbol()], {}, (r) => r.c]);
webpackChunkdiscord_app.pop();

const getModule = (fn) => Object.values(wpModules).find(fn)?.exports;

const streamMod = getModule((m) => m?.exports?.Z?.__proto__?.getStreamerActiveStreamMetadata)?.Z;
const gamesMod = getModule((m) => m?.exports?.ZP?.getRunningGames)?.ZP;
const questsMod = getModule((m) => m?.exports?.Z?.__proto__?.getQuest)?.Z;
const threadsMod = getModule((m) => m?.exports?.Z?.__proto__?.getAllThreadsForParent)?.Z;
const guildMod = getModule((m) => m?.exports?.ZP?.getSFWDefaultChannel)?.ZP;
const flushMod = getModule((m) => m?.exports?.Z?.__proto__?.flushWaitQueue)?.Z;
const questStore = getModule((m) => m?.exports?.tn?.get)?.tn;

const getAllQuests = [...questsMod.quests.values()];
const quest = getAllQuests.find((x) => {
    const status = x.userStatus;
    return status?.started === true && status?.progress?.completed !== true;
});

if (!quest) {
    console.log('No active tasks found or the task timer has expired.');
} else {
    const isDesktopApp = typeof DiscordNative !== 'undefined';
    const publicId = Math.floor(Math.random() * 30000) + 1000;
    const appId = quest.config.application.id;
    const appName = quest.config.application.name;

    const availableTasks = quest?.config?.taskConfigV2?.tasks;
    if (!availableTasks) {
        console.error('No tasks found in taskConfigV2.');
    } else {
        const taskType = Object.keys(availableTasks)[0];
        const targetTime = availableTasks[taskType]?.target;
        const currentProgress = quest.userStatus?.progress?.[taskType]?.value ?? 0;

        if (!isDesktopApp) {
            console.log('This task only works in the Discord desktop app. Please run the code there.');
        }

        questStore.get({ url: `/applications/public?application_ids=${appId}` }).then((res) => {
            const appData = res.body[0];
            const exeName = appData.executables.find((x) => x.os === 'win32').name.replace('>', '');

            const fakeGame = {
                cmdLine: `C:\\Program Files\\${appData.name}\\${exeName}`,
                exePath: `c:/program files/${appData.name.toLowerCase()}/${exeName}`,
                executablesFinder: exeName,
                hidden: false,
                isLauncher: false,
                id: appId,
                name: appData.name,
                pid: publicId,
                pidPath: [publicId],
                processName: appData.name,
                start: Date.now(),
            };

            const originalGames = gamesMod.getRunningGames();
            const fakeGamesList = [fakeGame];

            const originalGetRunningGames = gamesMod.getRunningGames;
            const originalGetGameForPID = gamesMod.getGameForPID;

            gamesMod.getRunningGames = () => fakeGamesList;
            gamesMod.getGameForPID = (pid) => fakeGamesList.find((x) => x.pid === pid);

            flushMod.dispatch({
                type: 'RUNNING_GAMES_CHANGE',
                removed: originalGames,
                added: [fakeGame],
                games: fakeGamesList,
            });

            const heartbeatHandler = (data) => {
                const progress =
                    quest.config.configVersion === 1
                        ? data.userStatus.streamProgressSeconds
                        : Math.floor(data.userStatus.progress.PLAY_ON_DESKTOP.value);

                console.log(`Progress: ${progress}/${targetTime}`);

                if (progress >= targetTime) {
                    console.log('🎉 Task completed successfully!');

                    gamesMod.getRunningGames = originalGetRunningGames;
                    gamesMod.getGameForPID = originalGetGameForPID;

                    flushMod.dispatch({
                        type: 'RUNNING_GAMES_CHANGE',
                        removed: [fakeGame],
                        added: [],
                        games: [],
                    });

                    flushMod.unsubscribe('QUESTS_SEND_HEARTBEAT_SUCCESS', heartbeatHandler);
                }
            };

            flushMod.subscribe('QUESTS_SEND_HEARTBEAT_SUCCESS', heartbeatHandler);
            console.log(
                `Simulated game for ${appName}. Estimated time left: ${Math.ceil(
                    (targetTime - currentProgress) / 60
                )} minutes.`
            );
        });
    }
}
