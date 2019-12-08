import * as express from "express";
import * as helmet from "helmet";
import * as http from "http";
import * as WebSocket from "ws";

import WSClientsHandler from "./socket/wsClientsHandler";
import logActiveConnections from "./utils/logActiveConnections";

const expressApp = express();
expressApp.use(helmet());

const server = http.createServer(expressApp);

const wss = new WebSocket.Server({ server });
const wsClientHandler = new WSClientsHandler(wss);

server.listen(process.env.PORT || 80, () => {
  console.log(`Websocket started`);
});

logActiveConnections(wsClientHandler);

// import commandSender from "./commands/commandSender";
// import CommandType from "./commands/abstract/commandType";
// import uuid = require("uuid/v4");

// setInterval(async () => {
//     wsClientHandler.clients.forEach(async client => {
//         console.log(
//             await commandSender(client, {
//                 type: CommandType.node,
//                 command: `console.log(""BATMAN"")`,
//                 commandID: uuid(),
//                 commandOptions: {
//                     cwd: `D:\\`,
//                 },
//             })
//         );
//     });
// }, 5000);
