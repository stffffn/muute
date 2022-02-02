const sendMessage = (tabId, cmd) => {
  chrome.tabs.sendMessage(tabId, cmd);
};

chrome.commands.onCommand.addListener((cmd) => {
  chrome.tabs.query({ url: 'https://meet.google.com/*' }).then((tabs) => {
    tabs.forEach((tab) => {
      sendMessage(tab.id, cmd);
    });
  });
});

chrome.runtime.onMessage.addListener((msg) => {
  let path = '';

  if (msg.icon) {
    path = `/icons/icon-${msg.icon}.png`;
  } else {
    path = '/icons/icon.png';
  }

  chrome.action.setIcon({ path });
});
