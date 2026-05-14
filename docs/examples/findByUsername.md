---
title: "Find By Username"
description: "Builds a local `findByProps` helper and searches the loaded user cache for a username."
---

# Find By Username

::: tip Risk: Low
Builds a local `findByProps` helper and searches the loaded user cache for a username.
:::

## Overview

Study cache inspection and property-based module lookup with a relatively contained example.

## What The Code Does

- Captures the Webpack module cache.
- Defines a `findByProps` helper that checks root and nested exports.
- Finds a module exposing `getUsers`.
- Filters cached users by exact username equality.
- Logs the first matching cached user object.

## Main Dependencies

| Area | Details |
| --- | --- |
| Webpack runtime | `webpackChunkdiscord_app`. |
| User cache | Export with `getUsers`. |
| Loaded data | Only users already loaded in the client cache can be found. |

## Implementation Notes

- This reads local cache state; it does not query all Discord users.
- Exact username matching can collide or fail depending on Discord naming changes.

## Failure Modes

- The target user may not be in cache.
- `getUsers` can move or become wrapped.
- The helper may return the wrong module if a broader match appears first.

## Safer Study Path

- Use this snippet as the baseline example for read-only module discovery.
- Avoid logging private user data when documenting results.

## Source

The source below is included from `docs/snippets/findByUsername.js` so this page stays connected to the real snippet file.

<<< ../snippets/findByUsername.js
