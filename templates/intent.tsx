import { Intent, Script } from "scripting"

async function run() {
  try {
    // Confirm input APIs in current official docs before use.
    const input: unknown = Intent.shortcutParameter

    if (typeof input !== "string" || input.trim().length === 0) {
      Script.exit(Intent.text("Please provide text input."))
      return
    }

    // Transform the validated input here.
    Script.exit(Intent.text(input.trim()))
  } catch (error) {
    console.error(error)
    Script.exit(Intent.text("The intent could not complete."))
  }
}

run()
