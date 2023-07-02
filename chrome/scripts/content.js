const curr_url = window.location.href;
const generateMessageHttp = "http://127.0.0.1:5000/generate-message";
let user_id;

let sideScreenVisible = false;

// -------------------------------------

// code for loading spinner
function Spinner() {
  Spinner.element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  let c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  Spinner.element.setAttribute("width", "40");
  Spinner.element.setAttribute("height", "40");
  c.setAttribute("viewBox", "0 0 40 40");
  c.setAttribute("cx", "20");
  c.setAttribute("cy", "20");
  c.setAttribute("r", "15");
  c.setAttribute("stroke-width", "4");
  c.setAttribute("stroke", "rgba(255, 91, 26, 1)");
  c.setAttribute("fill", "transparent");
  Spinner.element.appendChild(c);
  //Spinner.element.style.cssText =
  //  "position:absolute;left:calc(50% - 50px);top:calc(50% - 50px)";
  //document.body.appendChild(Spinner.element);
}
Spinner.id = null;
Spinner.element = null;
Spinner.show = function () {
  const c = 264,
    m = 15;
  Spinner.element.style.display = "block";
  move1();
  function move1() {
    let i = 0,
      o = 0;
    move();
    function move() {
      if (i == c) move2();
      else {
        i += 4;
        o += 8;
        Spinner.element.setAttribute("stroke-dasharray", i + " " + (c - i));
        Spinner.element.setAttribute("stroke-dashoffset", o);
        Spinner.id = setTimeout(move, m);
      }
    }
  }
  function move2() {
    let i = c,
      o = c * 2;
    move();
    function move() {
      if (i == 0) move1();
      else {
        i -= 4;
        o += 4;
        Spinner.element.setAttribute("stroke-dasharray", i + " " + (c - i));
        Spinner.element.setAttribute("stroke-dashoffset", o);
        Spinner.id = setTimeout(move, m);
      }
    }
  }
};
Spinner.hide = function () {
  Spinner.element.style.display = "none";
  if (Spinner.id) {
    clearTimeout(Spinner.id);
    Spinner.id = null;
  }
  Spinner.element.setAttribute("stroke-dasharray", "0 264");
  Spinner.element.setAttribute("stroke-dashoffset", "0");
};
Spinner();

const addPopUpStyling = (popUp, logoUrl) => {
  popUp.setAttribute("id", "pop-up");
  popUp.style.background =
    "rgb(255, 91, 26) linear-gradient(180deg, rgba(255, 91, 26, 1) 0%, rgba(255, 153, 0, 1) 100%)";
  popUp.style.borderTopLeftRadius = "10px";
  popUp.style.borderBottomLeftRadius = "10px";
  popUp.style.width = "50px";
  popUp.style.height = "50px";
  popUp.style.position = "absolute";
  popUp.style.left = "-50px";
  popUp.style.top = "20%";
  popUp.style.display = "flex";
  popUp.style.flexDirection = "row";
  popUp.style.justifyContent = "center";
  popUp.style.alignItems = "center";
  popUp.style.cursor = "pointer";
  popUp.style.zIndex = "100";

  const logo = document.createElement("img");
  logo.setAttribute("id", "chatspresso-popup-logo");
  logo.src = logoUrl;
  logo.style.width = "40px";
  logo.style.height = "40px";
  popUp.appendChild(logo);

  // animations
  popUp.style.transition = "height 0.2s, width 0.2s, left 0.2s";
  logo.style.transition = "height 0.2s, width 0.2s";
};

