import { Button, Text, VStack } from "scripting"

function TranslationView() {
  const source = TranslationUIProvider.inputText

  return (
    <VStack spacing={12} padding={16}>
      <Text>Original Text</Text>
      <Text>{source ?? "No text available"}</Text>
      <Button
        title="Close"
        action={() => TranslationUIProvider.finish()}
      />
    </VStack>
  )
}

// Available in translation_ui_provider.tsx on iOS 18.4+.
TranslationUIProvider.present(<TranslationView />)
