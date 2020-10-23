import Activity from "./Activity";
import {ACTION, ACTIVITY, DEVICE, EVENT} from "../../constants";
import * as helpers from "../../helper";

export default class DogActivity extends Activity {
    getTemplate() {
        return 'dog-activity.tpl.html'
    }

    initElements() {
        super.initElements();
        this.standUpButton = document.getElementById('standupButton');
        this.searchButton = document.getElementById('searchButton');
    }

    initEvents() {
        super.initEvents();
        this._initButtonsEvents();
    }

    launch() {
        super.launch();
        console.log('dog activity launched');
    }

    _initButtonsEvents() {
        this.standUpButton.addEventListener('click', () => {
            console.log("standup clicked");
            this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.DRONE, ACTION.STANDUP, ACTIVITY.DOG));
        });

        this.searchButton.addEventListener("click", () => {
            console.log("search clicked");
            this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.DRONE, ACTION.SEARCH, ACTIVITY.DOG));
        });
    }
}