console.log("content script loaded1");

// import translate from "./translator.js";

console.log("content script loaded2");


// global variable
let CTRL_MODIFIER = false;
let SHIFT_MODIFIER = false;
let display = false;
let pin = false;

// languages
const langs = {
  Afrikaans: "af",
  Albanian: "sq",
  Amharic: "am",
  Arabic: "ar",
  Armenian: "hy",
  Azerbaijani: "az",
  Basque: "eu",
  Belarusian: "be",
  Bengali: "bn",
  Bosnian: "bs",
  Bulgarian: "bg",
  Catalan: "ca",
  Cebuano: "ceb",
  Chichewa: "ny",
  "Chinese Simplified": "zh-cn",
  "Chinese Traditional": "zh-tw",
  Corsican: "co",
  Croatian: "hr",
  Czech: "cs",
  Danish: "da",
  Dutch: "nl",
  English: "en",
  Esperanto: "eo",
  Estonian: "et",
  Filipino: "tl",
  Finnish: "fi",
  French: "fr",
  Frisian: "fy",
  Galician: "gl",
  Georgian: "ka",
  German: "de",
  Greek: "el",
  Gujarati: "gu",
  "Haitian Creole": "ht",
  Hausa: "ha",
  Hawaiian: "haw",
  Hebrew: "iw",
  Hindi: "hi",
  Hmong: "hmn",
  Hungarian: "hu",
  Icelandic: "is",
  Igbo: "ig",
  Indonesian: "id",
  Irish: "ga",
  Italian: "it",
  Japanese: "ja",
  Javanese: "jw",
  Kannada: "kn",
  Kazakh: "kk",
  Khmer: "km",
  Korean: "ko",
  "Kurdish (Kurmanji)": "ku",
  Kyrgyz: "ky",
  Lao: "lo",
  Latin: "la",
  Latvian: "lv",
  Lithuanian: "lt",
  Luxembourgish: "lb",
  Macedonian: "mk",
  Malagasy: "mg",
  Malay: "ms",
  Malayalam: "ml",
  Maltese: "mt",
  Maori: "mi",
  Marathi: "mr",
  Mongolian: "mn",
  "Myanmar (Burmese)": "my",
  Nepali: "ne",
  Norwegian: "no",
  Pashto: "ps",
  Persian: "fa",
  Polish: "pl",
  Portuguese: "pt",
  Punjabi: "pa",
  Romanian: "ro",
  Russian: "ru",
  Samoan: "sm",
  "Scots Gaelic": "gd",
  Serbian: "sr",
  Sesotho: "st",
  Shona: "sn",
  Sindhi: "sd",
  Sinhala: "si",
  Slovak: "sk",
  Slovenian: "sl",
  Somali: "so",
  Spanish: "es",
  Sundanese: "su",
  Swahili: "sw",
  Swedish: "sv",
  Tajik: "tg",
  Tamil: "ta",
  Telugu: "te",
  Thai: "th",
  Turkish: "tr",
  Ukrainian: "uk",
  Urdu: "ur",
  Uyghur: "ug",
  Uzbek: "uz",
  Vietnamese: "vi",
  Welsh: "cy",
  Xhosa: "xh",
  Yiddish: "yi",
  Yoruba: "yo",
  Zulu: "zu"
};

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
fixedDiv.style.zIndex = "100000";
fixedDiv.style.display = "none"
fixedDiv.style.flexDirection = "column";
fixedDiv.style.borderRadius = "15px"
document.body.appendChild(fixedDiv);


// header
const header = document.createElement("div");
header.style.cursor = "move";
header.style.zIndex = "100001"
header.style.backgroundColor = "#0288d1"
header.style.height = "25px";
header.style.width = "100%";
header.style.display = "flex"
header.style.alignItems = "center"
header.style.justifyContent = "flex-end"


