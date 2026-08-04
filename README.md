# Scripting App Development Skill

A development skill for desktop coding agents such as Codex and Claude Code. It helps agents create, modify, debug, and validate [Scripting App](https://scriptingapp.github.io/) projects: TypeScript/TSX scripts, iOS-style pages, native APIs, Widgets, Live Activities, rich notifications, Shortcuts/Share Sheet intents, App Intents, and Safari browser scripts.

## Install

Copy or link this repository into the skill directory used by your coding agent. The root [`SKILL.md`](SKILL.md) is the entry point; it loads only the relevant files under `references/`, `templates/`, and `checklists/` for each task.

## Documentation and local typings

Before writing Scripting-specific code, the skill requires the agent to consult the official LLM documentation index:

- <https://scriptingapp.github.io/llms.txt>

For desktop-to-iPhone development, use [`scripting-cli`](https://www.npmjs.com/package/scripting-cli):

```bash
# Requires Node.js 20+
npx scripting-cli start
```

After the Scripting App connects to the initialized workspace, it synchronizes current `.d.ts` declarations. The agent should use them to verify exact local TypeScript signatures, imports/globals, event payloads, and TSX props, while using the official documentation for behavioral, permission, and host constraints.

## Contents

```text
SKILL.md                         Main routing, API lookup, validation, and safety rules
references/                      Focused guides for project lifecycle, UI, native APIs,
                                 Widgets/App Intents, Live Activities, notifications/Intents,
                                 Safari scripts, desktop CLI, and validation/security
templates/                       Document-verified starters for `script.json`, main/resident UI,
                                 Widget/App Intents, Home Screen UI, Keyboard, notifications,
                                 Control Widgets, Live Activities, Intents, Spotlight,
                                 Translation UI, Assistant Tools, and Safari scripts
checklists/                      Project creation, modification, desktop live-debug, and host E2E checks
```

## Development loop

1. Identify the target Scripting host and entry point.
2. Query the bundled Scripting reference/API declarations when available; otherwise query `llms.txt` and the exact official API/capability page.
3. When available, initialize `scripting-cli`, connect the app, and inspect synced `.d.ts` files for the connected app version.
4. Implement the smallest compatible change.
5. Run diagnostics, CLI/live-sync checks, and applicable previews.
6. Complete the required real device-host verification for Widgets, Live Activities, notifications, Intents, and Safari scripts.

## Scope

This repository contains Scripting-specific development guidance only. It deliberately does not prescribe a generic task-planning, approval, specification, or Git workflow.

## License

MIT
