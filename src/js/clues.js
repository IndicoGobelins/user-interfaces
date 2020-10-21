import io from "socket.io-client";
import * as helpers from "./helper";
import { ACTION, ACTIVITY, DEVICE, EVENT } from "./constants";

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

        this.actionButtons = document.querySelectorAll(".btn-action");

        this.collectIcone = document.getElementById("iconeEchantillon");

        this.device1 = {
            dom: document.getElementById('SPHERO1'),
            isChecked: true,
            isCollected: false
        };
        this.device2 = {
            dom: document.getElementById('SPHERO2'),
            isChecked: false,
            isCollected: false
        };
        this.device = this._getCurrentDevice();
    }

    _initWebSocketConnection() {
        this.socketClient.on('connect', () => {
            this._initButtonsEvents();
            this._initFunDirection();
        });

        this._initButtonsEvents();
        this._initFunDirection();
        this._initRadioButton();
        this._initCollectEvent();
    }

    // SET DEVICE DYNAMICALLY
    _getCurrentDevice() {
        if (this.device1.isChecked)
            return DEVICE.SPHERO1;
        else
            return DEVICE.SPHERO2;
    }

    _setCurrentDevice(device) {
        this.device = device;
    }

    // EVENTS HANDLER
    _initButtonsEvents() {

        for (let index = 0; index < this.actionButtons.length; index++) {
            const element = this.actionButtons[index];
            element.addEventListener('touchend', () => {
                console.log("stop");
                this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(this.device, ACTION.STOP, ACTIVITY.CLUE));
            });
        }

        this.forwardButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log("forward clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(this.device, ACTION.FORWARD, ACTIVITY.CLUE));
        });

        this.backwardButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            console.log("backward clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(this.device, ACTION.BACKWARD, ACTIVITY.CLUE));
        });

        this.leftButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            console.log("left clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(this.device, ACTION.LEFT, ACTIVITY.CLUE));
        });

        this.rightButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            console.log("right clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(this.device, ACTION.RIGHT, ACTIVITY.CLUE));
        });

        this.collectButton.addEventListener("click", () => {
            console.log("collect clicked");
            this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(this.device, ACTION.COLLECT, ACTIVITY.CLUE));
        });
        
    }

    _initRadioButton() {

        let array = [this.device1, this.device2];

        array.forEach(element => {
            element.dom.addEventListener("click", (e) => {

                array.forEach(el => {
                    el.dom.classList.remove("active");
                    el.isChecked = false;
                });

                e.target.classList.add("active");
                element.isChecked = true;
            
                this.device = this._getCurrentDevice();

                if(element.isCollected) {
                    this.collectIcone.classList.add("isPlain");
                } else {
                    this.collectIcone.classList.remove("isPlain");
                }
            })
        });
    }

    _initCollectEvent() {
        this.collectButton.addEventListener("click", () => {
            if(this.device1.isChecked && !this.device1.isCollected) {
                this.device1.isCollected = true;
            }
            if(this.device2.isChecked && !this.device2.isCollected) {
                this.device2.isCollected = true;
            }

            this.collectIcone.classList.add("isPlain");
        })
    }

    _initFunDirection() {
        document.addEventListener('keydown', event => {
            if (!this.hasKeyPressed) {
                switch (event.code) {
                    case 'ArrowUp':
                        console.log('press up arrow key');
                        this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(this.device, ACTION.FORWARD, ACTIVITY.CLUE));
                        break;
                    case 'ArrowDown':
                        console.log('press down arrow key');
                        this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(this.device, ACTION.BACKWARD, ACTIVITY.CLUE));
                        break;
                    case 'ArrowRight':
                        console.log('press right arrow key');
                        this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(this.device, ACTION.RIGHT, ACTIVITY.CLUE));
                        break;
                    case 'ArrowLeft':
                        console.log('press left arrow key');
                        this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(this.device, ACTION.LEFT, ACTIVITY.CLUE));
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
                    this.socketClient.emit(EVENT.INDICO, helpers.formatDatas(this.device, ACTION.STOP, ACTIVITY.CLUE));
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