export function formatDatas(device, action, activity) {
    const header = "$"
    const separator = "@#";
    const arrayData = [header, device, action, activity];
    return arrayData.join(separator);
}

export function getUrlWebsocketServer() {
    const ip = '192.168.1.90';
    const port = '8888';

    return `${ip}:${port}`;
}