import CommandResponse from "./abstract/commandResponse";
import Command from "./abstract/command";
import WSClient from "../socket/wsClient";

export default (
    wsClient: WSClient,
    { command, type, commandID, commandOptions }: Command
): Promise<CommandResponse> => {
    let responseData: CommandResponse;
    wsClient.ws.on("message", handleResponse);
    wsClient.ws.send(
        JSON.stringify({
            type,
            command,
            commandID,
            commandOptions,
        })
    );

    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (responseData) {
                clearInterval(interval);
                resolve(responseData);
            }
        }, 1000);
    });

    function handleResponse(message: string) {
        responseData = JSON.parse(message);

        if (responseData.commandID == commandID) {
            wsClient.ws.off("message", handleResponse);
            wsClient = null;
        }
    }
};