// pin icon
const pinDiv = document.createElement("div");
const pinImg = document.createElement("img");
pinImg.src = chrome.runtime.getURL("images/pin.png");
pinImg.style.height = "17px";
pinDiv.style.width = "fit-content";
pinDiv.style.display = "flex";
pinDiv.style.alignItems = "center";
pinDiv.style.justifyContent = "center";
pinDiv.style.cursor = "pointer"
pinDiv.style.height = "100%"
pinDiv.style.width = "25px"
pinDiv.addEventListener("mouseover", () => {
  if (!pin){
    pinDiv.style.backgroundColor = "#4d90e8"
  }
})
pinDiv.addEventListener("mouseout", () => {
  if (!pin){
    pinDiv.style.backgroundColor = ""
  }
})
pinDiv.addEventListener("click", ()=>{
  pin = !pin;
  if (pin){
    pinDiv.style.backgroundColor = "#0a27a6"
  }
  else {
    pinDiv.style.backgroundColor = ""
  }
})
pinDiv.appendChild(pinImg);
header.appendChild(pinDiv);

// close icon
const closeDiv = document.createElement("div");
const closeImg = document.createElement("img");
closeImg.src = chrome.runtime.getURL("images/close.png");
closeImg.style.height = "17px";
closeDiv.style.width = "fit-content";
closeDiv.style.display = "flex";
closeDiv.style.alignItems = "center";
closeDiv.style.justifyContent = "center";
closeDiv.style.cursor = "pointer"
closeDiv.style.height = "100%"
closeDiv.style.width = "25px"
closeDiv.addEventListener("mouseover", () => {
  closeDiv.style.backgroundColor = "red"
})
closeDiv.addEventListener("mouseout", () => {
  closeDiv.style.backgroundColor = ""
})
closeDiv.addEventListener("click", () => {
  display = false;
  fixedDiv.style.display = "none";
})
closeDiv.appendChild(closeImg);
header.appendChild(closeDiv);

fixedDiv.appendChild(header);


// selector region
const selectorRegion = document.createElement("div");
selectorRegion.id = "selector-region"
// language options 
let languages = Object.keys(langs);
const options = languages.map((language) => {
  return {value:langs[language], label:language}
})


// language to translate selector
const originSelector = document.createElement("select");
    // language translate to selector
const translateSelector = document.createElement("select");
// Loop through the options array and create <option> elements
const autoOptionElement = document.createElement("option");
autoOptionElement.value = "auto";
autoOptionElement.textContent = "Auto Detect";
originSelector.appendChild(autoOptionElement)
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
originSelector.style.borderRadius = "5px";
originSelector.style.cssText = "background-color: #343536 !important";
originSelector.style.width= "130px";
originSelector.style.color = "white";
originSelector.style.padding = "5px"
originSelector.style.fontSize = "13.3333px"
originSelector.style.fontWeight = "400"
originSelector.style.fontStretch = "100%"
originSelector.style.fontFamily = "Arial"
originSelector.style.lineHeight = "17px"
originSelector.style.border = "1px solid white"
originSelector.style.borderRadius = "5px"
originSelector.style.height= "30px"
originSelector.style.display= "block"

translateSelector.style.borderRadius = "5px";
translateSelector.style.cssText = "background-color: #343536 !important";
translateSelector.style.color = "white";
translateSelector.style.width= "130px";
translateSelector.style.padding = "5px"
translateSelector.style.fontSize = "13.3333px"
translateSelector.style.fontWeight = "400"
translateSelector.style.fontStretch = "100%"
translateSelector.style.fontFamily = "Arial"
translateSelector.style.lineHeight = "17px"
translateSelector.style.border = "1px solid white"
translateSelector.style.borderRadius = "5px"
translateSelector.style.height= "30px"
translateSelector.style.display= "block"

selectorRegion.style.marginTop = "25px";
selectorRegion.style.display = "flex";
selectorRegion.style.alignItems = "center";
selectorRegion.style.justifyContent = "space-around";
originSelector.style.padding = "5px";
translateSelector.style.padding = "5px";


