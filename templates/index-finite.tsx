import { Script } from "scripting"

async function run() {
  try {
    // Perform finite work here. Query the official llms.txt documentation
    // before adding Scripting-specific APIs.
  } catch (error) {
    console.error(error)
  } finally {
    // A finite script must terminate so CLI execution does not hang.
    Script.exit()
  }
}

run()
