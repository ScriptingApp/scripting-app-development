import { Text, VStack, Widget } from "scripting"

function WidgetView() {
  return (
    <VStack>
      <Text>Hello Scripting!</Text>
    </VStack>
  )
}

// Prepare all data before present(); the widget context ends immediately after it.
Widget.present(<WidgetView />)
