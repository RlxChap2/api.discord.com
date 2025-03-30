# Discord Client Utilities

> [!CAUTION]
> **This project is intended for educational purposes only. The author does NOT endorse or encourage any form of Discord ToS violation, malicious activity, or client modification. Use at your own risk.**

## 🔍 Overview

A collection of utility functions for analyzing Discord's web client through its Webpack module system. Includes module discovery helpers and webpack chunk inspection techniques.

## ⚠️ Important Disclaimer

-   **Not affiliated with Discord Inc.**
-   **For educational/research purposes only**
-   Discord's Terms of Service prohibit client modification
-   May cease working with any client update
-   Use responsibly and ethically

## 🛠️ Technical Components

### Webpack Module Access

```javascript
let _mods;
webpackChunkdiscord_app.push([[Symbol()], {}, (r) => (_mods = r.c)]);
webpackChunkdiscord_app.pop();
```

This snippet intercepts Discord's webpack chunks to access the module cache.

### Module Property Search

```javascript
const findByProps = (...props) => {
    // Implementation details...
};
```

A recursive module finder that searches through webpack exports to locate specific properties.

## � Usage Example

```javascript
// Find Discord's MessageStore
const MessageStore = findByProps('getMessage', 'getMessages');

// Access user information
const UserStore = findByProps('getCurrentUser', 'getUser');
```

## 🛑 Ethical Considerations

**Never use this for:**

-   User data harvesting
-   Client modification/distribution
-   Bypassing Discord security measures
-   Creating self-bots or spam tools
-   Any malicious activities

## 📜 Legal Notice

By using this code, you agree that:

1. You're solely responsible for your actions
2. You won't use it for malicious purposes
3. You understand Discord's ToS implications
4. The author bears no liability for misuse

## 📌 FAQ

**Q: Is this safe to use?**  
A: There are inherent risks in client analysis. Proceed with caution.

**Q: Will this get me banned?**  
A: Any client manipulation violates Discord's ToS and could result in account termination.

**Q: Can I use this for my bot?**  
A: Official bots should use Discord's documented API only.

## 🧑💻 Contribution Guidelines

-   PRs must maintain ethical standards
-   No ToS-violating features
-   Educational focus only
-   Include proper warnings

## 📝 License

This project is licensed under [MIT License] - see the LICENSE file for details. By using this code, you acknowledge full responsibility for your actions.
