# Project structure and lifecycle

Read this for a new project, a new entry point, or any change affecting runtime lifetime.

## Required project files

```text
My Script/
├── script.json
├── index.tsx
└── optional: widget.tsx, live_activity.tsx, notification.tsx,
              intent.tsx, app_intents.tsx, browser.tsx, ...
```

`script.json` requires `name`, `icon`, `color`, and `version`. Keep `name` equal to the directory name unless the user deliberately chooses otherwise. Add `intentInputTypes` only for inputs handled by `intent.tsx`; add `runInApp` only when the requested in-app presentation requires it.

## Entry-point map

| File | Host |
|---|---|
| `index.tsx` | Script opened in Scripting App |
| `widget.tsx` | Home Screen Widget |
| `app_intents.tsx` | App Intent actions for Widget/Live Activity/control surfaces |
| `live_activity.tsx` | Lock Screen / Dynamic Island Live Activity |
| `notification.tsx` | Expanded custom notification UI |
| `intent.tsx` | Shortcuts and Share Sheet |
| `browser.tsx` | Browser script bundled with this project |
| `keyboard.tsx`, `spotlight.tsx`, `translation_ui_provider.tsx`, `home_screen_default_ui.tsx` | Dedicated keyboard, Spotlight, Translation UI, and Home tab hosts |
| `control_widget_button.tsx`, `control_widget_toggle.tsx`, `assistant_tool.tsx`, `alarm_live_activity.tsx` | Opt-in control, assistant, and AlarmKit entry points |

Only create the entry point that the user needs. Query it through `scripting_reference` before writing code; the public `llms.txt` index is a useful external fallback, not a substitute for the bundled declarations.

## Lifecycle choices

### Finite work

Use `Script.exit()` when all work is complete: a fetch-and-save operation, a notification scheduling operation, or a page dismissed after one-time use. A finite executable script must not leave an unresolved event loop.

### One-time page

Present the page, await its dismissal, then terminate:

```tsx
import { Navigation, NavigationStack, List, Script, Text } from "scripting"

function Screen() {
  return <NavigationStack><List navigationTitle="Example"><Text>Done</Text></List></NavigationStack>
}

async function run() {
  await Navigation.present(<Screen />)
  Script.exit()
}

run()
```

### Resident/resumable work

Use only when state must remain in memory or the same instance must receive re-triggers. Register `Script.onResume(...)`; use `Script.minimize()` only where supported; do not call `Script.exit()` immediately afterward. Ensure re-triggers cannot start duplicate listeners, duplicate writes, or duplicate UI.

```tsx
import { Script } from "scripting"

Script.onResume(details => {
  console.log("Resumed", details.queryParameters)
})

// Present/minimize UI as required. Do not unconditionally Script.exit().
```

Read the official **Script Minimization and Resume** page before using this model. A script that does not need to remain alive should exit instead.

### Intent result

`intent.tsx` is not a normal long-lived main entry. It must return an appropriate result with `Script.exit(value)` on every path.

## Shared-code boundary

Keep domain logic in ordinary `.ts`/`.tsx` modules. Entry files should validate their host input, load allowed state, invoke shared logic, render/return host-specific results, and clean up. Do not duplicate business logic across `index.tsx`, Widget, and Intent handlers.
