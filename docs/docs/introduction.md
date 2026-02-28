# Gathering Discord API

::: danger Disclaimer
This project is intended strictly for **educational and research purposes**.
The author does not endorse, encourage, or support any form of Discord Terms of Service (ToS) violations, malicious activities, or unauthorized client modifications. Proceed at your own risk.
:::

## Introduction

Gathering Discord API provides a comprehensive set of client-side utility functions designed to analyze Discord's web client architecture. By interacting with the underlying Webpack module system, this project offers tools and methodologies for developers and researchers to understand the internal structure and data flow of a large-scale React application.

This documentation is structured to guide both experienced developers and curious learners through the technical aspects of client-side module discovery.

## Core Mechanisms

### Webpack Module Interception

Modern web applications like Discord bundle their JavaScript code using Webpack. The following approach intercepts these chunks to access the internal module cache safely for observation and analysis:

```javascript
let _mods;
webpackChunkdiscord_app.push([[Symbol()], {}, (r) => (_mods = r.c)]);
webpackChunkdiscord_app.pop();
```

### Module Property Discovery

Once the module cache is accessible, we utilize a recursive search function to locate specific internal properties and methods exported by the application.

```javascript
const findByProps = (...props) => {
    // Recursive search implementation details...
};
```

## Practical Examples

By utilizing the discovery tools, researchers can observe how the client structures its internal data stores. These examples demonstrate how to locate specific modules within the client's memory.

```javascript
// Locate the internal MessageStore
const MessageStore = findByProps('getMessage', 'getMessages');

// Locate the internal UserStore
const UserStore = findByProps('getCurrentUser', 'getUser');
```

## Ethical Guidelines & Acceptable Use

This project is built on the principle of academic and technical exploration. **You are strictly prohibited from using this documentation or its associated code for:**

- Harvesting or scraping user data.
- Developing or distributing unauthorized client modifications.
- Bypassing built-in security measures or rate limits.
- Creating self-bots, spam tools, or automated user accounts.
- Any activity that negatively impacts the Discord platform or its users.

## Legal Notice

By accessing or utilizing any part of this project, you acknowledge that:

- You assume full responsibility and liability for your actions.
- You understand the implications of the Discord Terms of Service.
- The original author bears no responsibility for any misuse, account penalties, or legal consequences resulting from the application of this knowledge.

_Note: This project is completely independent and is not affiliated with, supported, or endorsed by Discord Inc._

## Frequently Asked Questions

**Is it safe to analyze the client in this manner?**
There are inherent risks in observing and interacting with undocumented client internals. This should only be done in controlled, isolated testing environments.

**Will using these techniques result in an account ban?**
Yes. Any unauthorized client manipulation or automation directly violates Discord's Terms of Service and is highly likely to result in permanent account termination.

**Can I integrate this into my official Discord bot?**
No. Legitimate, automated bots must exclusively use the official, documented [Discord Developer API](https://discord.com/developers/docs/intro).

## Contribution Guidelines

Contributions to the documentation and educational examples are welcome, provided they adhere to the following standards:

- Maintain a strict focus on education and research.
- Do not introduce features or tools designed to violate the platform's ToS.
- Ensure all code submissions include appropriate ethical warnings.

## License

This project is open-source and licensed under the [MIT License](https://github.com/RlxChap2/api.discord.com?tab=MIT-1-ov-file#readme).
