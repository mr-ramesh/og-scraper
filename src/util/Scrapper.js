const cheerio = require("cheerio");

const domElements = {
  title: ['meta[property="og:title"]', "head title"],
  type: ['meta[property="og:type"]'],
  description: [
    'meta[property="og:description"]',
    'meta[name="description" i]',
  ],
  keywords: ['meta[property="og:keywords"]', 'meta[name="keywords"]'],
  image: ['meta[property="og:image"]', "img > "],
};

let doc = null;

class Scrapper {
  constructor() {}

  static scrapData(webPage) {
    doc = cheerio.load(webPage);
    let result = {};
    Object.keys(domElements).forEach((ele) => {
      if (ele === "image") {
        result[ele] = getImages(domElements[ele]);
      } else {
        result[ele] = getValue(domElements[ele]);
      }
    });
    return result;
  }
}

function getValue(fields) {
  let data = doc(fields[0]).attr("content");
  if (!data) {
    data = doc(fields[1]).attr("content");
  }
  return data;
}

function getImages(fields) {
  let data = doc(fields[0]).attr("contentss");
  if (!data) {
    data = doc(fields[1]);
    console.log(`All images : ${data}`);
    try {
      let arr = [];
      data.forEach(e => {
        console.log(`images : ${e}`);
        arr.push(doc(e).attr('src'));
      });
      data = arr;
    } catch (err) {
      console.error("err :", err);
      data = doc(data).attr('src')
    }
  }
  return data;
}

module.exports = Scrapper;
