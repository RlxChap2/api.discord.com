let _mods = webpackChunkdiscord_app.push([
  [Symbol()],
  {},
  ({ c }) => Object.values(c),
]);
webpackChunkdiscord_app.pop();

const findByProps = (...props) => {
  for (let m of _mods) {
    try {
      if (!m.exports || m.exports === window) continue;
      if (props.every((x) => m.exports?.[x])) return m.exports;

      for (let ex in m.exports) {
        if (props.every((x) => m.exports?.[ex]?.[x])) return m.exports[ex];
      }
    } catch {}
  }
};
async function findUserByUsername(username) {
  return await Object.values(findByProps("getUsers").getUsers()).filter(
    (u) => u.username == username
  )[0];
}


async function main() {
  let { id } = findUserByUsername("ahmed.dev");
  findByProps("_dispatch").addInterceptor((e) => {
    if (e.type === "CURRENT_USER_UPDATE" || e.type === "CONNECTION_OPEN") {
      e.user = Object.assign(findByProps("getUserStoreVersion").getUser(id), {
        verified: true,
      });
    }
  });
  findByProps("_dispatch").dispatch({
    type: "CURRENT_USER_UPDATE",
  });
}
main();
