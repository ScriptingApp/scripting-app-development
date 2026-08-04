import { Button, HStack, Text, VStack } from "scripting"

function KeyboardView() {
  const traits = CustomKeyboard.useTraits()

  return (
    <VStack spacing={12}>
      <Text>Input type: {traits.keyboardType}</Text>
      <HStack spacing={10}>
        <Button
          title="Hello"
          action={() => {
            CustomKeyboard.playInputClick()
            CustomKeyboard.insertText("Hello")
          }}
        />
        <Button
          title="Delete"
          action={() => {
            if (CustomKeyboard.hasText) {
              CustomKeyboard.playInputClick()
              CustomKeyboard.deleteBackward()
            }
          }}
        />
        <Button title="Next" action={() => CustomKeyboard.nextKeyboard()} />
        <Button title="Home" action={() => CustomKeyboard.dismissToHome()} />
      </HStack>
    </VStack>
  )
}

// CustomKeyboard is global and present() must be called once in keyboard.tsx.
CustomKeyboard.present(<KeyboardView />)
