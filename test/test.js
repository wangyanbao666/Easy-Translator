const axios = require("axios");
const cheerio = require("cheerio");

const payload = {
    "sl": "auto",
    "tl": "zh-CN",
    "q": "give me a chance",
    "client": "dict-chrome-ex"
}


axios({
    method: "get",
    url: `https://clients5.google.com/translate_a/t?client=${payload.client}&sl=${payload.sl}&tl=${payload.tl}&q=${payload.q}`,
    // data: new URLSearchParams(payload),
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Optional: Set other headers if needed
    }
})
.then(function(response) {
    console.log(response.data[0])
})
