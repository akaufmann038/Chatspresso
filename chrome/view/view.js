const button = document.getElementById("getData");
const message = document.getElementById("message");

const sendMessage = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, {
    message: "Generate message",
  });

  message.innerText = response;
};

button.addEventListener("click", async () => {
  await sendMessage();
});
