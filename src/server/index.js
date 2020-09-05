const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const RESP_404 =
  "<body style='background: lightgreen'> <div style='position: absolute;top: 25%;left: 25%;' > " +
  "<h3 style = 'color: teal'> We're under contructions now! You are welcome in future, Thank you for your visit </h3> </div> </body>";

class server {
  constructor(config) {
    this.config = config;
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
  }

  init() {
    startServer(this.config.port);
  }

  addRoutes(prefix, router) {
    if (prefix) app.use(prefix, router);
    else app.use(router);
  }
}

function startServer(port) {
  addDefaultRoute();
  app.listen(port, () =>
    console.log(
      `Server started with port ${port}, Go to http://localhost:${port}`
    )
  );
}

function addDefaultRoute() {
  app.get("*", (req, res) => {
    res.status(404).send(RESP_404);
  });
}

module.exports = server;
