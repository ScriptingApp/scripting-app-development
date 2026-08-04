# Widgets, App Intents, and Control Widgets

Checked with `scripting_reference` against **Widget Quick Start**, **AppIntent**, **Interactive Widget and LiveActivity**, **Control Widget**, and the exact API declarations.

## Static Widget (`widget.tsx`)

```tsx
import { Text, VStack, Widget } from "scripting"

function WidgetView() {
  return (
    <VStack>
      <Text>Hello Scripting!</Text>
    </VStack>
  )
}

Widget.present(<WidgetView />)
```

Prepare all data before `Widget.present(...)`: the execution context is destroyed immediately afterward, so code after it does not run. Hooks have no active persistent lifecycle in Widget rendering. Adapt with `Widget.family`, `Widget.displaySize`, and `Widget.parameter`; valid families include `systemSmall`, `systemMedium`, `systemLarge`, `systemExtraLarge`, and accessory families.

## App Intents (`app_intents.tsx`)

All App Intents must be registered in `app_intents.tsx`. Import every Scripting API used; `Storage` is global.

```tsx
import {
  AppIntentManager,
  AppIntentProtocol,
  ControlWidget,
  Widget,
} from "scripting"

export const RefreshIntent = AppIntentManager.register({
  name: "RefreshIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async (_params: undefined) => {
    Widget.reloadAll()
  },
})

export const SetEnabledIntent = AppIntentManager.register({
  name: "SetEnabledIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async ({ value }: { value: boolean }) => {
    Storage.set("enabled", value)
    Widget.reloadAll()
    ControlWidget.reloadToggles()
  },
})
```

Use a protocol matching the action: `AppIntent`, `AudioPlaybackIntent`, `AudioRecordingIntent` (iOS 18+, requires a Live Activity during recording), or `LiveActivityIntent`.

## Interactive Widget

```tsx
import { Button, Toggle, VStack, Widget } from "scripting"
import { RefreshIntent, SetEnabledIntent } from "./app_intents"

function WidgetView() {
  const enabled = Storage.get<boolean>("enabled") ?? false

  return (
    <VStack>
      <Button title="Refresh" intent={RefreshIntent(undefined)} />
      <Toggle
        title="Enabled"
        value={enabled}
        intent={SetEnabledIntent({ value: !enabled })}
      />
    </VStack>
  )
}

Widget.present(<WidgetView />)
```

`Button` uses either `action` or `intent`, never both. A `Toggle` uses either `onChanged`, an `Observable<boolean>`, or an `intent` with its current `value`.

## Control Widgets

- `control_widget_button.tsx` may present only `ControlWidgetButton`.
- `control_widget_toggle.tsx` may present only `ControlWidgetToggle`.
- A toggle intent parameter must extend `{ value: boolean }`.
- If an active value label is supplied, supply the inactive one too.
- Call `ControlWidget.reloadButtons()` / `reloadToggles()` after relevant state changes.

See the matching templates for minimal, type-correct entry files.

## Validation

Use Widget preview for the requested families, then add it to the actual Home Screen. Test every App Intent from its real Widget, Live Activity, or Control Widget host. Preview or registration alone is not host verification.
