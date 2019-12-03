import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import * as bodyParser from "body-parser";

import WSClientsHandler from "./models/wsClientsHandler";
import logActiveConnections from "./utils/logActiveConnections";

const expressApp = express();
expressApp.use(bodyParser);

const server = http.createServer(expressApp);

const wss = new WebSocket.Server({ server, port: 8080 });
const wsClientHandler = new WSClientsHandler(wss);

server.listen(process.env.PORT || 8999, () => {
    console.log(`Websocket started`);
});

logActiveConnections(wsClientHandler);

/*
import commandSender from "./models/commandSender";
import CommandType from "./models/abstract/commandType";
import uuid = require("uuid/v4");

setInterval(async () => {
    wsClientHandler.clients.forEach(async client => {
        console.log(
            await commandSender(client, {
                type: CommandType.shell,
                command: "dir",
                commandID: uuid(),
                commandOptions: {
                    cwd: `C:\\`,
                },
            })
        );
    });
}, 5000);
*/
