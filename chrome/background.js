chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "get_image_url") {
    let responseUrls = {};

    for (let i = 0; i < request.image_urls.length; i++) {
      const url = chrome.runtime.getURL(request.image_urls[i]);
      responseUrls[request.image_urls[i]] = url;
    }

    sendResponse(responseUrls);
  }
});
