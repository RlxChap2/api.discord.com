let _mods;
webpackChunkdiscord_app.push([[Symbol()], {}, (r) => (_mods = r.c)]);
webpackChunkdiscord_app.pop();

// Utility to find a module by its properties
let findByProps = (...props) => {
    for (let m of Object.values(_mods)) {
        try {
            if (!m.exports || m.exports === window) continue;

            // Check top-level exports
            if (props.every((x) => m.exports?.[x])) {
                console.log('Module found (top-level):', m.exports);
                return m.exports;
            }

            // Check nested exports
            for (let ex in m.exports) {
                if (props.every((x) => m.exports?.[ex]?.[x])) {
                    console.log('Module found (nested):', m.exports[ex]);
                    return m.exports[ex];
                }
            }
        } catch (err) {
            console.warn('Error while checking module:', err);
        }
    }
};

// Log all Webpack modules
console.log('Logging all Webpack modules:');
for (let [id, module] of Object.entries(_mods)) {
    console.log(`Module ID: ${id}`, module.exports);
}
