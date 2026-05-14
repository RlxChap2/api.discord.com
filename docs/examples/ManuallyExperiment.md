---
title: "Manual Experiment Override"
description: "Writes a user experiment override object for a specific experiment code into an internal storage module."
---

# Manual Experiment Override

::: danger Risk: High
Writes a user experiment override object for a specific experiment code into an internal storage module.
:::

## Overview

Study how feature-gate override data can be represented in local client storage.

## What The Code Does

- Requires a global `findByProps` helper.
- Defines a hardcoded experiment code.
- Reads existing `userExperimentOverrides` through a module with `getAfterRefresh`.
- Adds or replaces one override record.
- Writes the updated override map back through the same storage module.

## Main Dependencies

| Area | Details |
| --- | --- |
| Discovery helper | `findByProps`. |
| Storage-like module | Export with `getAfterRefresh`, `get`, and `set` behavior. |
| Experiment code | Hardcoded string such as `2024-10_flamingo`. |

## Implementation Notes

- This is a local override and may not enable server-gated functionality.
- The object shape is private and can change at any time.

## Failure Modes

- The storage module may not match the expected API.
- The experiment code may no longer exist.
- Server-side eligibility can override local presentation.

## Safer Study Path

- Use this to document local override shape, not to force production features.
- Keep experiment research on disposable accounts.

## Source

The source below is included from `docs/snippets/ManuallyExperiment.js` so this page stays connected to the real snippet file.

<<< ../snippets/ManuallyExperiment.js
