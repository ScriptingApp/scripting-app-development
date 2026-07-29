import { Button, List, Navigation, NavigationStack, Script, Text } from "scripting"

function ResidentView() {
  return (
    <NavigationStack>
      <List navigationTitle="My Script">
        <Text>This script remains available for resume events.</Text>
        {Script.supportsMinimization() ? (
          <Button title="Hide" action={() => Script.minimize()} />
        ) : null}
      </List>
    </NavigationStack>
  )
}

Script.onResume(details => {
  // Validate details/query parameters and make repeated triggers idempotent.
  console.log("Resumed", details.queryParameters)
})

// Do not call Script.exit() after this: this template intentionally remains alive.
Navigation.present(<ResidentView />)
