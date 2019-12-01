import * as WebSocket from "ws";

import * as uuid from "uuid/v4";

export default class WSClient {
    id: string;
    wsData: WebSocket;

    /**
     *
     */
    constructor(wsData: WebSocket, id?: string) {
        this.wsData = wsData;

        this.id = id ? id : uuid();
    }
}
