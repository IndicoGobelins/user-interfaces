export function formatDatas(device, action, activity) {
    const header = "$"
    const separator = "@#";
    const arrayData = [header, device, action, activity];
    return arrayData.join(separator);
}