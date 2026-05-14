---
title: "Voice Filter Catalog Override"
description: "Replaces voice filter store getters with a custom catalog of hardcoded voice-filter records."
---

# Voice Filter Catalog Override

::: danger Risk: High
Replaces voice filter store getters with a custom catalog of hardcoded voice-filter records.
:::

## Overview

Study how store getters can be overridden and how catalog-shaped state is consumed by UI.

## What The Code Does

- Captures the Webpack module cache and defines a compact `findByProps` helper.
- Defines a large voice catalog object with names, icons, colors, previews, ids, and availability flags.
- Finds the voice filter store via `getVoiceFilters`.
- Builds a replacement store state object.
- Overrides getter methods such as `getVoiceFilters`, `getVoiceFilter`, and `getSortedVoiceFilters`.

## Main Dependencies

| Area | Details |
| --- | --- |
| Webpack runtime | `webpackChunkdiscord_app`. |
| Voice filter store | Export with `getVoiceFilters`. |
| External assets | Discord CDN emoji and soundboard URLs. |
| Store shape | Expected voice-filter catalog and model-state fields. |

## Implementation Notes

- The snippet references `u.L.DOWNLOADED` even though `u` is not defined in the file.
- It overrides getters but does not restore originals.
- External CDN assets may disappear or fail permissions checks.

## Failure Modes

- The store may change method names or state shape.
- `isModelDownloaded` can throw because `u` is undefined.
- The custom catalog may not match UI validation requirements.

## Safer Study Path

- Use it to understand store shape and getter contracts.
- Do not assume client-visible catalog entries mean server-side availability.

## Source

The source below is included from `docs/snippets/VoiceFilter.js` so this page stays connected to the real snippet file.

<<< ../snippets/VoiceFilter.js