chrome.storage.sync.get('tool-sl', (data) => {
  console.log(data);
  if (data["tool-sl"]) {
      originSelector.value = data["tool-sl"];
  }
});
chrome.storage.sync.get('tool-tl', (data) => {
  console.log(data);
  if (data["tool-tl"]) {
      translateSelector.value = data["tool-tl"];
  }
  else {
      translateSelector.value = "en"
  }
});

// text display region
const textRegion = document.createElement("div");
textRegion.id = "text-region";
  // original text
const originText = document.createElement("textarea");
originText.id = "originText";
originText.placeholder = "Enter Text";
originText.style.width = "40%";
originText.style.height = "100%";
originText.style.borderRadius = "10px";
originText.style.overflowY = "auto";
originText.style.padding = "5px";
originText.style.fontSize = "15px";
originText.style.backgroundColor = "white"
originText.style.color = "black"
originText.style.fontFamily= "monospace"
originText.style.fontSize= "15px"
originText.style.fontStretch= "100%"
originText.addEventListener("keydown", (event)=>{
  // console.log(event.key)
  if (event.key !== undefined && event.key.toLocaleLowerCase() === "enter"){
    if (!SHIFT_MODIFIER){
      event.preventDefault();
      const text = originText.value;
      translate(text)
    }
  }
})

  // translated text
const translateText = document.createElement("textarea");
translateText.id = "tranlateText";
translateText.placeholder = "Translate";
translateText.readOnly = "true";
translateText.style.width = "40%";
translateText.style.height = "100%";
translateText.style.borderRadius = "10px";
translateText.style.overflowY = "auto";
translateText.style.padding = "5px";
translateText.style.fontSize = "15px";
translateText.style.backgroundColor = "white"
translateText.style.color = "black"
translateText.style.fontFamily= "monospace"
translateText.style.fontSize= "15px"
translateText.style.fontStretch= "100%"

textRegion.appendChild(originText);
textRegion.appendChild(translateText);

// style for text 
textRegion.style.marginTop = "20px";
textRegion.style.display = "flex";
textRegion.style.alignItems = "center";
textRegion.style.justifyContent = "space-around";
textRegion.style.height = "60%";
fixedDiv.appendChild(textRegion);



document.addEventListener("keydown", (event) => {
    if (event.key !== undefined && event.key.toLocaleLowerCase() === "control"){
      CTRL_MODIFIER = true;
    }
    else if (event.key !== undefined && event.key.toLocaleLowerCase() === "shift"){
      SHIFT_MODIFIER = true;
    }
    else if (!display && CTRL_MODIFIER && event.key === "q"){
      fixedDiv.style.display = "flex";
      display = true;
      const text = getHighlightedText();
      translate(text);
    }
})

function translate(text){
  if (text !== undefined && text !== "" && text !== null){
    const fixedDiv = document.getElementById("originText");
    fixedDiv.value = text;
    if (display){
      const sl = originSelector.value;
      const tl = translateSelector.value;
      messageBody = {
        sl: sl,
        tl: tl,
        text: text
      }
      translateText.value = "please wait for translation..."
      chrome.runtime.sendMessage(messageBody, function(res){
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        console.log(res.data)
        translateText.value = res.data;
      });
    }
  }
}

document.addEventListener("keyup", (event) => {
    if (event.key !== undefined && event.key.toLocaleLowerCase() === "control"){
      CTRL_MODIFIER = false;
    }
    else if (event.key !== undefined && event.key.toLocaleLowerCase() === "shift"){
      SHIFT_MODIFIER = false;
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


document.addEventListener("click", (event) => {
  if (pin){
    return;
  }
  let target = event.target;
  console.log(target.id);
  while (target !== undefined && target !== null && target.id !== "translate-popup"){
    target = target.parentNode;
  }
  if (target === undefined || target === null){
    fixedDiv.style.display = "none";
    display = false;
  }
})


// Make the DIV element draggable:
dragElement(fixedDiv);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (header) {
    // if present, the header is where you move the DIV from:
    header.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


  
  
  
  