# Discord Client Deep Explanation

In this section, we’ll explore in detail how Discord’s client system works — focusing on how it uses **Webpack**, what the global `webpackChunkdiscord_app` variable represents, and how developers can analyze or extract modules ethically for research purposes.

## 🧠 What is Webpack?

::: info
**Webpack** is a JavaScript module bundler.  
It takes multiple source files and bundles them into optimized "chunks" that browsers can execute efficiently.
:::

It transforms code like this:

**Input**

```js
import utils from './utils.js';
console.log(utils.version);
```

**Output (Bundled)**

```js
(() => {
    var e = {
        42: (e, o) => {
            o.version = '1.0.0';
        },
    };
    var t = {};
    function r(o) {
        var n = t[o];
        if (n !== undefined) return n.exports;
        var s = (t[o] = { exports: {} });
        e[o](s, s.exports, r);
        return s.exports;
    }
    console.log(r(42).version);
})();
```

::: tip
Webpack replaces your modular code with an internal registry of numeric IDs and dynamically loads modules when needed.
:::

## ⚙️ How Discord Uses Webpack

Discord’s web and desktop apps are single-page applications (SPA) bundled with Webpack.
The internal runtime manages thousands of modules — React components, Flux stores, and services — all cached inside Webpack’s module registry.

**When you open Discord in your browser**, you’re loading these modules dynamically via Webpack’s async chunk system.

::: info
The runtime exposes an array-like global variable named **`webpackChunkdiscord_app`**.
This array is how Webpack registers dynamically loaded chunks at runtime.
:::

## 🔍 What Is `webpackChunkdiscord_app`

When Discord loads new parts of the UI, Webpack “pushes” new chunks to this global array.
Each push call contains a list of modules and a runtime callback.

Here’s the simplified mechanism:

```js{3-5}
let _mods;
webpackChunkdiscord_app.push([
  [Symbol()], // Fake chunk ID
  {},         // Empty module map
  (r) => (_mods = r.c) // Capture the module cache
]);
webpackChunkdiscord_app.pop();
```

::: tip
`r.c` is the internal **module cache** — a collection of all active Webpack modules running inside Discord’s client.
:::

## 🧩 Understanding the Module Registry

Each module inside `_mods` looks roughly like this:

```js
{
  12345: {
    id: 12345,
    loaded: true,
    exports: { getUser: [Function], getCurrentUser: [Function] },
    factory: ƒ(...)
  }
}
```

You can iterate and inspect exports to identify modules of interest.

## 🧠 Finding Modules by Property (findByProps)

**Example Utility:**

```js{1,6}
function findByProps(...props) {
  for (const m of Object.values(_mods)) {
    const exp = m?.exports;
    if (!exp) continue;
    if (props.every((p) => p in exp)) return exp;
  }
  return null;
}
```

::: details
This is the full code of `findByProps`

```js
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
```

:::

**Usage Example:**

```js{1,2,3}
const MessageStore = findByProps("getMessage", "getMessages");
const UserStore = findByProps("getCurrentUser", "getUser");
console.log(UserStore.getCurrentUser());
```

::: info
This function scans all module exports and returns the first module containing all the given properties.
:::

## 🧱 Real Example — Capturing and Inspecting Modules

```js{1,2,7,12}
let _mods;
webpackChunkdiscord_app.push([
  [Symbol()], {}, (r) => (_mods = r.c)
]);
webpackChunkdiscord_app.pop();

// Search for modules
const UserStore = findByProps("getCurrentUser", "getUser");
const CurrentUser = UserStore.getCurrentUser();
console.log(CurrentUser);
```

::: warning
⚠️ **Important:**
This approach is for research and educational analysis only.
Never inject or modify the official Discord client — that violates Discord’s Terms of Service.
:::

## 🔒 Ethics & Limitations

::: tip

-   Internal module names and structures **change frequently**.
-   Avoid depending on numeric module IDs.
-   Use property-based searches (like `findByProps`) for better stability.
-   Never distribute modified client code.
    :::

## 📘 Next Steps

-   Explore real examples in the **[Examples →](/examples/examples-hub.md)** section.
