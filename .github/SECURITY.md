# Security & Compliance Policy

## Supported Versions

To ensure the highest level of security, stability, and compliance with Discord's evolving architecture, only the latest major release of this framework receives active security updates. We strongly advise users to operate on the latest version to mitigate risks and maintain Terms of Service (ToS) compliance.

| Version     | Status | Security Updates          |
| :---------- | :----: | :------------------------ |
| **2.x.x**   |   🟢   | Actively Supported        |
| **1.3.x**   |   🟡   | Critical Fixes Only       |
| **< 1.2.x** |   🔴   | End of Life (Unsupported) |

---

## Reporting a Vulnerability

> [!IMPORTANT]  
> **Platform Boundary Notice:** This repository houses an independent, educational framework. **Do NOT report vulnerabilities related to the official Discord platform or API here.** If you have found a vulnerability in Discord itself, please report it directly to Discord's official security team via their [Bug Bounty Program](https://bugcrowd.com/discord) or support portal.

### Coordinated Vulnerability Disclosure (CVD)

If you discover a security flaw, data leak, or compliance breach strictly within **OUR IMPLEMENTATION** (the DCU codebase), please follow this responsible disclosure process:

1. **Keep it Confidential:** Do **NOT** open public GitHub issues, discussions, or pull requests regarding active security vulnerabilities.
2. **Contact Us Directly:** Email your comprehensive security report to **[support@mrhrs.xyz]**. (Please use PGP encryption if you are transmitting sensitive PoC data).
3. **Report Contents:** Ensure your report includes:
    - A detailed description of the vulnerability.
    - Step-by-step reproduction instructions.
    - A clear assessment of the potential impact.
    - (Optional but appreciated) A proposed mitigation or patch.

### Service Level Agreements (SLAs)

Our team is committed to addressing security concerns promptly:

- **Initial Acknowledgment:** `< 48 hours` from submission.
- **Vulnerability Triage & Validation:** `< 72 hours` from acknowledgment.
- **Critical Patch Release:** `< 72 hours` following successful validation.
- **Non-Critical Fixes:** Rolled out in the next scheduled minor release.
- **Public Disclosure:** Coordinated mutually with the reporter _only_ after a patch has been fully deployed.

---

## Scope Limitations

To streamline our security efforts, please ensure your report falls within our defined scope.

**IN SCOPE:**

- Vulnerabilities within our custom Webpack interception logic.
- Improper handling or unintended logging of local client data by our scripts.
- Flaws in our local authentication/authorization testing flows.
- Code execution risks originating from our module extractors.

**OUT OF SCOPE:**

- Theoretical vulnerabilities lacking a reproducible Proof-of-Concept (PoC).
- Vulnerabilities residing on Discord's servers, infrastructure, or official clients.
- Social engineering, phishing, or physical attacks.
- Issues arising from third-party modifications of our code.

---

## Compliance & Data Privacy Notes

This project operates under strict ethical and legal boundaries:

- **Zero-Data Retention:** We enforce strict data minimization. The script runs entirely in-memory and does not externalize, log, or harvest personal user data.
- **API Integrity:** The code is designed to respect Discord's API rate limits and operational boundaries.
- **Regulatory Alignment:** All security updates prioritize maintaining compliance with the Discord Developer Terms of Service, as well as global data protection regulations (including GDPR and CCPA where applicable to local runtime executions).
