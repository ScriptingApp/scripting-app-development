import {
  ControlWidget,
  ControlWidgetToggle,
} from "scripting"
import { SetEnabledIntent } from "./app_intents"

const enabled = Storage.get<boolean>("enabled") ?? false

ControlWidget.present(
  <ControlWidgetToggle
    intent={SetEnabledIntent({ value: !enabled })}
    label={{
      title: "Enabled",
      systemImage: enabled ? "checkmark.circle.fill" : "circle",
    }}
    activeValueLabel={{ title: "On" }}
    inactiveValueLabel={{ title: "Off" }}
  />
)
