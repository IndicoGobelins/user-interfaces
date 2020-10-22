export function formatDatas(device, action, activity) {
    const header = "$"
    const separator = "@#";
    const arrayData = [header, device, action, activity];
    return arrayData.join(separator);
}

export function getUrlWebsocketServer() {
    const ip = '172.17.128.153';
    const port = '8888';

    return `${ip}:${port}`;
}