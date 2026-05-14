---
title: "Create Friend Link"
description: "Calls an internal friend-invite creator and copies the resulting invite URL."
---

# Create Friend Link

::: danger Risk: High
Calls an internal friend-invite creator and copies the resulting invite URL.
:::

## Overview

Understand why account-affecting client internals should not be used as public APIs.

## What The Code Does

- Requires a global `findByProps` helper.
- Searches for an export with `createFriendInvite`.
- Awaits the internal invite creation call.
- Copies a constructed `discord.gg` URL to the clipboard.
- Logs success messages to the console.

## Main Dependencies

| Area | Details |
| --- | --- |
| Discovery helper | `findByProps`. |
| Invite module | Export with `createFriendInvite`. |
| Clipboard helper | A global `copy` function from DevTools or browser context. |

## Implementation Notes

- This creates account-facing state and may perform a network request.
- The snippet assumes the returned object contains a `code` property.

## Failure Modes

- Clipboard access may fail outside DevTools.
- The invite helper may require extra context or validation.
- Rate limits and account restrictions can apply.

## Safer Study Path

- Inspect the module metadata without invoking invite creation.
- Use official, documented workflows for invite management.

## Source

The source below is included from `docs/snippets/createFriendLink.js` so this page stays connected to the real snippet file.

<<< ../snippets/createFriendLink.js
