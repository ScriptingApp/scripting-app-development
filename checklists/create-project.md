# Create a Scripting project

Use this checklist when starting a project from scratch.

- [ ] Identify the requested host: finite action, in-app page, resident/resumable script, Widget, Live Activity, notification, Intent, project browser script, or installed userscript.
- [ ] Fetch `https://scriptingapp.github.io/llms.txt`; read the precise current pages for every Scripting-specific API and capability used.
- [ ] Create the project directory with `script.json` and `index.tsx`.
- [ ] Ensure descriptor JSON is valid and has `name`, `icon`, `color`, and `version`; normally match `name` to directory name.
- [ ] Choose lifecycle deliberately: finite/page work exits; truly resumable work uses documented minimize/resume behavior; Intents return a value.
- [ ] Add only required entry files. Do not scaffold unused Widget, Intent, or extension files.
- [ ] Keep API keys, tokens, private data, and machine-specific secrets out of the project.
- [ ] Run static checks and the applicable local run/preview.
- [ ] List the required device-host verification rather than claiming an untestable extension works.
