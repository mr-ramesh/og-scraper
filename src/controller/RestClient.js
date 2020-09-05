const request = require("request-promise");

class RestClient {
  constructor() {}

  async getCall(url) {
    const options = {
      uri: url,
      method: "GET",
      timeout: 10000,
      gzip: true,
    };
    let resp = await request(options)
      .then((resp) => resp)
      .catchReturn(null);
    return resp;
  }
}

module.exports = RestClient;
