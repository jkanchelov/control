export default interface CommandResponse {
    stdout: string;
    stderr: string;
    error: string;
    commandID: string;
}
