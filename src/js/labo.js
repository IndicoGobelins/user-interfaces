import io from "socket.io-client";
import * as helpers from "./helper";
import {ACTION, ACTIVITY, DEVICE, EVENT} from "./constants";

class Application {
    constructor() {
        this._initElements();
        this._initWebSocketConnection();
    }

    _initElements() {
        this.launchButton = document.getElementById('launchButton');
        this.loadBar = document.getElementById('loadBar');
        this.socketClient = io(helpers.getUrlWebsocketServer());
        this.LOADING_DURATION = 20000;
        this.loadingTimer = null;
    }

    _initWebSocketConnection() {
        this.socketClient.on('connect', () => {
            this._initButtonsEvents()
        });
    }

    _initButtonsEvents() {
        this.launchButton.addEventListener('click', () => {
            console.log('click on launchButton');
            this._startLoading();
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.NONE, ACTION.START, ACTIVITY.LABO_ACTIVITY));
        });
    }

    _startLoading() {
        this._hideLaunchButton();
        const delay = 1000;
        const frameWidth = 100 * delay / this.LOADING_DURATION;
        let width = 0;

        this.loadingTimer = setInterval(() => {
            width += frameWidth;
            console.log('width -> ', width);
            this.loadBar.style.width = `${width}%`;

            if (width >= 100) {
                clearInterval(this.loadingTimer);

                setInterval(() => {
                    this.loadBar.style.backgroundColor = 'green';
                }, delay);
            }

        }, delay);
    }

    _hideLaunchButton() {
        this.launchButton.style.display = 'none';
    }
}

// Build application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    const App = new Application();
    console.log("coucou")
});