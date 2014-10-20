var tabId;
var rpc = new PostMessageRPC(postMessage.bind(null, "index-chrome-extension.js"));

var portHandlers = {
  "devtools.js": function (info) {
    tabId = info.tabId;

    injectContentScript();
  },
  "index-chrome-extension.js": function (msg) {
    rpc.onMessage(msg);
    postMessage("contentscript.js", msg);
  },
  "contentscript.js": function (msg) {
    postMessage("index-chrome-extension.js", msg);
  }
};

function injectContentScript() {
  chrome.tabs.executeScript(tabId, {
    file: "contentscript.js",
    //match all pages so at least the 'no pouchdb active' page can be
    //shown.
    matchAboutBlank: true
  });
}

function postMessage(portName, msg) {
  try {
    ports[portName].postMessage(msg);
  } catch (err) {
    setTimeout(postMessage.bind(null, portName, msg), 0);
  }
}

var ports = {};

var firstTime = true;

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(portHandlers[port.name]);
  ports[port.name] = port;

  if (port.name === "index-chrome-extension.js") {
    if (!firstTime) {
      injectContentScript();
    }
    firstTime = false;
  }
});

chrome.tabs.onUpdated.addListener(function (curTabId) {
  if (curTabId === tabId) {
    //reload dev tools
    rpc.call("devtool", "reload");
  }
});
