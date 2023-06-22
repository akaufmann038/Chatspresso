chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "get_image_url") {
    const image_url = chrome.runtime.getURL(request.image_url);
    sendResponse({ url: image_url });
  }
});
