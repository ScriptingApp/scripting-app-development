import {
  Button,
  HStack,
  List,
  NavigationStack,
  Section,
  Text,
  useState,
} from "scripting"

export default function HomeScreenView() {
  const [count, setCount] = useState(0)

  return (
    <NavigationStack>
      <List navigationTitle="Home">
        <Section header={<Text>Counter</Text>}>
          <HStack>
            <Text>Tapped {count} times</Text>
            <Button title="Tap" action={() => setCount(count + 1)} />
          </HStack>
        </Section>
      </List>
    </NavigationStack>
  )
}
