import * as WebSocket from "ws";

import * as uuid from "uuid/v4";

export default class WSClient {
    id: string;
    ws: WebSocket;

    isAlive: boolean;
    /**
     *
     */
    constructor(ws: WebSocket, id?: string) {
        this.ws = ws;

        this.id = id ? id : uuid();

        this.isAlive = true;

        ws.on("pong", this.heartbeat);
    }

    heartbeat = () => {
        this.isAlive = true;
    };

    dispose = () => {
        this.ws.off("pong", this.heartbeat);
        this.ws = null;
    };
}
