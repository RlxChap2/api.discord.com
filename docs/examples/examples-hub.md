---
title: Snippet Reference
description: Modern reference pages for the repository snippets, with behavior notes, dependencies, failure modes, and safety context.
---

<script setup>
import { data as snippets } from './snippets.data.js'
</script>

# Snippet Reference

::: danger Review before running
These snippets inspect or mutate private Discord client internals. Several perform account-facing actions, automate UI, or override permission and quest state. Treat them as research artifacts and anti-pattern examples, not production tools.
:::

Each snippet page now includes a structured reference: overview, behavior walkthrough, dependencies, implementation notes, failure modes, safer study paths, and the original source include.

## Snippets

<table>
  <thead>
    <tr>
      <th>Snippet</th>
      <th>Category</th>
      <th>Risk</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="snippet in snippets" :key="snippet.filename">
      <td><a :href="snippet.link">{{ snippet.title }}</a></td>
      <td>{{ snippet.category }}</td>
      <td>{{ snippet.risk }}</td>
      <td>{{ snippet.description }}</td>
    </tr>
  </tbody>
</table>

## Reading Guide

- Start with low-risk read-only snippets such as [Find By Username](/examples/findByUsername) when learning module discovery.
- Treat high-risk and critical pages as defensive analysis: focus on what they touch, why they are brittle, and why public APIs are safer.
- Use [Module Discovery](/docs/module-discovery) and [BetterDiscord Workflow](/docs/betterdiscord-workflow) for safer patterns.
