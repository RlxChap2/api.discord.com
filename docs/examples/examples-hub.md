---
title: Legacy Snippets Hub
---

<script setup>
import { data as snippets } from './snippets.data.js'
</script>

# Legacy Snippets Hub

::: warning Legacy material
These snippets are kept as historical examples from the existing repository. They may depend on unstable Discord internals, may violate Discord's Terms of Service if executed on a real account, and should be reviewed carefully before any local testing.
:::

For the rebuilt research guide, start with [Introduction](/docs/introduction) and [Module Discovery](/docs/module-discovery). Use this hub only when you need to inspect the repository's existing snippet files.

## Available Snippets

<table>
  <thead>
    <tr>
      <th>Snippet</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="snippet in snippets" :key="snippet.filename">
      <td><a :href="snippet.link">{{ snippet.filename }}</a></td>
      <td>{{ snippet.description }}</td>
    </tr>
  </tbody>
</table>
