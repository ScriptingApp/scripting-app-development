# iOS-style pages

Read this when `index.tsx` or another Scripting host presents an interactive page.

## Defaults

- Query official docs for every component and modifier used.
- Use a `NavigationStack` root for a standard page.
- Prefer `List` or `Form` for settings and structured content.
- Supply a clear navigation title; add a close/dismiss action when the page is modal and no natural back action exists.
- Use `Navigation.useDismiss()` only after verifying its current API page.
- Cover loading, empty, error, and success states when data is asynchronous.

## Basic shape

```tsx
import {
  Button,
  List,
  Navigation,
  NavigationStack,
  Script,
  Text,
  ToolbarItem,
} from "scripting"

function Page() {
  const dismiss = Navigation.useDismiss()

  return (
    <NavigationStack>
      <List navigationTitle="Example" navigationBarTitleDisplayMode="inline">
        <Text>Content</Text>
      </List>
      .toolbar(() => (
        <ToolbarItem placement="confirmationAction">
          <Button title="Close" action={dismiss} />
        </ToolbarItem>
      ))
    </NavigationStack>
  )
}

async function run() {
  await Navigation.present(<Page />)
  Script.exit()
}

run()
```

Treat this as a structural example only: confirm symbols and modifier syntax from official docs before copying it.

## Layout cautions

- Modifier order is semantic. Check whether `frame`, `padding`, `background`, `clipShape`, `buttonStyle`, `contentMargins`, or `widgetBackground` are applied in the intended order.
- Avoid unconstrained vertical dimensions inside `ScrollView` or Grid-style layouts. Use finite frames where an inner view needs a bounded size.
- Use appropriate lazy grids for image-heavy content and inspect a real render, not source alone.
- Keep destructive, privacy-sensitive, or externally visible actions explicit, labelled, and confirmation-gated.

## Lifecycle

A modal one-time page normally ends with `Script.exit()` after `Navigation.present()` resolves. Do not add that exit if the script intentionally uses the resident/resume model; read `project-and-lifecycle.md` first.
