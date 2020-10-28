export function formatDatas(device, action, activity) {
    const header = "$"
    const separator = "@#";
    const arrayData = [header, device, action, activity];
    return arrayData.join(separator);
}

export function getUrlWebsocketServer() {
    const ip = '169.254.96.9';
    const port = '8888';

    return `${ip}:${port}`;
}