const step = 2;
/**
 * @description
 * Constructs the full Discord Quest ID by combining multiple fragments.
 * Each part represents a slice of the full ID to hide or obfuscate the final value.
 *
 * Example:
 *   https://discord.com/quests/1391877646987821198
 *                                |    |    |    |   |
 *                                |    |    |    |   └── frag  = '198'
 *                                |    |    |    └───── bin2  = '7821'
 *                                |    |    └────────── bin1  = '4698'
 *                                |    └─────────────── hash2 = 8776
 *                                └──────────────────── hash1 = 1391
 *
 * Final ID = hash1 + hash2 + bin1 + bin2 + frag
 *          = "1234567812345678910"
 *
 * @version 1.0.0
 * @date 2025-07-18
 */

const hash1 = 1234,
    hash2 = 5678;
const bin1 = '1234',
    bin2 = '5678';
const frag = '910';
const questId = `${hash1}${hash2}${bin1}${bin2}${frag}`;

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

const quest = [...questsMod.quests.values()].find((x) => x.id === questId);
const isDesktopApp = typeof DiscordNative !== 'undefined';

if (!quest) {
    console.log('No active tasks found or the task timer has expired.');
}

const publicId = Math.floor(Math.random() * 30000) + 1000;
const appId = quest.config.application.id;
const appName = quest.config.application.name;
const taskType = 'WATCH_VIDEO';
const targetTime = quest.config.taskConfigV2.tasks[taskType].target;

const currentProgress = quest.userStatus?.progress?.[taskType]?.value ?? 0;

if (!isDesktopApp) {
    console.log('This task only works in the Discord desktop app. Please run the code there.');
}

flushMod.get({ url: `/applications/public?application_ids=${appId}` }).then((res) => {
    const appData = res.body[0];
    const exeName = appData.executables.find((x) => x.os === 'win32').name.replace('>', '');

    const fakeGame = {
        cmdLine: `C:\\Program Files\\${appData.name}\\${exeName}`,
        exePath: `c:/program files/${appData.name.toLowerCase()}/${exeName}`,
        executablesFinder: exeName,
        hidden: false,
        isLauncher: false,
        id: aId,
        name: appData.name,
        pid: pid,
        pidPath: [pid],
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
            console.log('Task completed successfully!');

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
        `Simulated game for ${appName}. Estimated time left: ${Math.ceil((targetTime - currentProgress) / 60)} minutes.`
    );
});
