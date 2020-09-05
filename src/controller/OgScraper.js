const express = require("express");
const OgScraper = express.Router();

const RestClient = require("./RestClient");
const client = new RestClient();

const Util = require("../util");
const Scrapper = Util.Scrapper;

OgScraper.get("/scrap", async (req, res) => {
  let url = req.query.url;
  let scrapResp = await doScraping(url);
  res.status(scrapResp.status).json(scrapResp.data);
});

OgScraper.post("/scrap", async (req, res) => {
  let url = req.body.url;
  let scrapResp = await doScraping(url);
  res.status(scrapResp.status).json(scrapResp.data);
});

const doScraping = async (url) => {
  let webPage = await client.getCall(url);
  if (webPage) {
    let scrapedData = Scrapper.scrapData(webPage);
    return { status: 200, data: scrapedData };
  } else {
    return { status: 404, data: { message: "Resource not avilable!" } };
  }
};

module.exports = OgScraper;
