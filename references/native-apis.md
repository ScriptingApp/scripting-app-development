# Native iOS APIs

Read this whenever a script calls a Scripting-provided iOS API. It is a usage discipline, not a substitute for API documentation.

## Required lookup

Before writing code, search `https://scriptingapp.github.io/llms.txt`, then read the exact API page and any relevant version/changelog page. Confirm:

- whether the API is imported from `"scripting"` or exposed globally;
- method/property spelling, parameters, return type, and async behavior;
- permission prompts, denial behavior, iOS availability, and host restrictions;
- data and storage boundaries.

Do not extrapolate from Apple Swift APIs: Scripting's JavaScript/TypeScript wrapper can differ.

## Common capability routing

| Need | Find in official docs |
|---|---|
| Device and script runtime | `Device`, `Script` |
| Local notifications / rich notification | `Notification` and notification guide |
| Calendar / reminders | `Calendar`, `CalendarEvent`, `Reminder` |
| Location / heading | `Location` |
| Photos / media | `Photos`, media APIs |
| Text-to-speech / recognition | `Speech`, `SpeechRecognition` |
| User files / persistence | `DocumentPicker`, `FileManager`, `Storage` |
| Maps | MapKit topics |
| Alarms / timers | `AlarmManager` / AlarmKit topics |

The `llms.txt` index changes with releases; search it rather than relying on this table as exhaustive.

## Implementation rules

- Import only confirmed module symbols. APIs documented as global need no import; do not guess.
- Use `async` / `await` and handle permission refusal, empty results, cancellation, network failure, and unavailable features where relevant.
- Ask before expanding sensitive permissions or reading/writing a user's health, location, photos, calendar, reminders, clipboard, microphone, or files.
- Do not collect, log, upload, or persist more private data than the task requires.
- Keep raw API calls behind a narrow helper so UI and extension hosts can share a stable domain model.

## Validation

Static checks cannot prove permission behavior. Run the smallest safe path where possible, then state the precise device action needed to validate grants, denied permissions, and system UI.
