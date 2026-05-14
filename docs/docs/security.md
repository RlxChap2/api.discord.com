# Security Notes

Client reverse engineering sits next to real abuse cases. Malware authors use the same facts about Electron, Webpack, and runtime modules to steal credentials or modify installed applications. Treat that overlap seriously.

## Main Risks

**Pasted snippets**  
Short console snippets can hide calls that read credentials, send messages, create invites, change settings, or phone home to a webhook.

**Electron tampering**
Desktop Electron apps include JavaScript files on disk. Malware can modify local bootstrap files so its code runs inside the client process.

**Runtime module access**
Webpack runtime access can reveal powerful internal objects. The existence of a method in memory does not make it safe, authorized, or stable to call.

**Plugin supply chain**
Plugins run with broad access to the page context. A malicious or abandoned plugin can become a credential and data risk.

## Safer Research Rules

- Use a disposable account and isolated profile.
- Do not keep payment methods or sensitive servers in the lab account.
- Do not paste code you have not read completely.
- Prefer official plugin APIs and reviewed source code.
- Keep token, password, MFA, payment, and private-content modules out of scope.
- Record what you changed so the environment can be reset.

## Signs Of Trouble

Investigate if you see:

- Unknown plugins, injected scripts, or modified app files.
- Console snippets that reference webhooks, raw paste URLs, credential names, or payment fields.
- Unexpected network requests to paste sites, file hosts, or webhook endpoints.
- Discord closing and reopening around the time a suspicious tool ran.
- Account settings, sessions, friends, servers, or payment methods changing unexpectedly.

## Incident Response

If you suspect the desktop client was tampered with:

1. Close Discord completely.
2. Remove untrusted plugins and injected scripts.
3. Reinstall Discord from the official download.
4. Change your password and log out other sessions.
5. Review 2FA settings, authorized apps, payment methods, and recent account activity.
6. Contact Discord support and your payment provider if account or billing data may be affected.

## Documentation Policy

This docs set may explain that token-stealing and client-tampering techniques exist, but it does not include runnable token extraction, credential capture, spam automation, or malware injection instructions.
