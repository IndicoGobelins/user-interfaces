import Activity from "./Activity";
import * as helpers from "../../helper";
import {ACTION, ACTIVITY, DEVICE, EVENT} from "../../constants";

export default class LaboActivity extends Activity {
    getTemplate() {
        return 'labo-activity.tpl.html'
    }

    initElements() {
        /* Activity page */
        this.activity = {
            element: document.querySelector('div[data-namespace="labo"]'),
        };
        /* Containers */
        this.laboContainers = {
            all: document.getElementsByClassName('labo-container'),
            step1: {
                element: document.getElementsByClassName('step1'),
                button: document.getElementById('button-step1')
            },
            step2: {
                element: document.getElementsByClassName('step2'),
                loadBar: document.getElementById('load-bar'),
                illustration: document.getElementById('illustration-step2')
            },
            step3: {
                element: document.getElementsByClassName('step3'),
            },
        };
        /* Configuration variables */
        this.LOADING_DURATION = 20000
    }

    initEvents() {
        super.initEvents();
        /* Step 1 events */
        this._initStep1Event();
    }

    _initStep1Event() {
        this.laboContainers.step1.button.addEventListener('click', () => {
            /* Launch labo activity */
            this.actionManager.emit(EVENT.INDICO, DEVICE.NONE, ACTION.START, ACTIVITY.LABO_ACTIVITY);
            // this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.NONE, ACTION.START, ACTIVITY.LABO_ACTIVITY));
            this._changeStep('step2')
                .then(() => {
                    this._handleStep2Animation(true);
                    return this._startLoading();
                })
                .then(() => {
                    return this._changeStep('step3');
                })
                .then(() => {
                    this._handleStep2Animation(false);
                })

        });
    }

    // Helper methods
    _changeStep(stepNumber) {
        /* Hide activity to change container step */
        this.activity.element.classList.add('isHidden');
        /* Hide all labo containers */
        return new Promise((resolve) => {
            setTimeout(() => {
                for (const laboContainer of this.laboContainers.all) {
                    laboContainer.classList.remove('isActive');
                }
                /* Show current step container */
                const displayableContainer = this.laboContainers[stepNumber].element;
                for (const laboContainer of displayableContainer) {
                    laboContainer.classList.add('isActive');
                }
                /* Show activity after laboContainer changed  */
                this.activity.element.classList.remove('isHidden');
                resolve();
            }, 600);
        });
    }

    _startLoading() {
        const delay = 1000;
        const frameWidth = 100 * delay / this.LOADING_DURATION;
        let width = 0;

        return new Promise(resolve => {
            this.loadingTimer = setInterval(() => {
                width += frameWidth;
                console.log('width -> ', width);
                this.laboContainers.step2.loadBar.style.width = `${width}%`;

                if (width >= 100) {
                    clearInterval(this.loadingTimer);
                    resolve();
                }

            }, delay);
        })
    }

    _handleStep2Animation(animated) {
        if (animated) {
            this.laboContainers.step2.illustration.classList.add('isAnimate');
        } else {
            this.laboContainers.step2.illustration.classList.remove('isAnimate');
        }
    }

    launch() {
        super.launch();
        console.log('labo activity launched');
    }

}
