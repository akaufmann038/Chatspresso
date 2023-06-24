const curr_url = window.location.href;

// -------------------------------------

const addPopUpStyling = (popUp, logoUrl) => {
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
  popUp.style.zIndex = "100";

  const logo = document.createElement("img");
  logo.src = logoUrl;
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
};

const addSideScreenStyling = (sideScreen, logoUrl, minus_url, copy_url) => {
  sideScreen.style.width = "250px";
  sideScreen.style.height = "460px";
  sideScreen.style.borderRadius = "10px";
  sideScreen.style.borderWidth = "1px";
  sideScreen.style.borderStyle = "solid";
  sideScreen.style.borderColor = "rgba(255, 91, 26, 1)";
  sideScreen.style.display = "flex";
  sideScreen.style.flexDirection = "column";
  sideScreen.style.alignItems = "center";
  sideScreen.style.position = "absolute";
  sideScreen.style.right = "0";
  sideScreen.style.top = "30%";
  sideScreen.style.zIndex = "100";
  sideScreen.style.background = "white";

  const minusContainer = document.createElement("div");
  minusContainer.style.display = "flex";
  minusContainer.style.alignItems = "center";
  minusContainer.style.justifyContent = "center";
  minusContainer.style.alignSelf = "flex-end";
  minusContainer.style.width = "20px";
  minusContainer.style.height = "20px";
  minusContainer.style.cursor = "pointer";
  minusContainer.style.marginTop = "10px";
  minusContainer.style.marginRight = "10px";

  const minus = document.createElement("img");
  minus.src = minus_url;
  minus.style.width = "15px";
  minus.style.height = "3px";

  minusContainer.appendChild(minus);
  sideScreen.appendChild(minusContainer);

  const logo = document.createElement("img");
  logo.src = logoUrl;
  logo.style.height = "200px";
  logo.style.width = "200px";
  logo.style.marginTop = "-80px";
  logo.style.marginBottom = "-45px";

  sideScreen.appendChild(logo);

  const generate_button = document.createElement("div");
  generate_button.style.width = "120px";
  generate_button.style.height = "40px";
  generate_button.style.background =
    "rgb(255, 91, 26) linear-gradient(180deg, rgba(255, 91, 26, 1) 0%, rgba(255, 153, 0, 1) 100%)";
  generate_button.style.display = "flex";
  generate_button.style.justifyContent = "center";
  generate_button.style.alignItems = "center";
  generate_button.style.borderRadius = "999px";
  generate_button.style.cursor = "pointer";
  generate_button.style.boxShadow = "7px 6px 28px 1px rgba(0, 0, 0, 0.24)";
  generate_button.style.transition = "box-shadow 0.2s, transform 0.2s";

  const generate_text = document.createElement("a");
  generate_text.style.all = "unset";
  generate_text.textContent = "GENERATE";
  generate_text.style.color = "white";
  generate_text.style.fontStyle = "italic";
  generate_text.style.userSelect = "none";
  generate_text.style.transition = "transform 0.2s";
  generate_button.appendChild(generate_text);

  generate_button.addEventListener("mousedown", () => {
    generate_button.style.boxShadow = "3px 2px 22px 1px rgba(0, 0, 0, 0.24)";
    generate_button.style.transform = "scale(0.90)";
    generate_text.style.transform = "scale(0.9)";
  });

  generate_button.addEventListener("mouseup", () => {
    generate_button.style.boxShadow = "7px 6px 28px 1px rgba(0, 0, 0, 0.24)";
    generate_button.style.transform = "scale(1)";
    generate_text.style.transform = "scale(1)";
  });

  sideScreen.appendChild(generate_button);

  const message_container = document.createElement("div");
  message_container.style.marginTop = "35px";
  message_container.style.background = "#f5f5f5";
  message_container.style.display = "flex";
  message_container.style.flexDirection = "column";
  message_container.style.alignItems = "center";
  message_container.style.width = "90%";
  message_container.style.height = "55%";
  message_container.style.borderRadius = "10px";
  message_container.style.border = "none";
  message_container.style.outline = "none";
  message_container.style.position = "relative";

  const message = document.createElement("textarea");
  message.type = "text";
  message.style.all = "unset";
  message.style.backgroundColor = "#f5f5f5";
  message.style.marginTop = "5px";
  message.style.resize = "none";
  message.style.fontSize = "15px";
  message.style.lineHeight = "1.3";
  message.rows = "15";
  message.cols = "23";
  message.value =
    "This is a message to your linkedin profile. Want to connect?";
  message_container.appendChild(message);

  const copy_container = document.createElement("div");
  copy_container.style.display = "flex";
  copy_container.style.flexDirection = "column";
  copy_container.style.background = "#f5f5f5";
  copy_container.style.alignItems = "center";
  copy_container.style.position = "absolute";
  copy_container.style.zIndex = "2";
  copy_container.style.right = "0";
  copy_container.style.bottom = "0";
  copy_container.style.marginRight = "5px";
  copy_container.style.marginBottom = "5px";

  const copy_text = document.createElement("a");
  copy_text.style.all = "unset";
  copy_text.textContent = "Copy";
  copy_text.style.fontSize = "10px";
  copy_text.style.color = "rgba(255, 91, 26, 1)";
  copy_text.style.marginBottom = "3px";
  copy_container.appendChild(copy_text);

  const copy_button = document.createElement("img");
  copy_button.src = copy_url;
  copy_button.style.width = "20px";
  copy_button.style.height = "20px";
  copy_button.style.cursor = "pointer";
  copy_container.appendChild(copy_button);
  message_container.appendChild(copy_container);

  sideScreen.appendChild(message_container);
};

const loadExtension = async () => {
  // get image assets
  const response = await chrome.runtime.sendMessage({
    message: "get_image_url",
    image_urls: [
      "./images/reduce_line.png",
      "./images/logowhite1.png",
      "./images/logodark.png",
      "./images/copy.png",
    ],
  });

  // create popUp element and add styling
  const popUp = document.createElement("div");
  addPopUpStyling(popUp, response["./images/logowhite1.png"]);

  // add popUp to DOM
  const body = document.getElementsByTagName("body")[0];
  body.appendChild(popUp);

  // create screen element and add styling
  const sideScreen = document.createElement("div");
  addSideScreenStyling(
    sideScreen,
    response["./images/logodark.png"],
    response["./images/reduce_line.png"],
    response["./images/copy.png"]
  );

  // add sideScreen to dom
  body.appendChild(sideScreen);
};

// -------------------------------------

// check for linkedin page
if (curr_url.includes("www.linkedin.com")) {
  const split_url = curr_url.split("/");
  const user_id = split_url[split_url.length - 2];

  // TODO: make popup occur after page is fully loaded maybe -
  // look at other extensions as examples
  loadExtension();
} else {
  console.log("not a linkedin profile");
}

// fetch example
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
