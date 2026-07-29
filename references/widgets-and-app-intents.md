# Widgets and App Intents

Read this for `widget.tsx`, `app_intents.tsx`, Widget buttons/toggles, or a control surface.

## Static Widget

- The file is `widget.tsx`.
- Build a function component with Scripting's SwiftUI-style components.
- Treat rendering as a snapshot: do **not** use `useState`, `useEffect`, timers, or local reactive state in Widget UI.
- Adapt layout with `Widget.family`, `Widget.displaySize`, and, when documented for the design, `Widget.parameter`.
- Fetch data before `Widget.present(<WidgetView />)` if necessary; keep data work bounded and failure-tolerant.
- `Widget.present()` supplies content to the host. It does not add the Widget to the user's Home Screen.

## Interactive Widget and App Intent

1. Look up `AppIntent` and `AppIntentManager` from official docs before creating the action.
2. Register business actions in `app_intents.tsx`; keep Widget UI declarative.
3. Choose the documented intent protocol appropriate to the action (general App Intent, audio playback/recording, or Live Activity intent). Do not use a broad protocol by habit.
4. Bind the registered intent to Widget/Live Activity `Button` or `Toggle` only with the documented syntax.
5. After state changes, call the documented Widget refresh API (for example, `Widget.reloadAll()` when appropriate) so the visible snapshot is not stale.
6. Validate duplicate taps, unavailable state, action failures, and state persistence.

## Design and validation

- Design intentionally for each target family; do not simply shrink one dense layout.
- Use `scripting-ts widget "<project>" --family <family>` or equivalent preview if available.
- Validate at least the requested families on the device after adding the Widget to the Home Screen.
- Do not claim an Intent works system-wide until it has been triggered from the actual host surface.

## Storage and security

Use the smallest persistent state necessary. Treat Widget actions as untrusted/repeatable triggers: validate input and make actions safe to repeat. Do not place tokens or sensitive user content in Widget configuration or visible UI.
