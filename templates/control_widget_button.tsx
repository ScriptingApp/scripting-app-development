import {
  ControlWidget,
  ControlWidgetButton,
} from "scripting"
import { RefreshIntent } from "./app_intents"

ControlWidget.present(
  <ControlWidgetButton
    intent={RefreshIntent(undefined)}
    label={{
      title: "Refresh",
      systemImage: "arrow.clockwise",
    }}
  />
)
