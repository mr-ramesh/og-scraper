const fs = require('fs');
const ini = require('ini');

const envConfig = ini.parse(fs.readFileSync('./config/environment.ini', 'utf8'));
const config = ini.parse(fs.readFileSync(`./config/${envConfig.env.current}.ini`, 'utf8'))

const Server = require('./src/server');
const server = new Server(config.server);

const Controller = require('./src/controller');
const OgScraper = Controller.OgScraper;

server.addRoutes(null, OgScraper);
server.init();