import * as helpers from '../../helper';
export default class ActionManager {

    constructor(webSocketConnection) {
        this.webSocketConnection = webSocketConnection;
        this.initElements();
    }

    initElements() {
        this.dryMode = true;
    }

    emit(eventName, device, action, activity) {
        if (this.dryMode) {
            console.log(`Event ${eventName} has been sent to swift application with this information -> Device: ${device}, Action: ${action}, Activity: ${activity}`);
        } else {
            this.webSocketConnection.emit(eventName, helpers.formatDatas(device, action, activity));
        }
    }
}