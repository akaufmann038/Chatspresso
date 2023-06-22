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
  popUp.style.cursor = "pointer";

  const logo = document.createElement("img");
  logo.src = url;
  logo.style.width = "40px";
  logo.style.height = "40px";
  popUp.appendChild(logo);

  // animations
  popUp.style.transition = "height 0.2s, width 0.2s";
  logo.style.transition = "height 0.2s, width 0.2s";

  // event listeners
  popUp.addEventListener("mouseenter", () => {
    popUp.style.width = "55px";
    popUp.style.height = "55px";

    logo.style.width = "45px";
    logo.style.height = "45px";
  });

  popUp.addEventListener("mouseleave", () => {
    popUp.style.width = "50px";
    popUp.style.height = "50px";

    logo.style.width = "40px";
    logo.style.height = "40px";
  });

  popUp.addEventListener("click", () => {
    console.log("clicked");
  });
};

const addSideScreenStyling = (sideScreen, url) => {
  sideScreen.style.width = "200px";
  sideScreen.style.height = "400px";
  sideScreen.style.borderRadius = "10px";
  sideScreen.style.borderWidth = "1px";
  sideScreen.style.borderStyle = "solid";
  sideScreen.style.borderColor = "rgba(255, 91, 26, 1)";
  sideScreen.style.display = "flex";
  sideScreen.style.flexDirection = "column";
  sideScreen.style.alignItems = "center";

  const minus = document.createElement("img");
  minus.src = url;
  minus.style.width = "15px";
  minus.style.height = "3px";
  minus.style.alignSelf = "flex-end";
  minus.style.marginTop = "10px";
  minus.style.marginRight = "10px";
  sideScreen.appendChild(minus);
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

const loadSideScreen = async () => {
  const response = await chrome.runtime.sendMessage({
    message: "get_image_url",
    image_url: "./images/reduce_line.png",
  });

  // create screen element and add styling
  const sideScreen = document.createElement("div");
  addSideScreenStyling(sideScreen, response.url);

  // add popUp to DOM
  const html = document.getElementsByTagName("html")[0];
  html.appendChild(sideScreen);
};

if (curr_url.includes("www.linkedin.com")) {
  const split_url = curr_url.split("/");
  const user_id = split_url[split_url.lenght - 2];

  // TODO: make popup occur after page is fully loaded maybe
  loadSidePopUp();
  loadSideScreen();
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
