---
title: "Official-Looking User Flags"
description: "Mutates local current-user fields such as bot, flags, system, and Clyde-like behavior."
---

# Official-Looking User Flags

::: danger Risk: High
Mutates local current-user fields such as bot, flags, system, and Clyde-like behavior.
:::

## Overview

Study the difference between local user-object presentation and authoritative account state.

## What The Code Does

- Requires a global `findByProps` helper.
- Finds the current-user store repeatedly.
- Sets `bot` to `true`.
- Sets a numeric flags value.
- Sets `system` to `true`.
- Overrides `isClyde` to return `true`.

## Main Dependencies

| Area | Details |
| --- | --- |
| Discovery helper | `findByProps`. |
| User store | Export with `getCurrentUser`. |
| Mutable user object | The current user object must be writable. |

## Implementation Notes

- This does not make an account official, verified, system, or Clyde.
- It mutates local presentation state and can mislead screenshots or local UI.

## Failure Modes

- The current user object may be cloned or frozen.
- Flags can be recalculated by the store.
- UI components may read different sources for badges and labels.

## Safer Study Path

- Use as an example of why client state is not authority.
- Inspect object descriptors before mutating anything.

## Source

The source below is included from `docs/snippets/official.js` so this page stays connected to the real snippet file.

<<< ../snippets/official.js
