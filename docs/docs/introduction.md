# Gathering Discord API

::: danger
This project is intended strictly for **educational and research purposes**.  
The author does **NOT** endorse or encourage any form of Discord ToS violation, malicious activity, or client modification.  
Use at your own risk.
:::

## 🔍 Overview

Gathering Discord API provides a set of **client-side utility functions** to analyze Discord's web client via its webpack module system.  
Includes:

- Module discovery helpers
- Webpack chunk inspection techniques
- Tools for understanding the internal structure of Discord's client

## 🛠️ Technical Components

### Webpack Module Access

```js
let _mods;
webpackChunkdiscord_app.push([[Symbol()], {}, (r) => (_mods = r.c)]);
webpackChunkdiscord_app.pop();
```

Intercepts Discord's webpack chunks to access the module cache.

### Module Property Search

```js
const findByProps = (...props) => {
  // Implementation details...
};
```

A recursive module finder that searches through webpack exports to locate specific properties.

## 💡 Usage Examples

```js
// Find Discord's MessageStore
const MessageStore = findByProps("getMessage", "getMessages");

// Access user information
const UserStore = findByProps("getCurrentUser", "getUser");
```

## 🛑 Ethical Considerations

**Never use this project for:**

- Harvesting user data
- Client modification or redistribution
- Bypassing Discord security measures
- Creating self-bots or spam tools
- Any malicious activity

Always use responsibly and ethically.

## 📜 Legal Notice

By using this code, you acknowledge that:

- You are solely responsible for your actions
- You will not use it for malicious purposes
- You understand Discord's Terms of Service implications
- The author bears no liability for misuse

This project is **not affiliated with Discord Inc.**

## 📌 FAQ

**Q: Is this safe to use?**
A: There are inherent risks in analyzing the client. Proceed with caution.

**Q: Will this get me banned?**
A: Any client manipulation violates Discord ToS and may result in account termination.

**Q: Can I use this for my bot?**
A: Official bots should use **Discord's documented API only**.

## 🧑💻 Contribution Guidelines

- PRs must maintain ethical standards
- No ToS-violating features
- Educational focus only
- Include proper warnings

## 📝 License

This project is licensed under the [MIT License](https://github.com/RlxChap2/api.discord.com?tab=MIT-1-ov-file#readme).
By using this code, you acknowledge full responsibility for your actions.
