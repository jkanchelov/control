import * as WebSocket from "ws";
import Client from "./wsClient";

import CommandSender from "./commandSender";

export default class WebSocketClientsHandler {
    private _activeClients: Client[];

    constructor(wss: WebSocket.Server) {
        this._activeClients = [];

        wss.on("connection", (ws: WebSocket) => {
            //connection is up, let's add a simple simple event
            this.clients.push(new Client(ws));

            ws.on("message", (message: string) => {
                const { command, name } = JSON.parse(message);
                if (command == "subscribe") {
                    this.getClientBySocket(ws).id = name;

                    // DEBUG
                    // REMOVE
                    const handle = setInterval(() => {
                        const target = this.getClientBySocket(ws);
                        if (target) {
                            new CommandSender(this.getClientBySocket(target.wsData));
                        } else {
                            clearInterval(handle);
                        }
                    }, 5000);
                }
            });

            ws.on("close", () => {
                this.clients.splice(this.clients.indexOf(this.getClientBySocket(ws)), 1);
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
