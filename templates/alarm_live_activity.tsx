import {
  AlarmLiveActivity,
  LiveActivityUI,
  LiveActivityUIExpandedCenter,
  Text,
} from "scripting"

AlarmLiveActivity.register("ExampleAlarmActivity", state => (
  <LiveActivityUI
    content={<Text>{state.title}</Text>}
    compactLeading={<Text>{state.mode}</Text>}
    compactTrailing={<Text>{state.title}</Text>}
    minimal={<Text>{state.mode}</Text>}
  >
    <LiveActivityUIExpandedCenter>
      <Text>{state.presentation.alert.title}</Text>
    </LiveActivityUIExpandedCenter>
  </LiveActivityUI>
))
