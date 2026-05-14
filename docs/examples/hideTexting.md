---
title: "Hide Typing"
description: "Replaces the loaded `startTyping` function with a no-op function."
---

# Hide Typing

::: warning Risk: Medium
Replaces the loaded `startTyping` function with a no-op function.
:::

## Overview

Study how simple monkey patches can disable client-side behavior.

## What The Code Does

- Requires a global `findByProps` helper.
- Finds an export containing `startTyping`.
- Assigns `startTyping` to an empty function.

## Main Dependencies

| Area | Details |
| --- | --- |
| Discovery helper | `findByProps`. |
| Typing module | Export with `startTyping`. |

## Implementation Notes

- The snippet does not preserve the original function, so it cannot restore cleanly.
- It mutates an internal module directly.

## Failure Modes

- The method can be renamed or split.
- Other code may hold references to the original function.
- The client may reinitialize the module and undo the patch.

## Safer Study Path

- Compare this with patching patterns that keep cleanup handles.
- Prefer plugin patchers that automatically unpatch on stop.

## Source

The source below is included from `docs/snippets/hideTexting.js` so this page stays connected to the real snippet file.

<<< ../snippets/hideTexting.js
