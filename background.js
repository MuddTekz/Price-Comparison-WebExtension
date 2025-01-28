chrome.runtime.onInstalled.addListener(() => {
  console.log("Smart Shopping Assistant installed!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "notify_price_drop") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Price Drop Alert!",
      message: `The price of ${message.product} has dropped to ${message.newPrice}.`
    });
  }
});
