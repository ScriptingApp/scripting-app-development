// ==UserScript==
// @name         My Scripting Browser Script
// @match        https://example.com/*
// @run-at       document-end
// @grant        GM.log
// ==/UserScript==

;(function () {
  "use strict"

  // Keep page injection idempotent and check DOM availability.
  if (document.getElementById("my-scripting-browser-script")) return

  GM.log("Script loaded")
})()
