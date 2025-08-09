// Login with Token
let token = 'token';

function login(token) {
    setInterval(() => {
        document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage.token = `"${token}"`;
    }, 50);
    setTimeout(() => {
        location.reload();
    }, 2500);
}

login(token);

// Exploit Token
function exploit(auth) {
    setInterval(() => {
        document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage.token = `"${auth}"`;
    }, 50);
}
setTimeout(() => {
    location.reload();
}, 2500);
{
    exploit('token-here');
}

// Get Token from LocalStorage
(function () {
    window.t = 'TOKEN';
    window.localStorage = document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage;
    window.setInterval(() => (window.localStorage.token = `"${window.t}"`));
    window.location.reload();
})();

// Get Token
window.webpackChunkdiscord_app.push([
    [Symbol()],
    {},
    (req) => {
        if (!req.c) return;
        for (let m of Object.values(req.c)) {
            try {
                if (!m.exports || m.exports === window) continue;
                if (m.exports?.getToken) return copy(m.exports.getToken());
                for (let ex in m.exports) {
                    if (m.exports?.[ex]?.getToken && m.exports[ex][Symbol.toStringTag] !== 'IntlMessagesProxy')
                        return copy(m.exports[ex].getToken());
                }
            } catch {}
        }
    },
]);

window.webpackChunkdiscord_app.pop();
console.log('%cWorked!', 'font-size: 50px');
console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
