import {
  HStack,
  Image,
  LiveActivity,
  LiveActivityUI,
  LiveActivityUIBuilder,
  LiveActivityUIExpandedCenter,
  Text,
} from "scripting"

export type ActivityState = {
  minutes: number
}

function ContentView({ minutes }: ActivityState) {
  return (
    <HStack activityBackgroundTint="clear">
      <Image systemName="clock" />
      <Text>{minutes} minutes remaining</Text>
    </HStack>
  )
}

const builder: LiveActivityUIBuilder<ActivityState> = state => (
  <LiveActivityUI
    content={<ContentView {...state} />}
    compactLeading={<Image systemName="clock" />}
    compactTrailing={<Text>{state.minutes}m</Text>}
    minimal={<Image systemName="clock" />}
  >
    <LiveActivityUIExpandedCenter>
      <ContentView {...state} />
    </LiveActivityUIExpandedCenter>
  </LiveActivityUI>
)

export const ExampleLiveActivity = LiveActivity.register(
  "ExampleLiveActivity",
  builder
)
