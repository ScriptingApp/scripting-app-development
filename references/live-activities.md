# Live Activities

Checked with `scripting_reference` against **LiveActivity**, `LiveActivity`, `LiveActivityUIProps`, `LiveActivityUIBuilder`, and expanded-region declarations.

## Registration file

Register UI in the standalone `live_activity.tsx` entry. The builder state must be JSON-serializable. The root is `LiveActivityUI`; `content`, `compactLeading`, `compactTrailing`, `minimal`, and expanded-region children are required by the documented shape.

```tsx
import {
  Image,
  LiveActivity,
  LiveActivityUI,
  LiveActivityUIBuilder,
  LiveActivityUIExpandedCenter,
  Text,
} from "scripting"

type State = { minutes: number }

const builder: LiveActivityUIBuilder<State> = state => (
  <LiveActivityUI
    content={<Text>{state.minutes} minutes remaining</Text>}
    compactLeading={<Image systemName="clock" />}
    compactTrailing={<Text>{state.minutes}m</Text>}
    minimal={<Image systemName="clock" />}
  >
    <LiveActivityUIExpandedCenter>
      <Text>{state.minutes} minutes remaining</Text>
    </LiveActivityUIExpandedCenter>
  </LiveActivityUI>
)

export const ExampleLiveActivity = LiveActivity.register(
  "ExampleLiveActivity",
  builder
)
```

## Start, update, and end

The factory returns a `LiveActivity<T>` instance. Await `start`; only update/end after it succeeds.

```ts
const activity = ExampleLiveActivity()

if (await activity.start({ minutes: 10 })) {
  await activity.update({ minutes: 5 })
  await activity.end({ minutes: 0 }, { dismissTimeInterval: 0 })
}
```

States are `active`, `stale`, `ended`, and `dismissed`. Live Activities survive script termination; do not keep a script alive merely because the Activity is visible. Use `BackgroundKeeper.keepAlive()` only for a real continuous update need.

## Files and shared state

Live Activity UI cannot access documents/iCloud. Put required files in `FileManager.appGroupDocumentsDirectory`; shared `Storage` is available. Treat shared data as missing/stale/concurrently changed.

## Interaction and validation

Use App Intents for interactive controls and read `widgets-and-app-intents.md`. Test start/update/end separately, then inspect Lock Screen and supported compact/minimal/expanded Dynamic Island surfaces on device.

## Alarm Live Activity

`alarm_live_activity.tsx` is a separate iOS 26+ entry using `AlarmLiveActivity.register`, not `LiveActivity.register`. Use the dedicated template only for alarms created by `AlarmManager` whose `liveActivity.name` matches the registered name.
