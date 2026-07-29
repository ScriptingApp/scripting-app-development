# System-host E2E checklist

Use only the sections relevant to the requested capability. Record test input, expected behavior, actual behavior, and any untested condition.

## Main script

- [ ] Run by tapping the script in Scripting App.
- [ ] Confirm finite work exits and resident work minimizes/resumes exactly as designed.
- [ ] Test a permission denial, empty state, or error path where applicable.

## Widget / App Intent

- [ ] Preview each target family where preview is available.
- [ ] Add the Widget to the iOS Home Screen.
- [ ] Check clipping, dynamic text, background, refresh, and configuration.
- [ ] Trigger every Button/Toggle intent and verify safe repeat behavior.

## Live Activity

- [ ] Start, update, and end on device.
- [ ] Check Lock Screen plus supported compact/minimal/expanded Dynamic Island surfaces.
- [ ] Verify stale/ended/dismissed behavior and shared data availability.

## Rich notification

- [ ] Schedule and receive a real notification with custom UI enabled.
- [ ] Expand it and check dynamic content.
- [ ] Tap every action and verify correct re-trigger/cold-start behavior.

## Intent / Share Sheet

- [ ] Invoke from Shortcuts and/or Share Sheet with valid input.
- [ ] Test missing, unsupported, and large input as relevant.
- [ ] Verify result type and return to the calling host.

## Safari browser script

- [ ] Open a matching page in Safari and confirm the script is enabled/matched.
- [ ] Exercise DOM injection and SPA navigation/reload behavior.
- [ ] Exercise every declared GM privilege, cross-origin host, storage, download, or file action.
- [ ] Confirm logs contain no secrets, Cookies, or sensitive page data.
