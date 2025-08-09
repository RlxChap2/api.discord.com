let _finder = webpackChunkdiscord_app.push([[Symbol()], {}, (r) => r.c]);
webpackChunkdiscord_app.pop();

let findByType = (...props) => {
    for (let m of Object.values(_finder)) {
        try {
            if (!m.exports || m.exports === window) continue;
            if (props.every((x) => m.exports?.[x])) return m.exports;

            for (let ex in m.exports) {
                if (
                    props.every((x) => m.exports?.[ex]?.[x]) &&
                    m.exports[ex][Symbol.toStringTag] !== 'IntlMessagesProxy'
                )
                    return m.exports[ex];
            }
        } catch {}
    }
};

for (let mod of Object.values(_finder)) {
    try {
        const ex = mod.exports;
        if (!ex || ex === window) continue;

        const target = typeof ex.default === 'object' ? ex.default : ex;
        if (typeof target !== 'object') continue;

        const keys = Object.keys(target);
        if (keys.some((k) => k.includes('Deaf') || k.includes('Mute'))) {
            console.log('🔍 Found Module:', keys, target);
        }
    } catch {}
}
