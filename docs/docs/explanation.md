# Architecture Overview

Discord's web client is a large single-page application. The desktop client wraps much of that same web application in Electron, so many research workflows apply to both environments. The important pieces are the shell, the UI framework, the data model, and the bundler runtime.

## Core Pieces

**Electron shell**  
The desktop app uses web technologies inside a native wrapper. That makes the client inspectable with Chromium DevTools, but it also means local application files and injected JavaScript deserve extra security attention.

**React UI**  
Discord's interface is composed of React components. Component props, rendered trees, and event handlers are often useful entry points when trying to understand a feature.

**Flux-style stores**  
State is organized around stores and dispatcher patterns. Stores usually expose methods that read cached local state, while actions and dispatchers coordinate changes.

**Webpack runtime**  
Webpack turns source modules into chunk files, assigns internal module IDs, and maintains a module cache at runtime. Discord's runtime is exposed through a global chunk array named `webpackChunkdiscord_app`.

## Why IDs Are Fragile

Webpack module IDs are build artifacts. They can change whenever Discord deploys a new client build, when a chunk is split differently, or when code is minified and transformed. A stable workflow does not depend on IDs. It depends on traits:

- Exported property names that are specific enough to identify a module.
- Display names or store names that survive minification.
- Strings that appear in a function body or component.
- React props, event handlers, and breakpoints that reveal which module produced a UI behavior.

## What Loaded Means

The module cache only contains modules that have executed. If a feature is lazy loaded, it may not appear until the user opens the relevant settings panel, popout, route, or modal. A failed lookup can mean "wrong filter", but it can also mean "the chunk has not loaded yet".

## Research Flow

1. Start from a visible feature or behavior.
2. Use DevTools to inspect DOM nodes, React props, network requests, and formatted source.
3. Identify stable search traits such as keys, store names, strings, or component names.
4. Search the runtime or `BdApi.Webpack` using those traits.
5. Validate the result by reading values, not by mutating app state.
6. Record the client build, filters used, and what caused the module to load.

::: warning Keep research read-only
The safest workflow is observation. Avoid invoking write methods, patching production state, automating user accounts, or touching authentication and payment surfaces.
:::

## Next Pages

- [Webpack Runtime](/docs/webpack-runtime) for chunk and cache mechanics.
- [Module Discovery](/docs/module-discovery) for search patterns.
- [React and Flux](/docs/react-flux) for UI-driven reverse engineering.
