# BetterDiscord Workflow

If you are writing a BetterDiscord plugin, prefer BetterDiscord's maintained APIs over raw `webpackChunkdiscord_app` runtime access. The raw runtime is useful for understanding Webpack, but plugin code should lean on `BdApi.Webpack`, `BdApi.Patcher`, and lifecycle cleanup.

## Why Use `BdApi.Webpack`

BetterDiscord already exposes Discord modules through a safer plugin-facing layer. It also provides common filters so every plugin does not need to reinvent cache walking.

Common module categories include:

- React components.
- Flux stores.
- CSS class modules.
- Utility objects.
- Constants and enums.
- External libraries bundled into the client.

## Finding Modules

Use filters to describe the module you want:

```js
const { Webpack } = BdApi;

const candidate = Webpack.getModule(
  (exports) => exports?.displayName === "SomeComponentName",
  { searchExports: true }
);
```

For objects with stable keys:

```js
const module = BdApi.Webpack.getByKeys("open", "close");
```

For patching a function export, you often need both the object and the key that points to the function:

```js
const [owner, key] = BdApi.Webpack.getWithKey(
  (value) => typeof value === "function" && value.toString().includes("stable marker"),
  { searchExports: true }
);
```

Use generic markers in shared docs. Keep plugin-specific targets in your plugin repository where they can be reviewed and updated.

## Default Exports And Nested Exports

Discord's build pipeline often wraps values under short export keys. BetterDiscord commonly checks default exports for you, but patching sometimes requires the owner object and the exact export key. Be explicit about options such as `searchExports` and default-export behavior when a lookup is meant for patching.

## Plugin Hygiene

- Patch only in `start()` and always unpatch in `stop()`.
- Keep every unsubscribe, interval, observer, listener, and patch cleanup handle.
- Avoid hardcoded module IDs.
- Keep filters narrow and documented.
- Fail closed when a module cannot be found.
- Do not collect secrets or private content.
- Do not ship code that automates user accounts or evades platform controls.

## When Raw Runtime Inspection Still Helps

Raw runtime inspection is useful while learning or debugging why a BetterDiscord filter fails. Once you understand the module shape, move the plugin implementation back to `BdApi.Webpack`.

This keeps the plugin easier to maintain and makes the dangerous parts easier to audit.
