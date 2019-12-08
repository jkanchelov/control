import WebSocketClientsHandler from "../socket/wsClientsHandler";

export default (wsClientHandler: WebSocketClientsHandler): void => {
  setInterval(() => {
    console.log("");
    console.log(`--------------------------`);

    wsClientHandler.clients.forEach(client => {
      console.log(`${client.id}`);
    });

    if (wsClientHandler.clients.length == 0) {
      console.log("no active connections");
    }

    console.log(`--------------------------`);
  }, 10000);
};
