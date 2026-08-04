# Additional entry points

These rules and templates were checked with `scripting_reference` against **Home Screen UI**, **Custom Keyboard**, **Spotlight**, **TranslationUIProvider**, `AssistantTool`, and **Alarm Live Activity**.

## `home_screen_default_ui.tsx`

- Default-export a function component. It owns the entire Home tab.
- Return the UI directly; do not call `Navigation.present` or `Script.exit`.
- `Script.env === "home_screen"`.
- The instance remains alive while enabled. Editing does not hot-reload it; long-press the Home tab icon and choose Reload.
- `Script.onHomeTabEvent` receives `selected`, `reselected`, or `deselected` after initial appearance.

## `keyboard.tsx`

- `CustomKeyboard` is global and only available in the keyboard extension.
- Call `CustomKeyboard.present(...)` exactly once.
- Use `useTraits()` in components; check `hasText` before deleting.
- Full Access is required for clipboard/network capabilities.
- Enable at Settings > General > Keyboard > Keyboards > Add New Keyboard > Scripting.

## `spotlight.tsx`

- `Spotlight` is global.
- This entry runs after a user taps an item indexed by the same script.
- Read `Spotlight.current`; it is null outside this environment.
- Tap parameters are in `Spotlight.current.parameters`, not `Script.queryParameters`.
- Spotlight indexing requires Scripting PRO.

## `translation_ui_provider.tsx`

- iOS 18.4+ only; `TranslationUIProvider` is global.
- Handle `inputText === null`.
- Present once with `TranslationUIProvider.present(...)`.
- Respect `allowsReplacement`; call `finish(translation)` only when the host allows replacement, otherwise call `finish()`.
- This API hosts UI/session control; the script implements translation itself.

## `assistant_tool.tsx`

- `AssistantTool` is global.
- Register the execution function with the exact API declaration for the target tool type.
- The minimal template uses the documented deprecated-compatible `{ success, message }` result. For structured output or interactive UI, query `AssistantToolResponseResult`, `registerUIView`, and approval APIs before implementation.
- Validate params; do not return secrets or private state to the assistant.

## `alarm_live_activity.tsx`

- iOS 26+ only.
- Register with `AlarmLiveActivity.register(name, builder)`.
- The root must be `LiveActivityUI` with all required regions.
- The `liveActivity.name` in `AlarmManager.Attributes` must equal the registered name.
- Prefer `state.actions.*.intent` for pause/resume/stop behavior.

Use only the matching template; delete unused entry files rather than shipping dormant system capabilities.
