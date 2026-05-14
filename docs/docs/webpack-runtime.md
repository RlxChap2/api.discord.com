# Webpack Runtime

Webpack bundles many source files into chunk files that the browser can load as needed. A chunk normally contains three things:

- A chunk identifier list.
- A module map, where each key is an internal module ID and each value is a module function.
- A runtime callback that receives Webpack's internal `require` function.

In Discord's web client, chunks are coordinated through `window.webpackChunkdiscord_app`. Researchers often use that runtime to understand how modules are loaded and cached.

## Runtime Callback

The runtime callback receives a `require` function. The useful read-only references are:

- `require.c`: the module cache for modules that have already executed.
- `require.m`: the known module factory map in some builds.
- `require(id)`: loads or returns exports for a specific module ID.

IDs are unstable, so prefer cache inspection and trait-based discovery over direct `require(id)` calls.

## Read-Only Cache Capture

This pattern captures a reference to the runtime for inspection. It should be used only in a controlled lab environment.

```js
function getWebpackRuntime() {
  let runtime;

  window.webpackChunkdiscord_app.push([
    [Symbol("research-runtime")],
    {},
    (requireFn) => {
      runtime = requireFn;
    },
  ]);

  window.webpackChunkdiscord_app.pop();
  return runtime;
}

const runtime = getWebpackRuntime();
const moduleCache = runtime?.c ?? {};
```

This does not add a real application module. It pushes an empty chunk with a callback, captures the runtime reference, then removes the temporary chunk entry.

::: danger Do not use this for secrets
Do not search for, print, copy, transmit, or store account tokens, passwords, payment data, MFA data, addresses, or private user content. Treat authentication-related modules as out of scope.
:::

## Cache Shape

A cached module record usually looks like this:

```js
{
  id: 12345,
  loaded: true,
  exports: {
    // objects, functions, stores, constants, or React components
  }
}
```

Some builds expose short property names such as `i` and `l` instead of `id` and `loaded`. The `exports` value can be a function, object, default export wrapper, namespace object, React component, or primitive.

## Lazy Loading

Modules do not appear just because they exist in the application. They appear after the relevant chunk loads and the module executes. To load a feature's code during research, navigate to the feature naturally in the UI, then inspect again.

Common triggers include:

- Opening a settings panel.
- Opening a modal or popout.
- Visiting a route.
- Hovering a tooltip-triggered control.
- Expanding an optional feature area.

## Practical Limits

- Minification changes names and source layout.
- Internal exports can be wrapped under default-export keys.
- Some properties throw when accessed, so discovery helpers need `try/catch`.
- Build updates can break filters that were stable yesterday.
- Desktop and web clients can be on different versions.

Use this runtime layer as a map, not as an API contract.
