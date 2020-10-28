import Activity from "./Activity";
import io from "socket.io-client";
import * as helpers from "../../helper";
import {ACTION, ACTIVITY, DEVICE, EVENT} from "../../constants";

export default class LaboActivity extends Activity {
    getTemplate() {
        return 'labo-activity.tpl.html'
    }

    initElements() {
        super.initElements();
        this.launchButton = document.getElementById('launchButton');
        this.loadBar = document.getElementById('loadBar');
        this.LOADING_DURATION = 20000;
        this.loadingTimer = null;
        this.currentStep = document.querySelector('.step1');
    }

    initEvents() {
        super.initEvents();
        this._initButtonsEvents();
    }

    launch() {
        super.launch();
        console.log('labo activity launched');
    }

    _changeStep(targetStepNumber) {
        let targetStep = document.querySelector('.step' + targetStepNumber);
        this.currentStep.style.display = 'none';
        targetStep.style.display = '';
        this.currentStep = targetStep;
    }

    _initButtonsEvents() {
        this.launchButton.addEventListener('click', () => {
            console.log('click on launchButton');
            this._changeStep(2);
            this._startLoading();
            this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.NONE, ACTION.START, ACTIVITY.LABO_ACTIVITY));
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
