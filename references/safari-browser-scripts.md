# Safari browser scripts

Read this for Scripting Safari automation, `browser.tsx`, or standalone `.user.js` scripts.

## Choose one deployment model

| Need | Location |
|---|---|
| Automation belongs to the current Scripting project | `browser.tsx` in the project |
| Script must be independently installed, enabled, and managed in Safari Browser Scripts | a `.user.js` file in the configured userscripts directory |

Do not create both by default. Choose based on the user's distribution and management need.

## Documentation and metadata

Read the current **Safari Browser Scripts** topic from `https://scriptingapp.github.io/llms.txt` before using GM APIs, `Scripting.FileManager`, or metadata features.

Every userscript begins with a metadata block. Keep it minimal:

```js
// ==UserScript==
// @name         Example
// @match        https://example.com/*
// @run-at       document-end
// @grant        GM.log
// ==/UserScript==
```

- Use the narrowest accurate `@match` / `@include`; add exclusions when needed.
- Add every privileged GM/Scripting API as its own `@grant`.
- Add each external host required by cross-origin APIs/downloads/resources as a narrow `@connect` entry. Never use `@connect *` for convenience.
- `@grant none` disables privileged GM APIs; do not mix it with GM methods.
- Use `@inject-into page` only when the script does not need privileged APIs, after verifying current behavior.

## Robust page behavior

- Wait for required DOM safely; tolerate page changes and missing selectors.
- Make injected UI idempotent: repeated execution, bfcache restore, or SPA navigation must not duplicate controls/listeners.
- Watch/reconcile SPA route changes only when needed, and clean up observers/listeners.
- Handle network timeout, invalid response, rate limit, and user cancellation.
- Prefer `GM.log` for diagnosable script logging, while never recording secrets, Cookies, tokens, or sensitive page content.

## Data and security

- Use GM storage for small script state; use documented Scripting Safari storage/download locations for files.
- Do not persist sensitive state unless essential and authorized.
- Do not collect or transmit page data beyond the stated feature. Cross-origin requests and Cookie access require explicit user awareness.

## Validation

Refresh a matching page in Safari, verify the script is enabled/matched, and test each declared privilege (menu, storage, request, download, or file access) on device. Metadata that parses is not proof that a grant or connect permission works.
