import Activity from "./Activity";
import {ACTION, ACTIVITY, DEVICE, EVENT} from "../../constants";
import * as helpers from "../../helper";
import Breadcrumb from "../components/Breadcrumb";


export default class ClueActivity extends Activity {
    initElements() {
        /* Init Breadcrumb */
        Breadcrumb.setFirstStep();
        Breadcrumb.setBarWidth(33);
        Breadcrumb.show();
        /* Activity page */
        this.activity = {
            left: {
                element: document.querySelector('div[data-namespace="clues"] .left')
            },
            right: {
                element: document.querySelector('div[data-namespace="clues"] .right')
            }
        };
        /* Overlay */
        this.instructionOverlay = {
            element: document.getElementById('instruction-overlay'),
            button: document.getElementById('instruction-overlay-button')
        };
        this.comeBackSampleOverlay = {
            element: document.getElementById('come-back-sample-overlay'),
            button: document.getElementById('come-back-sample-overlay-button')
        };
        /* Sample buttons */
        this.samples = {
            all: document.getElementsByClassName('sample'),
            first: {
                dom: document.getElementById('first-sample'),
                collected: false
            },
            second: {
                dom: document.getElementById('second-sample'),
                collected: false
            },
            selected: '1'
        };
        /* Joystick buttons */
        this.joysticks = {
            all: document.getElementsByClassName('joystick-button'),
            top: document.getElementById('joystick-button-top'),
            left: document.getElementById('joystick-button-left'),
            bottom: document.getElementById('joystick-button-bottom'),
            right: document.getElementById('joystick-button-right'),
            container: document.getElementById('joystick-container')
        };
        /* Collect button */
        this.collectButton = {
            element: document.getElementById('collect-button'),
            icon: document.querySelector('#collect-button .indico-button-icon'),
            text: document.querySelector('#collect-button .indico-button-text'),
            backgroundOverlay: document.getElementById('background-overlay')
        };
        /* Configuration variables */
        this.isSampleBackOverlayAlreadyDisplayed = false;
        this.animationCollectButtonDuration = '3000' // ms
        this.countCollect = 0;
    }

    initEvents() {
        super.initEvents();
        /* Init overlay events */
        this._initOverlayEvents();
        /* Init samples button event */
        this._initSamplesButtonEvents();
        /* Init joystick button events */
        this._initJoystickButtonEvents();
        /* Init collect button event */
        this._initCollectButton();
    }

    _initOverlayEvents() {
        this.instructionOverlay.button.addEventListener('click', () => {
            this.instructionOverlay.element.style.opacity = '0';
            setTimeout(() => {
                this.instructionOverlay.element.style.display = 'none';
            }, 600);
        });

        this.comeBackSampleOverlay.button.addEventListener('click', () => {
            this.comeBackSampleOverlay.element.classList.remove('isShown');
            this.activity.left.element.classList.remove('isBlur');
            this.activity.right.element.classList.remove('isBlur');
        });
    }

    _initSamplesButtonEvents() {
        for (const sample of this.samples.all) {
            sample.addEventListener('click', (e) => {
                const selectedSample = e.target;
                this.samples.selected = selectedSample.getAttribute('data-num');

                /* Update collect button style if targeted sample has already been collected */
                if (this._getTargetSample().collected) {
                    console.log('Echantillon déjà collecté !');
                    this._disableCollectButton();
                } else {
                    this._enableCollectButton();
                }

                /* Change style of sample buttons */
                for (const sample of this.samples.all) {
                    sample.classList.remove('isSelected');
                }
                selectedSample.classList.add('isSelected');
            });
        }
    }

