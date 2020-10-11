import io from "socket.io-client";
import * as helpers from "./helper";
import {ACTION, ACTIVITY, DEVICE, EVENT} from "./constants";

class Application {

    // CONSTRUCTOR
    constructor() {
        this._initElements();
        this._initWebSocketConnection();
    }

    // INITIALIZERS
    _initElements() {
        this.forwardButton = document.getElementById('forward');
        this.backwardButton = document.getElementById('backward');
        this.leftButton = document.getElementById('left');
        this.rightButton = document.getElementById('right');
        this.collectButton = document.getElementById('collect');
        this.socketClient = io(helpers.getUrlWebsocketServer());
        this.hasKeyPressed = false
    }

    _initWebSocketConnection() {
        this.socketClient.on('connect', () => {
            this._initButtonsEvents();
            this._initFunDirection();
        });
    }

    // EVENTS HANDLER
    _initButtonsEvents() {
        this.forwardButton.addEventListener('click', () => {
            console.log("forward clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.SPHERO1, ACTION.FORWARD, ACTIVITY.CLUE));
        });

        this.backwardButton.addEventListener("click", () => {
            console.log("backward clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.SPHERO1, ACTION.BACKWARD, ACTIVITY.CLUE));
        });

        this.leftButton.addEventListener("click", () => {
            console.log("left clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.SPHERO1, ACTION.LEFT, ACTIVITY.CLUE));
        });

        this.rightButton.addEventListener("click", () => {
            console.log("right clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.SPHERO1, ACTION.RIGHT, ACTIVITY.CLUE));
        });

        this.collectButton.addEventListener("click", () => {
            console.log("collect clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.SPHERO1, ACTION.COLLECT, ACTIVITY.CLUE));
        });
    }

    _initFunDirection() {
        document.addEventListener('keydown', event => {
            if (!this.hasKeyPressed) {
                switch (event.code) {
                    case 'ArrowUp':
                        console.log('press up arrow key');
                        this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.SPHERO1, ACTION.FORWARD, ACTIVITY.CLUE));
                        break;
                    case 'ArrowDown':
                        console.log('press down arrow key');
                        this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.SPHERO1, ACTION.BACKWARD, ACTIVITY.CLUE));
                        break;
                    case 'ArrowRight':
                        console.log('press right arrow key');
                        this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.SPHERO1, ACTION.RIGHT, ACTIVITY.CLUE));
                        break;
                    case 'ArrowLeft':
                        console.log('press left arrow key');
                        this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.SPHERO1, ACTION.LEFT, ACTIVITY.CLUE));
                        break;
                    default:
                        break
                }

                this.hasKeyPressed = true;
            }
        });

        document.addEventListener('keyup', event => {
            switch (event.code) {
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowRight':
                case 'ArrowLeft':
                    console.log(`release ${event.code}`);
                    this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.SPHERO1, ACTION.STOP, ACTIVITY.CLUE));
                    break;
                default:
                    break;
            }

            this.hasKeyPressed = false;
        });
    }
}

// Build application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    const App = new Application();
});