import * as WebSocket from "ws";
import * as log from "fancy-log";

import Client from "./wsClient";

export default class WebSocketClientsHandler {
    private _activeClients: Client[];

    constructor(wss: WebSocket.Server) {
        this._activeClients = [];

        wss.on("connection", (ws: WebSocket) => {
            const client = new Client(ws);
            this.clients.push(client);

            ws.on("message", (message: string) => {
                const { command, name } = JSON.parse(message);
                if (command == "subscribe") {
                    client.id = name;

                    log(`${name} - connected`);
                }
            });

            ws.on("close", () => {
                log(`connection closed with: ${client.id}`);
                this.clients.splice(this.clients.indexOf(client), 1);
            });
        });
    }

    get clients(): Client[] {
        return this._activeClients;
    }

    private getClientBySocket(ws: WebSocket): Client {
        return this.clients.filter(client => ws == client.wsData)[0];
    }
}
