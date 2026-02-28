---
title: Snippets Hub
---

<script setup>
import { data as snippets } from './snippets.data.js'
</script>

# Snippets Hub

This is the Preview page of the on the Github

## Available Snippets Table

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
      <td>This is a <strong>{{ snippet.name }}</strong> code snippet.</td>
    </tr>
  </tbody>
</table>
