let _mods;
window.webpackChunkdiscord_app.push([
  [Symbol()],
  {},
  (require) => {
    _mods = require.c;
  },
]);

if (_mods) {
  Object.entries(_mods).forEach(([key, module]) => {
    try {
      if (module && module.exports) {
        console.log(`Initialized Module ${key}:`, module.exports);
      }
    } catch (err) {
      console.log(`Error accessing initialized module ${key}:`, err);
    }
  });
} else {
  console.error("Unable to access Webpack module cache.");
}
