const item = Spotlight.current

if (item) {
  console.log("Opened Spotlight item:", item.id)
  console.log("Parameters:", JSON.stringify(item.parameters))
}
