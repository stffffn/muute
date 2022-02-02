chrome.commands.onCommand.addListener((cmd) => {
  console.log(cmd);

  chrome.tabs.query({ url: 'https://meet.google.com/*' }).then((tabs) => {
    tabs.forEach((tab) => {
      sendMessage(tab.id, cmd);
    });
  });
});

const sendMessage = (tabId, cmd) => {
  chrome.tabs.sendMessage(tabId, cmd);
};

chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.icon) {
    console.log(msg.icon);

    /**
     * ICONS HIER SETZEN
     */
  }
});