const addSideScreenStyling = (sideScreen, logoUrl, minus_url, copy_url) => {
  sideScreen.setAttribute("id", "chatspresso-side-screen");
  sideScreen.style.width = "250px";
  sideScreen.style.height = "460px";
  sideScreen.style.borderRadius = "10px";
  sideScreen.style.borderWidth = "1px";
  sideScreen.style.borderStyle = "solid";
  sideScreen.style.borderColor = "rgba(255, 91, 26, 1)";
  sideScreen.style.display = "flex";
  sideScreen.style.flexDirection = "column";
  sideScreen.style.alignItems = "center";
  sideScreen.style.position = "relative";
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
  generate_button.setAttribute("id", "chatspresso-generate-button");
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
  generate_text.setAttribute("id", "chatspresso-generate-text");
  generate_text.style.all = "unset";
  generate_text.textContent = "GENERATE";
  generate_text.style.color = "white";
  generate_text.style.fontStyle = "italic";
  generate_text.style.userSelect = "none";
  generate_text.style.transition = "transform 0.2s";
  generate_button.appendChild(generate_text);

  sideScreen.appendChild(generate_button);

  const message_container = document.createElement("div");
  message_container.setAttribute("id", "chatspresso-message-container");
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
  message.setAttribute("id", "chatspresso-message");
  message.type = "text";
  message.style.all = "unset";
  message.style.backgroundColor = "#f5f5f5";
  message.style.marginTop = "5px";
  message.style.resize = "none";
  message.style.fontSize = "15px";
  message.style.lineHeight = "1.3";
  message.rows = "15";
  message.cols = "23";
  message.value = "";
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

const addEventListeners = () => {
  const popUp = document.getElementById("pop-up");
  const logo = document.getElementById("chatspresso-popup-logo");
  const message_container = document.getElementById(
    "chatspresso-message-container"
  );

  popUp.addEventListener("mouseenter", () => {
    popUp.style.width = "55px";
    popUp.style.height = "55px";
    popUp.style.left = "-55px";

    logo.style.width = "45px";
    logo.style.height = "45px";
  });

  popUp.addEventListener("mouseleave", () => {
    popUp.style.width = "50px";
    popUp.style.height = "50px";
    popUp.style.left = "-50px";

    logo.style.width = "40px";
    logo.style.height = "40px";
  });

  popUp.addEventListener("click", () => {
    const extension = document.getElementById("chatspresso-extension");

    if (sideScreenVisible) {
      extension.style.right = "-250px";
      sideScreenVisible = false;
    } else {
      extension.style.right = "0px";
      sideScreenVisible = true;
    }
  });

  const generate_button = document.getElementById(
    "chatspresso-generate-button"
  );
  const generate_text = document.getElementById("chatspresso-generate-text");

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

  generate_button.addEventListener("click", async () => {
    const sideScreen = document.getElementById("chatspresso-side-screen");
    sideScreen.removeChild(generate_button);
    sideScreen.insertBefore(Spinner.element, message_container);
    Spinner.show();

    const message = document.getElementById("chatspresso-message");
    fetch(generateMessageHttp, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.value = data.message;
        } else {
          message.value =
            "I had trouble reading the profile, just click GENERATE to try again!";
        }

        sideScreen.removeChild(Spinner.element);
        sideScreen.insertBefore(generate_button, message_container);
        Spinner.hide();
      })
      .catch((error) => {
        console.error("Error:", error);

        sideScreen.removeChild(Spinner.element);
        sideScreen.insertBefore(generate_button, message_container);
        Spinner.hide();
      });
  });
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

  const body = document.getElementsByTagName("body")[0];

  // create popUp element and add styling
  const popUp = document.createElement("div");
  addPopUpStyling(popUp, response["./images/logowhite1.png"]);

  // create screen element and add styling
  const sideScreen = document.createElement("div");
  addSideScreenStyling(
    sideScreen,
    response["./images/logodark.png"],
    response["./images/reduce_line.png"],
    response["./images/copy.png"]
  );

  sideScreen.appendChild(popUp);

  const extension = document.createElement("section");
  extension.setAttribute("id", "chatspresso-extension");
  extension.style.position = "fixed";
  extension.style.right = "-250px";
  extension.style.top = "20%";
  extension.style.transition = "right 1s";
  extension.style.zIndex = "999";
  extension.appendChild(sideScreen);

  body.appendChild(extension);

  addEventListeners();
};

// -------------------------------------

// check for linkedin page
if (curr_url.includes("www.linkedin.com")) {
  const split_url = curr_url.split("/");
  user_id = split_url[split_url.length - 2];

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

console.log("running");
