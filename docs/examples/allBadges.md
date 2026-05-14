---
title: "All Badges"
description: "Locally replaces the current user profile badge list with a hardcoded badge catalog."
---

# All Badges

::: danger Risk: High
Locally replaces the current user profile badge list with a hardcoded badge catalog.
:::

## Overview

Study how a loaded profile store can expose mutable client-side presentation data.

## What The Code Does

- Captures the Webpack module cache through the Discord chunk runtime.
- Finds modules that expose current-user and user-profile accessors.
- Reads the current user id and retrieves the cached profile object.
- Replaces the profile badge array with hardcoded badge records.
- Affects local presentation only; it does not grant real Discord badges.

## Main Dependencies

| Area | Details |
| --- | --- |
| Webpack runtime | `webpackChunkdiscord_app` and the module cache. |
| User store | Export with `getCurrentUser`. |
| Profile store | Export with `getUserProfile`. |
| Badge records | Hardcoded ids, descriptions, icon hashes, and links. |

## Implementation Notes

- The snippet mutates a cached profile object directly instead of using a public API.
- The badge list is display data, not server authority.
- Icon hashes and badge ids can become outdated when Discord changes assets.

## Failure Modes

- The expected exports may move from `Z` to another key.
- The profile may not be loaded before the snippet runs.
- Discord may freeze, clone, or validate profile data differently in later builds.

## Safer Study Path

- Compare this with a read-only profile-store inspection that logs available keys.
- Use it to understand why client display state cannot be trusted as proof of account status.

## Source

The source below is included from `docs/snippets/allBadges.js` so this page stays connected to the real snippet file.

<<< ../snippets/allBadges.js
