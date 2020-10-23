import io from "socket.io-client";
import * as helpers from "./helper";
import Router from "./Core/routes/Router";
import {ACTIVITY} from "./constants";
import LaboActivity from "./Core/activities/LaboActivity";
import DogActivity from "./Core/activities/DogActivity";
import ClueActivity from "./Core/activities/ClueActivity";

class Application {
    constructor() {
        this.initElements();
        this.initWebSocketConnection();
    }

    initElements() {
        this.socketClient = null;
    }

    initWebSocketConnection() {
        /* Open WS connection */
        this.socketClient = io(helpers.getUrlWebsocketServer());
        const WsRouter = new Router(this.socketClient);

        WsRouter
            .on(ACTIVITY.LABO_ACTIVITY, LaboActivity)
            .on(ACTIVITY.DOG, DogActivity)
            .on(ACTIVITY.CLUE, ClueActivity)
            .init();
    }
}
// Build application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    const App = new Application();
});