import { HStack, Spacer, Text, VStack, Widget } from "scripting"

function WidgetView() {
  const isSmall = Widget.family === "systemSmall"

  return (
    <VStack alignment="leading" spacing={8}>
      <Text>My Script</Text>
      <Text>{isSmall ? "Small Widget" : "Medium or large Widget"}</Text>
      <Spacer />
      <HStack>
        <Text>Update this view with documented data.</Text>
        <Spacer />
      </HStack>
    </VStack>
  )
}

// Widget UI is a snapshot. Do not use useState/useEffect here.
Widget.present(<WidgetView />)
