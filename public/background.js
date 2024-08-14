chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addText",
    title: "⭐ Collect Selected Text ⭐",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addText" && info.selectionText) {
    const url = new URL(tab.url);
    const domain = url.hostname;

    chrome.storage.local.get(["collectedTexts"], (result) => {
      const collectedTexts = result.collectedTexts || {};
      const siteTexts = collectedTexts[domain] || [];

      siteTexts.push(info.selectionText);
      collectedTexts[domain] = siteTexts;

      chrome.storage.local.set({ collectedTexts }, () => {
        console.log("Text added to storage under site:", domain);
      });
    });
  }
});
