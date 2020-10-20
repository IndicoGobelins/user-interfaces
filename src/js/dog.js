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
            this.socketClient.emit(EVENT.TEST, helpers.formatDatas(DEVICE.DRONE, ACTION.STANDUP, ACTIVITY.DOG));
        });

        this.searchButton.addEventListener("click", () => {
            console.log("search clicked");
            this.socketClient.emit(EVENT.TEST, helpers.formatDatas(DEVICE.DRONE, ACTION.SEARCH, ACTIVITY.DOG));
        });
    }
}

// Build application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    const App = new Application();
});