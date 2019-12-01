import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import * as bodyParser from "body-parser";

import WSClientsHandler from "./models/wsClientsHandler";
import logActiveConnections from "./utils/logActiveConnections";
import CommandSender from "./models/commandSender";

const expressApp = express();
expressApp.use(bodyParser);

const server = http.createServer(expressApp);

const wss = new WebSocket.Server({ server, port: 8080 });
const wsClientHandler = new WSClientsHandler(wss);

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Websocket started`);
});

// logActiveConnections(wsClientHandler);
