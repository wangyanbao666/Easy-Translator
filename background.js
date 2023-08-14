chrome.runtime.onInstalled.addListener(function() {
    console.log('Extension installed');
  });

  // Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.text !== undefined && message.text !== "") {
    translate(message.sl, message.tl, message.text).then((data) => {
      console.log(data);
      sendResponse({data:data});
    });
    return true;
  }
  return false;
});

// import axios from "axios";


async function translate(sl, tl, text) {
    const payload = {
        "sl": sl,
        "tl": tl,
        "q": text,
        "client": "gtx"
    }
    // const url = `https://clients5.google.com/translate_a/t?client=${payload.client}&sl=${payload.sl}&tl=${payload.tl}&q=${payload.q}`
    const url = `https://translate.googleapis.com/translate_a/single?dt=t&client=${payload.client}&sl=${payload.sl}&tl=${payload.tl}&q=${payload.q}`

    const response = await fetch(url, {
        method: 'GET',
        // mode: 'no-cors',
    })

    if (response.ok){
        const data = await response.json();
        let sentence = ""
        data[0].forEach(element => {
          sentence+=element[0]
        });
        return sentence
    }

    // return response.data[0];
}