    _initJoystickButtonEvents() {
        /* Init stop event on release joystick buttons */
        for (const joystick of this.joysticks.all) {
            console.log(joystick);
            joystick.addEventListener('touchend', () => {
                console.log(`Stop ${this._getTargetSphero()}`);
                this.joysticks.container.classList.remove('isTop', 'isLeft', 'isBottom', 'isRight');
                this.actionManager.emit(EVENT.INDICO, this._getTargetSphero(), ACTION.STOP, ACTIVITY.CLUE);
                //this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(this._getTargetSphero(), ACTION.STOP, ACTIVITY.CLUE));
            });
        }

        /* Init each button */
        this.joysticks.top.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log(`Forward ${this._getTargetSphero()}`);
            this.joysticks.container.classList.add('isTop');
            this.actionManager.emit(EVENT.INDICO, this._getTargetSphero(), ACTION.FORWARD, ACTIVITY.CLUE);
            // this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(this._getTargetSphero(), ACTION.FORWARD, ACTIVITY.CLUE));
        });
        this.joysticks.left.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log(`Left ${this._getTargetSphero()}`);
            this.joysticks.container.classList.add('isLeft');
            this.actionManager.emit(EVENT.INDICO, this._getTargetSphero(), ACTION.LEFT, ACTIVITY.CLUE);
            // this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(this._getTargetSphero(), ACTION.LEFT, ACTIVITY.CLUE));
        });
        this.joysticks.bottom.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log(`Bottom ${this._getTargetSphero()}`);
            this.joysticks.container.classList.add('isBottom');
            this.actionManager.emit(EVENT.INDICO, this._getTargetSphero(), ACTION.BACKWARD, ACTIVITY.CLUE);
            // this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(this._getTargetSphero(), ACTION.BACKWARD, ACTIVITY.CLUE));
        });
        this.joysticks.right.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log(`Right ${this._getTargetSphero()}`);
            this.joysticks.container.classList.add('isRight');
            this.actionManager.emit(EVENT.INDICO, this._getTargetSphero(), ACTION.RIGHT, ACTIVITY.CLUE);
            // this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(this._getTargetSphero(), ACTION.RIGHT, ACTIVITY.CLUE));
        });
    }

    _initCollectButton() {
        this.collectButton.element.addEventListener('click', () => {
            this.countCollect++;

            if (this.countCollect === 1) {
                Breadcrumb.setBarWidth(66);
            } else {
                Breadcrumb.setBarWidth(100);
            }

            this.actionManager.emit(EVENT.INDICO, this._getTargetSphero(), ACTION.COLLECT, ACTIVITY.CLUE);
            // this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(this._getTargetSphero(), ACTION.COLLECT, ACTIVITY.CLUE));
            this._getTargetSample().collected = true;
            /* Start collect button animation */
            this._disableCollectButton(true)
                .then(() => {
                    if (!this.isSampleBackOverlayAlreadyDisplayed) {
                        this.comeBackSampleOverlay.element.classList.add('isShown');
                        this.activity.left.element.classList.add('isBlur');
                        this.activity.right.element.classList.add('isBlur');
                        this.isSampleBackOverlayAlreadyDisplayed = true;
                    }
                })
        });
    }

    // Helpers function
    _getTargetSphero() {
        return this.samples.selected === '1' ? DEVICE.SPHERO1 : DEVICE.SPHERO2;
    }

    _getTargetSample() {
        return this.samples.selected === '1' ? this.samples.first : this.samples.second;
    }

    async _disableCollectButton(withAnimation = false) {
        const doAction = () => {
            this.collectButton.element.disabled = true;
            this.collectButton.icon.src = '../img/white-check.svg';
            this.collectButton.text.innerText = 'Prélevé';
        };
        this.collectButton.backgroundOverlay.style.width = '100%';

        if (withAnimation) {
            await new Promise(resolve => {
                setTimeout(() => {
                    doAction();
                    resolve();
                }, this.animationCollectButtonDuration)
            });
        } else {
            doAction();
        }

        this.collectButton.backgroundOverlay.style.display = 'none';
        this.collectButton.backgroundOverlay.style.width = '0';
    }

    _enableCollectButton() {
        this.collectButton.backgroundOverlay.style.display = 'block';
        this.collectButton.element.disabled = false;
        this.collectButton.icon.src = '../img/collect.svg';
        this.collectButton.text.innerText = 'Récolter';
    }

    getTemplate() {
        return 'clues-activity.tpl.html'
    }

    launch() {
        super.launch();
    }
}