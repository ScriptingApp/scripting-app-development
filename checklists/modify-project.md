# Modify a Scripting project

Use this checklist before and after changing an existing project.

- [ ] Read `script.json`, `index.tsx`, the requested capability entry, and its direct dependencies first.
- [ ] Identify the existing lifecycle and do not accidentally turn a resident script into a finite one, or leave a finite script resident.
- [ ] Re-check official `llms.txt` documentation for changed/new Scripting APIs; do not rely only on the project's existing code.
- [ ] Preserve user metadata, localizations, remote-resource settings, and existing input contracts unless change is requested.
- [ ] Make the smallest compatible file/configuration change; remove no capability or user data without explicit approval.
- [ ] For Widget changes, cover the currently supported families; for Intent changes, preserve accepted inputs and output contract.
- [ ] For Safari changes, re-audit `@match`, `@grant`, `@connect`, `@run-at`, duplicate injection, and external data flow.
- [ ] Validate both expected behavior and one relevant failure/repeat-trigger path.
- [ ] Report exact evidence and any remaining host-only checks.
