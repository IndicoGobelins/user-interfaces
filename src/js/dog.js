import io from 'socket.io-client'
import {ACTION, ACTIVITY, DEVICE, EVENT} from './constants'
import * as helpers from './helper'

/**
 * This class is main class for dog activity interface
 */
class Application {

    // CONSTRUCTOR
    constructor() {
        this._initElements();
        this._initWebSocketConnection();
    }

    // INITIALIZERS
    _initElements() {
        this.standUpButton = document.getElementById('standupButton');
        this.searchButton = document.getElementById('searchButton');
        this.goBackButton = document.getElementById('gobackButton');
        this.sitDownButton = document.getElementById('sitdownButton');
        this.socketClient = io(helpers.getUrlWebsocketServer());
    }

    _initWebSocketConnection() {
        this.socketClient.on('connect', () => {
            this._initButtonsEvents()
        });
    }

    // EVENTS HANDLER
    _initButtonsEvents() {
        this.standUpButton.addEventListener('click', () => {
            console.log("standup clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.DRONE, ACTION.STANDUP, ACTIVITY.DOG));
        });

        this.searchButton.addEventListener("click", () => {
            console.log("search clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.DRONE, ACTION.SEARCH, ACTIVITY.DOG));
        });

        this.goBackButton.addEventListener("click", () => {
            console.log("go back clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.DRONE, ACTION.GOBACK, ACTIVITY.DOG));
        });

        this.sitDownButton.addEventListener("click", () => {
            console.log("sit down clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.DRONE, ACTION.SITDOWN, ACTIVITY.DOG));
        });
    }
}

// Build application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    const App = new Application();
});