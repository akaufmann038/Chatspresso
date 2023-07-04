chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "get_image_url") {
    let responseUrls = {};

    for (let i = 0; i < request.image_urls.length; i++) {
      const url = chrome.runtime.getURL(request.image_urls[i]);
      responseUrls[request.image_urls[i]] = url;
    }
    console.log("getting image resources");

    sendResponse(responseUrls);
  }
});

// when a tab is changed, send the new userId from the url to the content script
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (
    changeInfo.url &&
    changeInfo.url.startsWith("https://www.linkedin.com/in/") &&
    !changeInfo.url.includes("miniProfileUrn")
  ) {
    console.log(changeInfo.url);

    let split_url = changeInfo.url.split("/");
    let user_id = split_url[split_url.length - 2];

    try {
      await chrome.tabs.sendMessage(tab.id, {
        message: "new user id",
        userId: user_id,
      });
    } catch (err) {
      console.log("navigating to linkedin page");
    }
  }
});
