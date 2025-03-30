delete window.$;
let wpRequire;
window.webpackChunkdiscord_app.push([
    [Math.random()],
    {},
    (req) => {
        wpRequire = req;
    },
]);
let ASS = Object.values(wpRequire.c).find(
    (x) => x?.exports?.Z?.__proto__?.getStreamerActiveStreamMetadata
).exports.Z;
let RGS = Object.values(wpRequire.c).find(
    (x) => x?.exports?.ZP?.getRunningGames
).exports.ZP;
let QS = Object.values(wpRequire.c).find(
    (x) => x?.exports?.Z?.__proto__?.getQuest
).exports.Z;
let CS = Object.values(wpRequire.c).find(
    (x) => x?.exports?.Z?.__proto__?.getAllThreadsForParent
).exports.Z;
let GCS = Object.values(wpRequire.c).find(
    (x) => x?.exports?.ZP?.getSFWDefaultChannel
).exports.ZP;
let FD = Object.values(wpRequire.c).find(
    (x) => x?.exports?.Z?.__proto__?.flushWaitQueue
).exports.Z;
let a = Object.values(wpRequire.c).find((x) => x?.exports?.tn?.get).exports.tn;
const crr = 2;
const qnn = 1346;
const kgg = 1826;
const hee = 5322;
const cr2 = '0753';
const qoo = '550';
const lol =
    qnn.toString() +
    kgg.toString() +
    hee.toString() +
    cr2.toString() +
    qoo.toString();
