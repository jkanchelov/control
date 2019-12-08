import CommandResponse from "./abstract/commandResponse";
import Command from "./abstract/command";
import WSClient from "../socket/wsClient";

export default (
  wsClient: WSClient,
  { command, type, commandID, commandOptions }: Command
): Promise<CommandResponse> => {
  let responseData: CommandResponse;

  const handleResponse = (message: string): void => {
    responseData = JSON.parse(message);

    if (responseData.commandID == commandID) {
      wsClient.ws.off("message", handleResponse);
      wsClient = null;
    }
  };

  wsClient.ws.on("message", handleResponse);
  wsClient.ws.send(
    JSON.stringify({
      type,
      command,
      commandID,
      commandOptions,
    })
  );

  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (responseData) {
        clearInterval(interval);
        resolve(responseData);
      }
    }, 1000);
  });
};
