import {
  AppIntentManager,
  AppIntentProtocol,
  ControlWidget,
  Widget,
} from "scripting"

export const RefreshIntent = AppIntentManager.register({
  name: "RefreshIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async (_params: undefined) => {
    Widget.reloadAll()
  },
})

export const SetEnabledIntent = AppIntentManager.register({
  name: "SetEnabledIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async ({ value }: { value: boolean }) => {
    Storage.set("enabled", value)
    Widget.reloadAll()
    ControlWidget.reloadToggles()
  },
})
