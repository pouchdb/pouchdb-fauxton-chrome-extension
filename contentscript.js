var scr = document.createElement("script");
scr.src = chrome.runtime.getURL("generated/eval.js");
document.head.appendChild(scr);

var port = chrome.runtime.connect({name: "contentscript.js"});

port.onMessage.addListener(function (msg) {
  window.postMessage(msg, "*");
});

window.addEventListener("message", function (event) {
  port.postMessage(event.data);
});
