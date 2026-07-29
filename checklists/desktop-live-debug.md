# Desktop live-debug setup

Use this when setting up a desktop editor to synchronize with Scripting App through `scripting-cli`.

- [ ] Confirm Scripting App is installed on the iPhone.
- [ ] Run `node -v`; require Node.js 20+ before proceeding.
- [ ] Choose a dedicated sync root. Inspect it for secrets, private data, large/generated files, and unrelated projects.
- [ ] Explain that `npx scripting-cli start` may download the package on first use; obtain approval before this network/dependency action if not already authorized.
- [ ] Start the service with the intended port, e.g. `npx scripting-cli start` or `npx scripting-cli start --port=4000`.
- [ ] Choose/reconfigure the actual user editor when prompted; verify the generated `scripting.config.json` does not contain incorrect editor settings.
- [ ] Configure `ignore` for sensitive, large, or generated paths; remember sync is bidirectional and default exclusions only cover dotfiles/dot-directories and `node_modules`.
- [ ] Optionally start with `--bonjour` for local discovery; on Windows, explain that Bonjour may require separate installation.
- [ ] Have the user connect Scripting App to the expected local service and select the intended script project.
- [ ] Make one harmless, small save and confirm it synchronizes and executes in the app.
- [ ] Confirm the latest app-synced `.d.ts` declarations exist in the workspace. Search them for exact API signatures, imports/globals, event types, and TSX props; do not edit them as application source.
- [ ] Keep CLI sync evidence distinct from Widget, Live Activity, notification, Intent, and Safari host E2E evidence.
- [ ] Stop the local service when debugging is complete.
