# Introduction

::: danger Unofficial research material
These docs are not Discord documentation and are not endorsed by Discord. They are written for controlled client-side research, plugin-development literacy, and defensive analysis. Use the official [Discord Developer API](https://discord.com/developers/docs/intro) for bots, applications, and production integrations.
:::

This site rebuilds the original notes into a safer guide for understanding Discord's client-side application. The focus is on how the web and desktop clients are bundled, how modules can be discovered, how React and Flux patterns show up in minified code, and why this knowledge needs careful security boundaries.

The source material behind this rebuild includes Discord-specific Webpack notes, BetterDiscord plugin documentation, generic Webpack reverse-engineering notes, community discussion, and a malware-analysis article. See [Sources](/docs/sources) for the full list and how each source was used.

## What This Covers

- The relationship between Electron, React, Flux stores, Webpack chunks, and runtime module caches.
- Safe read-only techniques for identifying modules by stable traits such as exported keys, display names, strings, and store names.
- BetterDiscord's maintained `BdApi.Webpack` workflow for plugin contexts.
- React and Flux inspection habits using DevTools, breakpoints, source formatting, and component trees.
- Security guidance for avoiding credential theft, pasted-snippet risks, and Electron client tampering.

## What This Does Not Cover

These docs intentionally exclude runnable instructions for:

- Extracting, printing, exfiltrating, or using account tokens.
- Sending automated messages, self-botting, spam, or unsolicited automation.
- Bypassing payments, badges, experiments, access controls, rate limits, or moderation systems.
- Capturing passwords, payment details, MFA data, addresses, or private user content.
- Packaging malware or silently modifying another user's Discord installation.

If your goal is to build a Discord integration, start with the official API. If your goal is plugin development, prefer documented BetterDiscord APIs and keep a clear uninstall path.

## Recommended Lab Setup

Use a separate browser profile or disposable test environment. Do not use an account with payment methods, sensitive servers, privileged roles, or real moderation powers. Keep DevTools experiments and client mods away from your main account.

Before running any snippet, read it completely. Treat code from gists, chat messages, paste sites, and raw repository links as untrusted until proven otherwise.

## Reading Order

1. [Architecture Overview](/docs/explanation) explains the moving parts.
2. [Webpack Runtime](/docs/webpack-runtime) describes chunks and caches.
3. [Module Discovery](/docs/module-discovery) gives repeatable search patterns.
4. [React and Flux](/docs/react-flux) connects UI inspection to stores and components.
5. [BetterDiscord Workflow](/docs/betterdiscord-workflow) maps the ideas into plugin APIs.
6. [Security Notes](/docs/security) covers the defensive side.
