let _mods;
webpackChunkdiscord_app.push([[Symbol()], {}, (r) => (_mods = r.c)]);
webpackChunkdiscord_app.pop();

let findByProps = (...props) => {
  for (let m of Object.values(_mods)) {
    try {
      if (!m.exports || m.exports === window) continue;
      if (props.every((x) => m.exports?.[x])) return m.exports;

      for (let ex in m.exports) {
        if (props.every((x) => m.exports?.[ex]?.[x])) return m.exports[ex];
      }
    } catch {}
  }
};