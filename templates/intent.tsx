import { Intent, Script } from "scripting"

const parameter = Intent.shortcutParameter

if (parameter?.type === "text") {
  Script.exit(Intent.text(parameter.value))
} else {
  Script.exit(Intent.text("Please provide text input."))
}
