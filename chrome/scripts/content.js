let intervalId;

const getExperienceData = (container) => {
  // title: parent displayflex
  // working date or location or littleDescription: parent t-14
  // description or skills: parent inline-show-more-text
  let experiences = [];

  for (const li of container) {
    const allData = Array.from(li.querySelectorAll("span"))
      .filter((element) => {
        const classes = element.classList;

        if (
          classes.contains("visually-hidden") ||
          classes.contains("white-space-pre") ||
          classes.contains("t-14") ||
          classes.contains("pvs-entity__path-node")
        ) {
          return false;
        }
        return true;
      })
      .map((element) => {
        return element.innerText;
      });

    experiences.push(allData);
  }

  return experiences;
};
const getEducationData = (container) => {
  let education = [];

  for (const li of container) {
    //console.log(li.querySelectorAll("span"));
    const allData = Array.from(li.querySelectorAll("span"))
      .filter((element) => {
        const classes = element.classList;

        if (
          classes.contains("t-14") ||
          classes.contains("visually-hidden") ||
          classes.contains("white-space-pre")
        ) {
          return false;
        }
        return true;
      })
      .map((element) => element.innerText);

    education.push(allData);
  }

  return education;
};
const getData = () => {
  const fullNameC = document.querySelector("h1");

  const fullName = fullNameC.textContent;

  const positionContainer1 = document.querySelector(
    ".pv-text-details__left-panel"
  );

  const positionContainer2 = positionContainer1.querySelectorAll("div");

  const position = positionContainer2[1].textContent;

  const main = document.querySelector("main");

  let aboutText;
  let experience;
  let education;

  for (const child of main.children) {
    const firstChild = child.firstElementChild.id;

    if (firstChild == "about") {
      aboutText = child.children[2].querySelector("span").innerText;
    } else if (firstChild == "experience") {
      experience = getExperienceData(
        child.children[2].firstElementChild.children
      );
    } else if (firstChild == "education") {
      education = getEducationData(
        child.children[2].firstElementChild.children
      );
    }
  }

  return {
    fullName: fullName,
    position: position,
    about: aboutText,
    experience: experience,
    education: education,
  };
};

const isLoaded = () => {
  try {
    const data = getData();

    console.log(data);
    clearInterval(intervalId);
  } catch (err) {
    console.log("error");
  }
};

intervalId = setInterval(isLoaded, 300);

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

const loadSidePopUp = () => {
  console.log("emotionally triggered");
  const popUp = document.createElement("div");
  popUp.textContent = "CoffeeChat";
  popUp.style.backgroundColor = "blue";
  popUp.style.borderRadius = "5px";

  document.body.appendChild(popUp);
};

// NOTE: I don't think API is needed...
