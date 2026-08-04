# Notifications and Intents

Checked with `scripting_reference` against `Notification`, `NotificationInfo`, `NotificationRequest`, and the **Intent** guide/API.

## Rich notification (`notification.tsx`)

Scheduling code must set `customUI: true`; adding `notification.tsx` alone does not activate it.

```ts
import { Notification } from "scripting"

await Notification.schedule({
  title: "Example",
  body: "Expand this notification to view its custom UI.",
  userInfo: { detail: "Created by the scheduling script" },
  customUI: true,
})
```

Inside `notification.tsx`, render with `Notification.present(...)`. Current fields are under `Notification.current?.request.content`; legacy direct fields are deprecated.

```tsx
import { Notification, Text, VStack } from "scripting"

const content = Notification.current?.request.content

await Notification.present(
  <VStack>
    <Text>{content?.title ?? "Notification"}</Text>
    <Text>{content?.body ?? "No body"}</Text>
  </VStack>
)
```

Notification actions open their configured URL; validate every route and parameter. Test actual delivery, expansion, and taps on device.

## Shortcuts and Share Sheet (`intent.tsx`)

`Intent.shortcutParameter` is not a raw string. It is `ShortcutParameter | undefined` with `.type` and `.value`.

```tsx
import { Intent, Script } from "scripting"

const parameter = Intent.shortcutParameter

if (parameter?.type === "text") {
  Script.exit(Intent.text(parameter.value))
} else {
  Script.exit(Intent.text("Please provide text input."))
}
```

Share Sheet arrays include `textsParameter`, `urlsParameter`, `imagePathsParameter`, `imagesParameter`, and `fileURLsParameter`. Prefer `imagePathsParameter` when decoding images is unnecessary. For large files/images, use **Run Script in App** or the Intent setting that runs in app.

Valid documented result wrappers include `Intent.text`, `attributedText`, `url`, `json`, `image`, `file`, `fileURL`, and async `Intent.view`. Every path must call `Script.exit(...)`.

When presenting UI manually, await it before exiting:

```tsx
import { Intent, Navigation, Script, Text, VStack } from "scripting"

function IntentView() {
  return (
    <VStack>
      <Text>{Intent.textsParameter?.[0] ?? "No text"}</Text>
    </VStack>
  )
}

async function run() {
  await Navigation.present({ element: <IntentView /> })
  Script.exit()
}

run()
```

Final validation must use a real Shortcut or Share Sheet invocation, including an invalid/empty input case.
