# Privacy Policy

---

## 1. Overview
This browser extension is designed to display a user’s current queue position when visiting the [Pokemon Center](https://www.pokemoncenter.com) website.  
It works by monitoring network traffic to detect responses from the Pokémon Center’s queue system.

---

## 2. Data Collection
- This extension **does not collect, store, or transmit any personal data.**
- It only reads the contents of network responses from the Pokémon Center domain to extract a single numeric field (`pos`).
- No user identifiers, browsing history, or other personally identifiable information are accessed.

---

## 3. Data Sharing
- No data is sent to external servers.
- No data is shared with third parties.
- All processing happens locally on the user’s device.

---

## 4. Permissions
- **`webRequest`** permission is used solely to detect when the queue endpoint responds.
- **`host_permissions`** are restricted to `https://www.pokemoncenter.com/*` and are only used to read queue position responses.

---

## 5. Security
- The extension runs entirely on the user’s machine.
- No external scripts, analytics, or tracking mechanisms are included.

---

## 6. Contact
If you have any questions or concerns about this privacy policy, please contact the developer at here: [Issues](https://github.com/Tarc94/pc-queue-pos-tracker/issues)
