# Sources

This rebuild uses the provided links as research inputs and paraphrases their ideas into a safer documentation set. Some sources include risky examples; those parts are treated as threat context, not as runnable instructions.

## Discord Webpack Notes

[shidemuri/discord README](https://raw.githubusercontent.com/shidemuri/discord/refs/heads/main/README.md)  
Used for Discord-specific context around `window.webpackChunkdiscord_app`, runtime callbacks, `require.c`, and the culture of console snippets. Credential and spam examples were intentionally excluded.

## BetterDiscord Documentation

[BetterDiscord Webpack Modules](https://docs.betterdiscord.app/plugins/concepts/webpack)  
Used for module categories, filter concepts, default exports, `getByKeys`, `getWithKey`, `searchExports`, and plugin-facing Webpack APIs.

[Zerthox BetterDiscord Getting Started](https://zerthox.github.io/guides/bd/getting-started/)  
Used for the React, Flux, breakpoint, store-discovery, and patching workflow context. The rebuilt docs emphasize observation and lifecycle hygiene.

## Webpack Reverse Engineering

[0xdevalias Webpack reverse-engineering gist](https://gist.github.com/0xdevalias/8c621c5d09d780b1d321bfdb86d67cdd)  
[Raw markdown snapshot](https://gist.githubusercontent.com/0xdevalias/8c621c5d09d780b1d321bfdb86d67cdd/raw/c1c58df1142d683aa72c9d5826b92ef370c2098d/reverse-engineering-webpack-apps.md)  
Used for generic Webpack chunk shape, AST framing, runtime injection concepts, and DevTools investigation references.

## Community Context

[Hacker News discussion](https://news.ycombinator.com/item?id=46957858)  
Used only as community context around Discord reverse engineering and client-modding projects. It is not treated as an authoritative technical source.

## Security And Malware Context

[ITNEXT article](https://itnext.io/reversing-nodejs-malware-part-2-analysing-the-source-code-a31c316ff4f)  
[HackerNoon mirror](https://hackernoon.com/reversing-nodejs-malware-part-2-analysing-the-source-code)  
Used for defensive context: Electron app tampering, Discord-targeted malware behavior, credential risks, and safe-user recommendations. The rebuilt docs omit operational malware instructions.
