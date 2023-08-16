document.addEventListener("DOMContentLoaded", function() {
    console.log("listeing...")
})

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

const originSelector = document.getElementById("sl");
const translateSelector = document.getElementById("tl");
let languages = Object.keys(langs);
const options = languages.map((language) => {
  return {value:langs[language], label:language}
})
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

// Listen for the "change" event on the select element
originSelector.addEventListener('change', () => {
    const selectedValue = originSelector.value;
    chrome.storage.sync.set({'tool-sl': selectedValue});
});
translateSelector.addEventListener('change', () => {
    const selectedValue = translateSelector.value;
    chrome.storage.sync.set({'tool-tl': selectedValue});
});
