# Validation and security

Use this reference after any implementation and before describing it as complete.

## Evidence levels

| Level | What it proves | What it does not prove |
|---|---|---|
| JSON/schema inspection | Descriptor is parseable and required fields exist | The project runs in Scripting App |
| TypeScript diagnostics | Known syntax/type issues are absent | Runtime API, permission, or host behavior |
| `scripting-ts` run | The executed path works in that runtime | Widget/Intent/notification/Live Activity system integration |
| CLI live synchronization | Desktop files synchronize and the selected app script executes | Widget/Intent/notification/Live Activity system integration |
| UI/Widget preview | The rendered preview matches tested dimensions | Home Screen, Lock Screen, Safari, or Shortcuts behavior |
| Device host E2E | The tested system host path works | Untested devices, permissions, inputs, or OS versions |

Never upgrade evidence in wording. For example, `Widget.present()` does not prove a Widget appears on the Home Screen.

## Minimum checks

1. Inspect changed imports and compare every Scripting-specific symbol with its official docs page.
2. Run available TypeScript diagnostics.
3. For a desktop-editor workflow, read `desktop-cli.md`, verify Node.js 20+, start `npx scripting-cli start` after authorizing any package download, and prove one small save syncs to the selected app project.
4. Run a finite `index.tsx` via `scripting-ts project "<name>"` or `scripting-ts run <file>` where available; verify it exits.
5. Preview a TSX surface or target Widget family when that preview exists.
6. State the shortest remaining device validation for each system host.
7. Exercise a failure path: missing/empty input, permission denied, network failure, unavailable API, or repeated action as relevant.

## Host E2E matrix

| Host | User/device action required |
|---|---|
| Main script | Tap the script; verify result and expected exit/minimize-resume behavior |
| Widget | Add to Home Screen; verify target families, clipping, refresh, and interaction |
| Live Activity | Start/update/end it; inspect Lock Screen and supported Dynamic Island variants |
| Rich notification | Schedule/deliver it; expand and activate each action |
| Intent | Invoke from Shortcuts and/or Share Sheet using valid and invalid inputs |
| Safari script | Open a matching page; verify enablement, injection, and every privilege |

## Security checklist

- Use minimum OS, data, and browser permissions.
- Ask before reading/writing sensitive system data, sending external requests, uploading, downloading, or modifying/deleting user data.
- Keep secrets out of code, `script.json`, templates, logs, screenshots, repository history, and browser-script storage.
- Validate external and extension input: URL, file path/type/size, text, query parameters, notification metadata, and App Intent parameters.
- Prefer HTTPS and named trusted endpoints. Explain data destinations for third-party services.
- Make writes and external actions idempotent or confirmation-gated where repeat triggers are possible.
