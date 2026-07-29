# Live Activities

Read this for `live_activity.tsx`, Lock Screen UI, Dynamic Island UI, or a workflow that starts/updates/ends a Live Activity.

## Documentation first

Use `https://scriptingapp.github.io/llms.txt` to locate current Live Activity documentation before choosing registration, start, update, end, state, or interaction APIs. Verify iOS/device availability as well as signatures.

## State and rendering model

- Register the Activity UI in `live_activity.tsx` using the currently documented registration API.
- Keep `contentState` JSON-serializable: primitives, arrays, and plain JSON objects only. Do not place functions, class instances, dates without deliberate serialization, or live handles in it.
- Treat the UI builder as a pure mapping from current state to TSX.
- Design each required presentation intentionally: Lock Screen, compact leading/trailing, minimal, and expanded regions. A view that is readable on Lock Screen can be unusable in a compact island.

## Lifecycle

- Model start, update, and end explicitly.
- Handle terminal/host states such as active, stale, ended, and dismissed according to the current API.
- An Activity can remain visible after the initiating script exits. Do not keep the script alive merely because the Activity exists.
- Use background keep-alive only when a genuinely continuous update requirement has been confirmed; explain battery and reliability implications.

## Files and shared state

Live Activity extensions cannot assume access to documents/iCloud. Use the documented App Group location or shared Storage for data/files that must cross the app-extension boundary. Treat shared data as potentially missing, stale, or concurrently changed.

## Interaction and validation

- Put interactive behavior behind documented App Intents; read `widgets-and-app-intents.md` too.
- Test start/update/end logic separately from layout.
- System verification must cover the requested Lock Screen and, where supported, Dynamic Island states. A code-level test is not sufficient proof of UI presentation.