let q = [...QS.quests.values()].find(
    (x) =>
        x.id !== '1248385850622869556' &&
        x.id == lol &&
        x.userStatus?.enrolledAt &&
        !x.userStatus?.completedAt &&
        new Date(x.config.expiresAt).getTime() > Date.now()
);
let iA = navigator.userAgent.includes('Electron/');
if (!q) {
    console.log('ماعندك اي كويستات ما مخلصه يا مدير');
} else {
    const pid = Math.floor(Math.random() * 30000) + 1000;
    const aaD = q.config.application.id;
    const aaN = q.config.application.name;
    const tN = [
        'WATCH_VIDEO',
        'PLAY_ON_DESKTOP',
        'STREAM_ON_DESKTOP',
        'PLAY_ACTIVITY',
    ].find((x) => q.config.taskConfig.tasks[x] != null);
    const sN = q.config.taskConfig.tasks[tN].target;
    const sD = q.userStatus?.progress?.[tN]?.value ?? 0;
    if (tN === 'WATCH_VIDEO') {
        const te = 2,
            s = 10;
        const diff = Math.floor(
            (Date.now() - new Date(q.userStatus.enrolledAt).getTime()) / 1000
        );
        const sP = Math.min(Math.max(Math.ceil(sD), diff), sN);
        let fn = async () => {
            for (let i = sP; i <= sN; i += s) {
                try {
                    await a.post({
                        url: `/quests/${q.id}/video-progress`,
                        body: { timestamp: Math.min(sN, i + Math.random()) },
                    });
                } catch (ex) {
                    console.log('مدير ما اقدر اتنفس', i, ex.message);
                }
                await new Promise((resolve) => setTimeout(resolve, te * 1000));
            }
            if ((sN - sD) % s !== 0) {
                await a.post({
                    url: `/quests/${q.id}/video-progress`,
                    body: { timestamp: sN },
                });
            }
            console.log('مدير مهمه خلصت انت روح روح');
        };
        fn();
        console.log(
            `مدير انا شغال مهمه ال ${aaN}. انتظر ${Math.ceil(
                ((sN - sP) / s) * te
            )} ثواني.`
        );
    } else if (tN === 'PLAY_ON_DESKTOP') {
        if (!iA) {
            console.log(
                'مدير هذا كود نفر مو شغال على متصفح انتا، شغل كود هذا على التطبيق عشان يخلص',
                aaN,
                'كويست!'
            );
        }
        a.get({ url: `/applications/public?application_ids=${aaD}` }).then(
            (res) => {
                const appData = res.body[0];
                const exeName = appData.executables
                    .find((x) => x.os === 'win32')
                    .name.replace('>', '');
                const games = RGS.getRunningGames();
                const fakeGame = {
                    cmdLine: `C:\\Program Files\\${appData.name}\\${exeName}`,
                    exeName,
                    exePath: `c:/program files/${appData.name.toLowerCase()}/${exeName}`,
                    hidden: false,
                    isLauncher: false,
                    id: aaD,
                    name: appData.name,
                    pid: pid,
                    pidPath: [pid],
                    processName: appData.name,
                    start: Date.now(),
                };
                games.push(fakeGame);
                FD.dispatch({
                    type: 'RUNNING_GAMES_CHANGE',
                    removed: [],
                    added: [fakeGame],
                    games: games,
                });
                let fn = (data) => {
                    let progress =
                        q.config.configVersion === 1
                            ? data.userStatus.streamProgressSeconds
                            : Math.floor(
                                  data.userStatus.progress.PLAY_ON_DESKTOP.value
                              );
                    console.log(`باقي على المهمه: ${progress}/${sN}`);
                    if (progress >= sN) {
                        console.log('مدير مهمه خلصت!');
                        const idx = games.indexOf(fakeGame);
                        if (idx > -1) {
                            games.splice(idx, 1);
                            FD.dispatch({
                                type: 'RUNNING_GAMES_CHANGE',
                                removed: [fakeGame],
                                added: [],
                                games: [],
                            });
                        }
                        FD.unsubscribe('QUESTS_SEND_HEARTBEAT_SUCCESS', fn);
                    }
                };
                FD.subscribe('QUESTS_SEND_HEARTBEAT_SUCCESS', fn);
                console.log(
                    `مدير انا شغال مهمه على ${aaN}. انتظر ${Math.ceil(
                        (sN - sD) / 60
                    )}دقايق .`
                );
            }
        );
    } else if (tN === 'STREAM_ON_DESKTOP') {
        if (!iA) {
            console.log(
                'مدير هذا كود نفر مو شغال على متصفح تريد تشغيل مهمه ال',
                aaN,
                'شغلها على التطبيق!'
            );
        }
        let realFunc = ASS.getStreamerActiveStreamMetadata;
        ASS.getStreamerActiveStreamMetadata = () => ({
            id: aaD,
            pid,
            sourceName: null,
        });
        let fn = (data) => {
            let progress =
                q.config.configVersion === 1
                    ? data.userStatus.streamProgressSeconds
                    : Math.floor(
                          data.userStatus.progress.STREAM_ON_DESKTOP.value
                      );
            console.log(`باقي على المهمه: ${progress}/${sN}`);
            if (progress >= sN) {
                console.log('مدير مهمه خلصت!');
                ASS.getStreamerActiveStreamMetadata = realFunc;
                FD.unsubscribe('QUESTS_SEND_HEARTBEAT_SUCCESS', fn);
            }
        };
        FD.subscribe('QUESTS_SEND_HEARTBEAT_SUCCESS', fn);
        console.log(
            `شغالين مهمه على ال ${aaN}.شغل ستريم على اي روم لمده  ${Math.ceil(
                (sN - sD) / 60
            )} دقيقه.`
        );
        console.log('تذكر لازم يكون فيه اي شخص بالروم يتابع معك');
    } else if (tN === 'PLAY_ACTIVITY') {
        const channelId =
            CS.getSortedPrivateChannels()[0]?.id ??
            Object.values(GCS.getAllGuilds()).find(
                (x) => x != null && x.VOCAL.length > 0
            ).VOCAL[0].channel.id;
        const streamKey = `call:${channelId}:1`;
        let fn = async () => {
            console.log(
                'قاعدين نخلص مهمه',
                aaN,
                '-',
                q.config.messages.questName
            );
            while (true) {
                const res = await a.post({
                    url: `/quests/${q.id}/heartbeat`,
                    body: { stream_key: streamKey, terminal: false },
                });
                const progress = res.body.progress.PLAY_ACTIVITY.value;
                console.log(`باقي على المهمه: ${progress}/${sN}`);
                await new Promise((resolve) => setTimeout(resolve, 20 * 1000));
                if (progress >= sN) {
                    await a.post({
                        url: `/quests/${q.id}/heartbeat`,
                        body: { stream_key: streamKey, terminal: true },
                    });
                    break;
                }
            }
            console.log('مدير المهمه خلصت مبروك!');
        };
        fn();
    }
}
