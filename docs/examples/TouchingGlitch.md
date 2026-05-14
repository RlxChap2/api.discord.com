---
title: "Touching Glitch"
description: "Automates repeated DOM clicks against several hardcoded selectors for a game-like activity."
---

# Touching Glitch

::: danger Risk: High
Automates repeated DOM clicks against several hardcoded selectors for a game-like activity.
:::

## Overview

Study brittle DOM automation and why selector-specific click loops can break apps.

## What The Code Does

- Defines older single-target helper functions for specific selectors.
- Defines a reusable `sleep` helper.
- Builds a selector list for buttons and activity elements.
- Clicks each matched element many times per cycle.
- Recursively schedules itself to continue clicking.

## Main Dependencies

| Area | Details |
| --- | --- |
| DOM selectors | Hardcoded class names such as `.claimButton__8e695`. |
| Timer APIs | `setTimeout` and promise-based sleep. |
| Click behavior | Elements must respond to `.click()`. |

## Implementation Notes

- Several class names are build-generated and likely to change.
- The script contains duplicated `autoClick` function names.
- A commented selector warns that one target can crash the app.

## Failure Modes

- Selectors can become stale immediately after a client update.
- Recursive scheduling can continue indefinitely.
- Aggressive click loops can freeze the UI or trigger abuse controls.

## Safer Study Path

- Use this to document why DOM automation should have stop controls and rate limits.
- Avoid running click automation on live services.

## Source

The source below is included from `docs/snippets/TouchingGlitch.js` so this page stays connected to the real snippet file.

<<< ../snippets/TouchingGlitch.js
