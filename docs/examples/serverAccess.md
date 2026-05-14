---
title: "Server Access Override"
description: "Overrides permission-store methods to return broad access and rewrites guild owner ids locally."
---

# Server Access Override

::: danger Risk: Critical
Overrides permission-store methods to return broad access and rewrites guild owner ids locally.
:::

## Overview

Study why client-side permission display must never be treated as server authorization.

## What The Code Does

- Resolves a `findByProps` helper or compatible Vencord helper.
- Finds permission, user, and guild stores.
- Builds a true-valued permission-props object from store output.
- Patches permission methods on the store prototype to return broad access.
- Adds a guild listener that rewrites guild owner ids to the current user id.
- Emits store changes to force UI updates.

## Main Dependencies

| Area | Details |
| --- | --- |
| Discovery helper | `findByProps` or compatible Vencord helper. |
| Permission store | Exports with permission computation and `can*` methods. |
| User store | Current-user accessor. |
| Guild store | Guild list and change listener methods. |

## Implementation Notes

- This is local UI tampering and does not grant server-side permissions.
- It can cause misleading UI and broken client behavior.
- It does not keep cleanup references for the listener or prototype patches.

## Failure Modes

- Permission methods may move, use symbols, or become non-writable.
- BigInt permission return values may not match future expectations.
- The listener can continue mutating state until the page reloads.

## Safer Study Path

- Use it as a cautionary example for client/server trust boundaries.
- Verify real permissions only through server-authoritative APIs and UI flows.

## Source

The source below is included from `docs/snippets/serverAccess.js` so this page stays connected to the real snippet file.

<<< ../snippets/serverAccess.js
