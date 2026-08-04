// ==UserScript==
// @name         My Project Browser Script
// @match        https://example.com/*
// @run-at       document-end
// @grant        GM.log
// ==/UserScript==

// Browser-script globals are supplied by the Safari userscript host.
declare const GM: { log(...items: unknown[]): void }
declare const location: { href: string }

GM.log("Project browser script loaded", location.href)
