# Desktop live debugging with `scripting-cli`

Read this when the user wants to develop a Scripting project in a desktop editor and synchronize/debug it with the Scripting iPhone app.

## What it provides

[`scripting-cli`](https://www.npmjs.com/package/scripting-cli) starts a local development service for a desktop working directory. After the user connects the Scripting app to that service and selects a script project, project changes synchronize in both directions (app ⇄ desktop); saved code is executed in the app for rapid debugging.

This is the preferred desktop-to-iPhone development loop when the user has a Mac/PC, Node.js, and the Scripting app. It does not replace real system-host validation for Widgets, Live Activities, Intents, notifications, or Safari scripts.

## Prerequisites and initialization

1. Confirm the Scripting app is installed on the iPhone.
2. Check Node.js before setup:

   ```bash
   node -v
   ```

   The package README requires **Node.js 20 or later**. If unavailable or too old, explain that Node must be installed/upgraded before CLI debugging can start.
3. Create or choose a desktop working directory; do not initialize inside an unrelated repository without user direction:

   ```bash
   mkdir my-scripting-project
   cd my-scripting-project
   ```

4. The default zero-install path is `npx`; it downloads/runs the package when necessary. Before the first network install/run, state this effect and obtain confirmation if the user has not already authorized dependency download.

   ```bash
   npx scripting-cli start
   ```

5. On the first start, the CLI prompts for an editor and writes `scripting.config.json` in the working-directory root. Choose the editor the user actually uses; do not invent an editor command.
6. Ask the user to open Scripting App and connect it to the local service. With Bonjour enabled, the app can discover the service automatically when network conditions allow:

   ```bash
   npx scripting-cli start --bonjour
   ```

   On Windows, Bonjour support may require a separate Bonjour installation.

7. Once the connection is established, the app also synchronizes the latest Scripting TypeScript declaration files (`.d.ts`) into the initialized workspace. When API details, overloads, types, or import/global declarations matter, locate and read these synced declarations; they describe the connected app version.
8. Once connected, have the user select the script project to debug. Then edit/save files in the desktop directory and watch the app sync and execute the updated code.

## Synced TypeScript declarations (`.d.ts`)

After `scripting-cli start` has initialized the workspace **and Scripting App has connected**, the app synchronizes its latest `.d.ts` declaration files into that workspace. Treat them as a high-value, local reference for the exact app version currently connected.

Use the declarations when you need to confirm:

- whether a symbol is imported from `"scripting"` or global;
- TypeScript signatures, overloads, optional fields, generics, return types, and event payloads;
- TSX component props and modifier typings;
- API availability exposed by the connected app version.

Recommended lookup order for an implementation detail:

1. Official `https://scriptingapp.github.io/llms.txt` and the linked guide/API page for behavior, host rules, permissions, and examples.
2. The synced `.d.ts` files for exact local TypeScript declarations and version-specific typing.
3. Existing project code only as a secondary example.

If the online docs and declarations appear to differ, do not guess: report the discrepancy, prioritize the synced declarations for compile-time compatibility with the connected app, and retain the official docs' safety/host constraints until clarified. Do not edit generated/synced declaration files as application source.


```bash
# Default port 3000; first start also configures the editor.
npx scripting-cli start

# Pick a port if 3000 is unavailable.
npx scripting-cli start --port=4000

# Enable local-network Bonjour discovery.
npx scripting-cli start --bonjour

# Use an editor only for this run; does not change saved config.
npx scripting-cli start --editor=cursor

# Re-run editor selection and rewrite saved configuration.
npx scripting-cli start --reconfigure

# Do not auto-open index.tsx or widget.tsx in the editor.
npx scripting-cli start --no-auto-open
```

CLI flags override the saved config.

## Configuration

The CLI looks for the first available file in this order:

```text
scripting.config.ts
scripting.config.mts
scripting.config.cts
scripting.config.js
scripting.config.mjs
scripting.config.cjs
scripting.config.json
```

For a zero-install setup, use JSON:

```json
{
  "editor": "cursor",
  "editorCommand": "cursor",
  "editorArgs": [],
  "port": 3000,
  "autoOpen": true,
  "generateTsConfig": true,
  "logLevel": "info",
  "ignore": ["*.log", "dist", "assets/large.mp4"]
}
```

Use `npm i -D scripting-cli` only when the user wants a project-local dev dependency, reproducible dependency management, or TypeScript completion for `scripting.config.ts`. This modifies project dependency files and should not be done merely because `npx` works.

For typed config:

```ts
import { defineConfig } from "scripting-cli"

export default defineConfig({
  editor: "cursor",
  port: 4000,
})
```

## Sync boundaries and ignore rules

- Sync includes source, images, fonts, other project assets, and current Scripting `.d.ts` declarations in **both directions** where the app/CLI initializes them. Text has change tracking; other content transfers as raw bytes.
- Dotfiles/directories (including `.git`, `.vscode`, `.DS_Store`) and `node_modules` are excluded by default.
- Configure `ignore` for large/generated/private files. It applies both directions:
  - `"*.log"` matches by extension;
  - `"dist"` matches a name at any depth;
  - `"assets/big.mp4"` matches a path relative to the script root.
- Before connecting, audit the working directory for secrets, private data, build outputs, and large assets. Add exclusions or move them out of the sync root. Never rely on the default exclusions to protect arbitrary sensitive files.

## Debugging procedure

1. Start the CLI and keep its terminal output visible.
2. Confirm the iPhone app is connected to the expected service/port and selected project.
3. Make one small edit and save it; verify it reaches the app and executes. Confirm that the latest synced `.d.ts` files are present in the workspace; search them when an API declaration needs exact confirmation.
4. Use CLI/app output and the real app behavior to diagnose failures. For API uncertainty, consult official `llms.txt` documentation before modifying code.
5. If sync fails, check Node version, phone/desktop network reachability, selected port, firewall/VPN restrictions, service connection, project selection, and ignored-path rules.
6. Stop the local process when the session is done. Live sync is a development convenience, not evidence that every system extension host has passed E2E verification.

## Validation wording

Report separately:

- **CLI connected / file synchronization observed**;
- **updated script executed in Scripting App**;
- **system-host verification remaining** (for example: add Widget to Home Screen, invoke Intent from Shortcuts, expand a real notification, or run Safari script on a matching page).

Check the current `scripting-cli` README when command behavior or options matter; do not rely on this reference as a frozen CLI API.
