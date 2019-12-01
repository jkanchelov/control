import CommandResponse from "./abstract/commandResponse";
import Command from "./abstract/command";
import WSClient from "./wsClient";

export default async (
    ws: WSClient,
    { command, type, commandID, commandOptions }: Command
): Promise<CommandResponse> => {
    let responseData: CommandResponse;
    ws.wsData.on("message", handleResponse);
    ws.wsData.send(
        JSON.stringify({
            type,
            command,
            commandID,
            commandOptions,
        })
    );

    return await new Promise((resolve, reject) => {
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
            ws.wsData.off("message", handleResponse);
            ws = null;
        }
    }
};
