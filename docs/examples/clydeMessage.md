---
title: "Clyde Message"
description: "Finds a local bot-message helper and asks it to render a short message in the current channel context."
---

# Clyde Message

::: warning Risk: Medium
Finds a local bot-message helper and asks it to render a short message in the current channel context.
:::

## Overview

Study how client helpers can render local system-style messages.

## What The Code Does

- Requires a global `findByProps` helper.
- Searches for an export with `sendBotMessage`.
- Derives a channel id from `window.location.pathname`.
- Calls the helper with a fixed message string.

## Main Dependencies

| Area | Details |
| --- | --- |
| Discovery helper | `findByProps` from the project data helpers. |
| Message helper | An export containing `sendBotMessage`. |
| Route format | The current URL path must contain a channel id in the expected position. |

## Implementation Notes

- This should be treated as a local rendering experiment, not a messaging API.
- The channel extraction is brittle because it slices the URL by fixed offsets.

## Failure Modes

- `sendBotMessage` may be renamed, wrapped, or unavailable.
- The current route may not be a channel route.
- The helper can change behavior between client builds.

## Safer Study Path

- Inspect the helper shape and function location without calling it.
- Use official bot APIs for any real bot messaging workflow.

## Source

The source below is included from `docs/snippets/clydeMessage.js` so this page stays connected to the real snippet file.

<<< ../snippets/clydeMessage.js
