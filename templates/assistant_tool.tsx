type Params = {
  message?: string
}

AssistantTool.registerExecuteTool<Params>(async params => {
  const message = params.message?.trim() || "Done"

  return {
    success: true,
    message,
  }
})
