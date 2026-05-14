---
title: "Fake Deafen"
description: "Adds a floating button that toggles a monkey patch over the local `isSelfDeaf` voice-state getter."
---

# Fake Deafen

::: danger Risk: High
Adds a floating button that toggles a monkey patch over the local `isSelfDeaf` voice-state getter.
:::

## Overview

Study runtime monkey patching and UI injection risks in a voice-state module.

## What The Code Does

- Resolves or recreates a `findByProps` helper.
- Finds a voice module with `isSelfDeaf` and `isSelfMute`.
- Stores the original `isSelfDeaf` function.
- Creates a fixed-position button in the document body.
- Toggles `isSelfDeaf` between the original function and a function that returns `true`.

## Main Dependencies

| Area | Details |
| --- | --- |
| Discovery helper | `findByProps` or compatible Vencord helper. |
| Voice module | Export with `isSelfDeaf` and `isSelfMute`. |
| DOM access | Creates and appends a button directly. |

## Implementation Notes

- This changes local client behavior and can misrepresent state.
- The visible button styling is injected manually and is not integrated with React.
- The source contains mojibake characters in button labels from earlier encoding issues.

## Failure Modes

- The voice module may not be found.
- Another patch may overwrite the same method.
- Discord updates can move voice-state methods or make them non-writable.

## Safer Study Path

- Inspect how the snippet stores and restores an original function.
- Use it as a cautionary example for why plugin cleanup matters.

## Source

The source below is included from `docs/snippets/fakeDeafen.js` so this page stays connected to the real snippet file.

<<< ../snippets/fakeDeafen.js
