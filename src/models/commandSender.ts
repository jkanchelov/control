import * as WebSocket from "ws";
import * as log from "fancy-log";
import * as uuid from "uuid/v4";

import WSClient from "./wsClient";

export default class CommandSender {
    /**
     *
     */
    private messageID: string;
    private ws: WSClient;

    private listenerFunction;

    constructor(ws: WSClient) {
        this.ws = ws;

        this.messageID = uuid();

        this.listenerFunction = this.handleResponse.bind(this);
        ws.wsData.on("message", this.listenerFunction);

        // TODO
        log("Sending command..");
        ws.wsData.send(
            JSON.stringify({
                type: "node",
                command: `const username = require('os').userInfo().username;console.log(username)`,
                commandID: this.messageID,
            })
        );
    }

    private handleResponse(message) {
        const data = JSON.parse(message);

        if (data.commandID == this.messageID) {
            log("Response received\n", data.stdout, data.stderr);

            this.ws.wsData.off("message", this.listenerFunction);
            this.ws = null;
        }
    }
}
