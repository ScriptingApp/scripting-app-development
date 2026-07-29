// Browser-script globals are supplied by the Safari userscript host.
declare const document: { getElementById(id: string): unknown }
declare const GM: { log(message: string): void }

// ==UserScript==
// @name         My Project Browser Script
// @match        https://example.com/*
// @run-at       document-end
// @grant        GM.log
// ==/UserScript==

;(function () {
  "use strict"

  const markerId = "my-project-browser-script"
  if (document.getElementById(markerId)) return

  // Query Safari Browser Scripts documentation before adding GM APIs,
  // cross-origin requests, downloads, or Scripting.FileManager access.
  GM.log("Project browser script loaded")
})()
