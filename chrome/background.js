chrome.webNavigation.onCompleted.addListener(function (details) {
  if (details.frameId == 0) {
    console.log("hello");
  }
});
console.log("hi");
