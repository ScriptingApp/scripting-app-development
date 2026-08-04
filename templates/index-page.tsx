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
