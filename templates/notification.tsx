import { Notification, Text, VStack } from "scripting"

const content = Notification.current?.request.content

await Notification.present(
  <VStack>
    <Text>{content?.title ?? "Notification"}</Text>
    <Text>{content?.body ?? "No body"}</Text>
  </VStack>
)
