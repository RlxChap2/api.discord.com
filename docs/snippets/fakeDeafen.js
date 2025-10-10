/**
 * @NOTE
 * Fake Deafen, you may get banned from Discord if you use it with malicious intent.
 */

let _mods = webpackChunkdiscord_app.push([[Symbol()], {}, (r) => r.c]);
webpackChunkdiscord_app.pop();

let findByProps = (...props) => {
    for (let m of Object.values(_mods)) {
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

let voice = findByProps('isSelfDeaf', 'isSelfMute');

if (!voice) {
    alert('Voice module not found');
} else {
    voice._originalDeaf = voice._originalDeaf || voice.isSelfDeaf;

    let btn = document.createElement('button');
    btn.textContent = '🎧 Fake Deafen';
    btn.style.position = 'fixed';
    btn.style.bottom = '20px';
    btn.style.right = '20px';
    btn.style.zIndex = '9999';
    btn.style.background = '#5865F2';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.padding = '10px 15px';
    btn.style.borderRadius = '8px';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = 'bold';
    btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    btn.style.transition = 'background 0.2s ease';
    btn.onmouseenter = () => (btn.style.background = '#4752C4');
    btn.onmouseleave = () => (btn.style.background = '#5865F2');

    let fake = false;
    btn.onclick = () => {
        fake = !fake;
        if (fake) {
            voice.isSelfDeaf = () => true;
            btn.textContent = '✅ Fake Deafen ON';
            btn.style.background = '#3BA55D';
        } else {
            voice.isSelfDeaf = voice._originalDeaf;
            btn.textContent = '❌ Fake Deafen OFF';
            btn.style.background = '#ED4245';
        }
    };

    document.body.appendChild(btn);
}
