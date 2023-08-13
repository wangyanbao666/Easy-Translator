console.log("content script loaded");

// global variable
let CTRL_MODIFIER = false;
let display = false;

const fixedDiv = document.createElement("div");
fixedDiv.id = "translate-popup"
fixedDiv.style.position = "fixed";
fixedDiv.style.color = "black"
fixedDiv.style.fontSize = "20px";
fixedDiv.style.top = "20%";
fixedDiv.style.left = "50%"; // Center horizontally
fixedDiv.style.transform = "translateX(-50%)";
fixedDiv.style.width = "600px"
fixedDiv.style.height = "300px"
fixedDiv.style.backgroundColor = "#202124"; // Customize the styling as needed
fixedDiv.style.zIndex = "1000";
fixedDiv.style.display = "none"
fixedDiv.style.flexDirection = "column";
document.body.appendChild(fixedDiv);

// selector region
const selectorRegion = document.createElement("div");
selectorRegion.id = "selector-region"
// language options 
const options = [
  { value: "detect", label: "auto detect" },
  { value: "English", label: "English" },
  { value: "Chinese", label: "Chinese" }
];
  // language to translate selector
const originSelector = document.createElement("select");
    // language translate to selector
const translateSelector = document.createElement("select");
// Loop through the options array and create <option> elements
options.forEach(option => {
  const optionElement = document.createElement("option");
  optionElement.value = option.value;
  optionElement.textContent = option.label;
  originSelector.appendChild(optionElement);
});
options.forEach(option => {
  const optionElement = document.createElement("option");
  optionElement.value = option.value;
  optionElement.textContent = option.label;
  translateSelector.appendChild(optionElement);
});
selectorRegion.appendChild(originSelector)
selectorRegion.appendChild(translateSelector)
fixedDiv.appendChild(selectorRegion);

// style for selector
selectorRegion.style.marginTop = "25px"
selectorRegion.style.display = "flex"
selectorRegion.style.alignItems = "center"
selectorRegion.style.justifyContent = "space-around"
originSelector.style.padding = "5px"
translateSelector.style.padding = "5px"

// text display region
const textRegion = document.createElement("div");
textRegion.id = "text-region";
  // original text
const originText = document.createElement("input");
originText.id = "originText"
originText.type = "text";
originText.placeholder = "Enter Text"
originText.style.width = "40%";
originText.style.height = "100%";
originText.style.borderRadius = "10px";
originText.style.overflowY = "auto"
originText.style.padding = "5px";
originText.style.fontSize = "15px";
  // translated text
const translateText = document.createElement("textarea");
translateText.id = "tranlateText"
translateText.placeholder = "Translate";
translateText.readOnly = "true";
translateText.style.width = "40%";
translateText.style.height = "100%";
translateText.style.borderRadius = "10px";
translateText.style.overflowY = "auto"
translateText.style.padding = "5px";
translateText.style.fontSize = "15px";

textRegion.appendChild(originText)
textRegion.appendChild(translateText)

// style for text 
textRegion.style.marginTop = "20px"
textRegion.style.display = "flex"
textRegion.style.alignItems = "center"
textRegion.style.justifyContent = "space-around"
textRegion.style.height = "60%"
fixedDiv.appendChild(textRegion);



document.addEventListener("keydown", (event) => {
    if (event.key.toLocaleLowerCase() === "control"){
      CTRL_MODIFIER = true;
    }

    if (!display && CTRL_MODIFIER && event.key === "q"){
      fixedDiv.style.display = "flex"
      display = true
    }
})
document.addEventListener("keyup", (event) => {
    if (event.key.toLocaleLowerCase() === "control"){
      CTRL_MODIFIER = false;
    }
})

function getHighlightedText() {
  var selection = window.getSelection();
  if (selection.rangeCount > 0) {
      var range = selection.getRangeAt(0);
      var highlightedText = range.toString();
      return highlightedText;
  }
}

document.addEventListener("mouseup", () => {
  text = getHighlightedText();
  if (text){
    const fixedDiv = document.getElementById("originText");
    fixedDiv.value = text;
    chrome.runtime.sendMessage({highlightedText: text});
  }
});

document.addEventListener("click", (event) => {
  const fixedDiv = document.getElementById("translate-popup");
  if (fixedDiv !== null){
    let target = event.target;
    while (target !== undefined && target !== null && target.id !== "translate-popup"){
      target = target.parentNode;
    }
    if (target === undefined || target === null){
      fixedDiv.style.display = "none";
      display = false
    }
  }
})


  
  
  
  