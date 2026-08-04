# iOS-style pages

Read this when `index.tsx` presents an interactive page. Every API shape below was checked with `scripting_reference` against **Use with ToolbarProps**, `Navigation`, `NavigationStack`, `ButtonProps`, and `ToolBarProps`.

## Standard modal page

In Scripting, `toolbar` is a **view property** whose value is a `ToolBarProps` object. Do not model it as SwiftUI's `.toolbar { ToolbarItem(...) }`, and do not attach it to `NavigationStack`. Put it on the visible page content such as `List`, `VStack`, or `ScrollView`.

```tsx
import {
  Button,
  List,
  Navigation,
  NavigationStack,
  Script,
  Text,
} from "scripting"

function Page() {
  const dismiss = Navigation.useDismiss()

  return (
    <NavigationStack>
      <List
        navigationTitle="Example"
        navigationBarTitleDisplayMode="inline"
        toolbar={{
          cancellationAction: (
            <Button title="Close" action={() => dismiss()} />
          ),
        }}
      >
        <Text>Content</Text>
      </List>
    </NavigationStack>
  )
}

async function run() {
  await Navigation.present(<Page />)
  Script.exit()
}

run()
```

`Navigation.present` also accepts `{ element, modalPresentationStyle? }`. Use the object form only when those options are needed.

## Toolbar placements

`ToolBarProps` supports `bottomBar`, `cancellationAction`, `confirmationAction`, `destructiveAction`, `keyboard`, `navigation`, `primaryAction`, `principal`, `topBarLeading`, and `topBarTrailing`. Each value is one node or an array of nodes.

```tsx
<List
  toolbar={{
    topBarLeading: [
      <Button title="Edit" action={handleEdit} />,
      <Button title="Refresh" action={handleRefresh} />,
    ],
    confirmationAction: <Button title="Save" action={handleSave} />,
  }}
>
  <Text>Content</Text>
</List>
```

## Navigation behavior

- `NavigationStack` is the container; place page-level navigation properties and toolbar on the current visible child.
- For a root page presented modally, a close/cancel action is appropriate.
- For a detail page reached through `NavigationLink`, normally keep the system back button; do not replace it with an unconditional close toolbar.
- Await `Navigation.present(...)`; a finite page script calls `Script.exit()` after dismissal. A deliberate resident/minimized script follows `project-and-lifecycle.md` instead.

## Layout cautions

- Modifier/property order is semantic. Check `frame`, `padding`, `background`, `clipShape`, `buttonStyle`, `contentMargins`, and `widgetBackground` in the applied order.
- Avoid unconstrained vertical dimensions inside `ScrollView` or Grid-style layouts.
- Test image-heavy and adaptive layouts in a real render, not from source alone.
