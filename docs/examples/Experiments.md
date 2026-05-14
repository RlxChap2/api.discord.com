---
title: "Experiments"
description: "Modifies local experiment-related state and dispatches internal experiment-store handlers."
---

# Experiments

::: danger Risk: High
Modifies local experiment-related state and dispatches internal experiment-store handlers.
:::

## Overview

Study Flux dispatcher wiring and why local experiment flags are fragile.

## What The Code Does

- Captures the Webpack module cache.
- Finds the user store by `getUsers` and `getCurrentUser`.
- Walks the dispatcher dependency graph.
- Mutates the current user flags locally.
- Calls experiment-store action handlers and emits store changes.

## Main Dependencies

| Area | Details |
| --- | --- |
| Webpack runtime | `webpackChunkdiscord_app`. |
| User store | Default export with user lookup methods. |
| Dispatcher graph | `_dispatcher._actionHandlers._dependencyGraph.nodes`. |
| Experiment stores | Nodes named `DeveloperExperimentStore` and `ExperimentStore`. |

## Implementation Notes

- This is an internal state mutation, not an entitlement grant.
- Action handler names and payloads are private implementation details.

## Failure Modes

- Dispatcher internals may be renamed or hidden.
- Store names can change.
- Experiments may require server-side eligibility even if the UI appears locally.

## Safer Study Path

- Use this as a map for understanding dispatcher dependencies.
- Prefer read-only store inspection when documenting experiment architecture.

## Source

The source below is included from `docs/snippets/Experiments.js` so this page stays connected to the real snippet file.

<<< ../snippets/Experiments.js
