const curr_url = window.location.href;

const addPopUpStyling = (popUp, url) => {
  popUp.setAttribute("id", "pop-up");
  popUp.style.background =
    "rgb(255, 91, 26) linear-gradient(180deg, rgba(255, 91, 26, 1) 0%, rgba(255, 153, 0, 1) 100%)";
  popUp.style.borderTopLeftRadius = "10px";
  popUp.style.borderBottomLeftRadius = "10px";
  popUp.style.width = "50px";
  popUp.style.height = "50px";
  popUp.style.position = "fixed";
  popUp.style.top = "20%";
  popUp.style.right = "0px";
  popUp.style.display = "flex";
  popUp.style.flexDirection = "row";
  popUp.style.justifyContent = "center";
  popUp.style.alignItems = "center";

  const logo = document.createElement("img");
  logo.src = url;

  logo.style.width = "40px";
  logo.style.height = "40px";

  popUp.appendChild(logo);

  popUp.addEventListener("mouseenter", () => {
    // Code to run when the element is being hovered over
    console.log("Element is being hovered over");
  });

  popUp.addEventListener("mouseleave", () => {
    // Code to run when the element is no longer being hovered over
    console.log("Element is no longer being hovered over");
  });
};

const loadSidePopUp = async () => {
  const response = await chrome.runtime.sendMessage({
    message: "get_image_url",
    image_url: "./images/logowhite1.png",
  });

  // create popUp element and add styling
  const popUp = document.createElement("div");
  addPopUpStyling(popUp, response.url);

  // add popUp to DOM
  const html = document.getElementsByTagName("html")[0];
  html.appendChild(popUp);
};

if (curr_url.includes("www.linkedin.com")) {
  const split_url = curr_url.split("/");
  const user_id = split_url[split_url.lenght - 2];

  // TODO: make popup occur after page is fully loaded maybe
  loadSidePopUp();
} else {
  console.log("not a linkedin profile");
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const scrapedData = getData();

  fetch("http://localhost:3000/generate-message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(scrapedData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      sendResponse(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return true;
});
