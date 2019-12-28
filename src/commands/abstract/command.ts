import CommandType from "./commandType";
import { ExecOptions } from "child_process";

export default interface Command {
    type: CommandType;
    command: string;
    commandID: string;
    commandOptions?: ExecOptions;
}
