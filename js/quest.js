let wpRequire;
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  (req) => {
    wpRequire = req;
  },
]);
let ASS, RGS, QS, XS, FD, api;
if (
  window.GLOBAL_ENV.SENTRY_TAGS.buildId ===
  "366c746173a6ca0a801e9f4a4d7b6745e6de45d4"
) {
  ASS = Object.values(wpRequire.c).find((x) => x?.exports?.default?.getStreamerActiveStreamMetadata).exports.default;
  RGS = Object.values(wpRequire.c).find((x) => x?.exports?.default?.getRunningGames).exports.default;
  QS = Object.values(wpRequire.c).find((x) => x?.exports?.default?.getQuest).exports.default;
  XS = Object.values(wpRequire.c).find((x) => x?.exports?.default?.getGuildExperiments).exports.default;
  FD = Object.values(wpRequire.c).find(
    (x) => x?.exports?.default?.flushWaitQueue
  ).exports.default;
  api = Object.values(wpRequire.c).find((x) => x?.exports?.getAPIBaseURL)
    .exports.HTTP;
} else {
  ASS = Object.values(wpRequire.c).find((x) => x?.exports?.Z?.getStreamerActiveStreamMetadata).exports.Z;
  RGS = Object.values(wpRequire.c).find((x) => x?.exports?.ZP?.getRunningGames)
    .exports.ZP;
  QS = Object.values(wpRequire.c).find((x) => x?.exports?.Z?.getQuest).exports
    .Z;
  XS = Object.values(wpRequire.c).find(
    (x) => x?.exports?.Z?.getGuildExperiments
  ).exports.Z;
  FD = Object.values(wpRequire.c).find((x) => x?.exports?.Z?.flushWaitQueue)
    .exports.Z;
  api = Object.values(wpRequire.c).find((x) => x?.exports?.tn?.get).exports.tn;
}
const crr = 2;
const qnn = parseInt(crr * 623 + 34 + 6 + 22 + 5 + 2 + 3 + 1) + 7;
const kgg = parseInt(
  qnn * 5.5 - 3929 - 207 + 11 + 4398 - 754 - 6000 - 300 + 19 + 5 + 6409
);
const hee = parseInt(
  qnn * 4.3 + 982 + 2899 - 6441 + 39 + 6047 - 100 - 10 - 1612
);
const cr2 = parseInt(
  qnn * 7 + 392 - 2635 - 1142 - 4358 - 726 + 7571 - 1750 + 100 - 1 + 937
);
const qoo = "186";
let qt = [...QS.quests.values()].find(
  (x) =>
    x.id ==
      qnn.toString() +
        kgg.toString() +
        hee.toString() +
        cr2.toString() +
        qoo.toString() &&
    x.userStatus?.enrolledAt &&
    !x.userStatus?.completedAt &&
    new Date(x.config.expiresAt).getTime() > Date.now()
);
let ipp = true;
if (!ipp) {
  console.log("السكربت ما يشتغل على المتصفح ، لازم تشغله من التطبيق...");
} else if (!qt) {
  console.log("لازم تسوي Accept للكويست من User Settings -> Gift Inventory");
} else {
  const pid = Math.floor(Math.random() * 30000) + 1000;
  let aId, ane, snd, sndd, cpy;
  if (qt.config.configVersion === 1) {
    aId = qt.config.applicationId;
    ane = qt.config.applicationName;
    snd = qt.config.streamDurationRequirementMinutes * 60;
    sndd = qt.userStatus?.streamProgressSeconds ?? 0;
    cpy = qt.config.variants.includes(2);
  } else if (qt.config.configVersion === 2) {
    aId = qt.config.application.id;
    ane = qt.config.application.name;
    cpy =
      XS.getUserExperimentBucket("2024-04_quest_playtime_task") > 0 &&
      qt.config.taskConfig.tasks["PLAY_ON_DESKTOP"];
    const taskName = cpy ? "PLAY_ON_DESKTOP" : "STREAM_ON_DESKTOP";
    snd = qt.config.taskConfig.tasks[taskName].target;
    sndd = qt.userStatus?.progress?.[taskName]?.value ?? 0;
  }
  if (cpy) {
    api
      .get({ url: `/applications/public?application_ids=${aId}` })
      .then((res) => {
        const ada = res.body[0];
        const exe = ada.executables
          .find((x) => x.os === "win32")
          .name.replace(">", "");
        const gs = RGS.getRunningGames();
        const fge = {
          cmdLine: `C:\\Program Files\\${ada.name}\\${exe}`,
          exe,
          exePath: `c:/program files/${ada.name.toLowerCase()}/${exe}`,
          hidden: false,
          isLauncher: false,
          id: aId,
          name: ada.name,
          pid: pid,
          pidPath: [pid],
          processName: ada.name,
          start: Date.now(),
        };
        gs.push(fge);
        FD.dispatch({
          type: "RUNNING_GAMES_CHANGE",
          removed: [],
          added: [fge],
          games: gs,
        });
        let fn = (data) => {
          let pgs =
            qt.config.configVersion === 1
              ? data.userStatus.streamProgressSeconds
              : Math.floor(data.userStatus.progress.PLAY_ON_DESKTOP.value);
          console.log(`Quest progress: ${pgs}/${snd}`);
          if (pgs >= snd) {
            console.log("Quest completed!");
            const idx = gs.indexOf(fge);
            if (idx > -1) {
              gs.splice(idx, 1);
              FD.dispatch({
                type: "RUNNING_GAMES_CHANGE",
                removed: [fge],
                added: [],
                games: [],
              });
            }
            FD.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
          }
        };
        FD.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
        console.log(
          `تم تزييف لعبتك إلى ${ane}. انتظر لمده ${Math.ceil(
            (snd - sndd) / 60
          )} دقائق.`
        );
      });
  } else {
    let realFunc = ASS.getStreamerActiveStreamMetadata;
    ASS.getStreamerActiveStreamMetadata = () => ({
      id: aId,
      pid,
      sourceName: null,
    });
    let fn = (data) => {
      let pgs =
        qt.config.configVersion === 1
          ? data.userStatus.streamProgressSeconds
          : Math.floor(data.userStatus.progress.STREAM_ON_DESKTOP.value);
      console.log(`Quest progress: ${pgs}/${snd}`);
      if (pgs >= snd) {
        console.log("Quest completed!");
        ASS.getStreamerActiveStreamMetadata = realFunc;
        FD.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
      }
    };
    FD.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn);
    console.log(
      `تم تزييف لعبتك إلى ${ane}. انتظر لمده ${Math.ceil(
        (snd - sndd) / 60
      )} دقائق.`
    );
    console.log("تذكر يجب إن يكون هناك شخص واحد على الأقل داخل الفويس.");
  }
}
