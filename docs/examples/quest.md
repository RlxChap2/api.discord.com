---
title: "Quest Automation"
description: "Automates or spoofs several Discord quest task types through internal stores, dispatchers, and REST calls."
---

# Quest Automation

::: danger Risk: Critical
Automates or spoofs several Discord quest task types through internal stores, dispatchers, and REST calls.
:::

## Overview

Treat as a security and anti-abuse case study, not as an operational guide.

## What The Code Does

- Captures the Webpack runtime and module cache.
- Finds quest, stream, running-game, channel, dispatcher, and REST modules across multiple export shapes.
- Filters active enrolled quests with supported task types.
- Branches by task type and simulates video, game, stream, or activity progress.
- Subscribes to internal quest heartbeat events and restores some patched methods after completion.

## Main Dependencies

| Area | Details |
| --- | --- |
| Webpack runtime | `webpackChunkdiscord_app` and `require.c`. |
| Quest store | Export with quest lookup state. |
| Game process store | Running game getters and PID lookup. |
| Stream store | Streamer metadata getter. |
| Dispatcher | Subscription and dispatch methods for quest progress events. |
| REST API module | Internal `get` and `post` request helpers. |

## Implementation Notes

- This snippet has real side effects and interacts with Discord quest endpoints.
- It spoofs local game or stream state for certain branches.
- It includes restore logic for some patches, but failures can still leave modified runtime state.
- It should be documented as an anti-pattern and abuse-risk example.

## Failure Modes

- Export keys differ between client builds, which is why the snippet has two lookup branches.
- Quest payload shapes differ by config version.
- Browser clients cannot satisfy some desktop-only branches.
- Heartbeat timing, eligibility, or endpoint behavior can change server-side.

## Safer Study Path

- Use the page to understand how many internal systems a high-risk automation snippet touches.
- Do not run this on real accounts or production Discord clients.

## Source

The source below is included from `docs/snippets/Quest.js` so this page stays connected to the real snippet file.

<<< ../snippets/Quest.js
