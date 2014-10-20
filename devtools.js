chrome.devtools.panels.create("PouchDB",  "icon.img", "generated/fauxton/index.html");

var port = chrome.runtime.connect({name: "devtools.js"});
port.postMessage({tabId: chrome.devtools.inspectedWindow.tabId});
