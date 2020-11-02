import Activity from "./Activity";

export default class DogActivity extends Activity {
    getTemplate() {
        return 'dog-activity.tpl.html'
    }

    initElements() {
        super.initElements();
        /* Activity page */
        this.activity = {
            element: document.querySelector('div[data-namespace="dog"]'),
        };
        /* Dog containers */
        this.dogContainers = {
            all: document.getElementsByClassName('dog-container'),
            step1: {
                element: document.getElementsByClassName('step1'),
                button: document.getElementById('button-step1'),
                nextStep: 'step2',
            },
            step2: {
                element: document.getElementsByClassName('step2'),
                button: document.getElementById('button-step2'),
            },
            step3: {
                element: document.getElementsByClassName('step3'),
                rightSide: document.getElementById('right-step3'),
                title: document.getElementById('title-step3'),
                description: document.getElementById('description-step3'),
                buttonPosition: {
                    element: document.getElementById('button-position-step3'),
                },
                buttonSearch: {
                    element: document.getElementById('button-search-step3'),
                },
                suspectContainer: {
                    element: document.getElementById('suspect-container'),
                    img: document.querySelector('#suspect-container img'),
                },
                nextStep: 'step4'
            },
            step4: {
                element: document.getElementsByClassName('step4'),
                button: document.getElementById('button-step4'),
            }
        };
        /* Configuration variables */
        this.searchCount = 0;
    }

    initEvents() {
        super.initEvents();
        /* Step1 events */
        this._initStep1Event();
        /* Step2 events */
        this._initStep2Event();
        /* Step3 events */
        this._initStep3Event();
        /* Step4 events */
        this._initStep4Event();
        /* Suspect events */
        this._initSuspectFoundEvent();
    }

    _initStep1Event() {
        this.dogContainers.step1.button.addEventListener('click', () => {
            /* Take off the drone */
            // this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.DRONE, ACTION.STANDUP, ACTIVITY.DOG));
            let onHiddingCallback = null;

            if (this.dogContainers.step1.nextStep === 'step3') {
                onHiddingCallback = () => {
                    this._resetSuspectContainer();
                    this._setSearchModeStep3();
                }
            }

            this._changeStep(this.dogContainers.step1.nextStep, onHiddingCallback);
        });
    }

    _initStep2Event() {
        this.dogContainers.step2.button.addEventListener('click', () => {
            /* Take off the drone */
            // this.webSocketConnection.emit(EVENT.INDICO, helpers.formatDatas(DEVICE.DRONE, ACTION.SEARCH, ACTIVITY.DOG));
            this._changeStep('step3');
        });
    }

    _initStep3Event() {
        /* Init position button */
        this.dogContainers.step3.buttonPosition.element.addEventListener('click', () => {
            this.dogContainers.step3.rightSide.classList.remove('positionMode', 'searchMode');
            this._changeStep('step4');
        });
        /* Init search button */
        this.dogContainers.step3.buttonSearch.element.addEventListener('click', () => {
            /* In this case, it is the second apparition of step 3. So, we need to remove position and search mode */
            this.dogContainers.step3.rightSide.classList.remove('positionMode', 'searchMode');
            this.dogContainers.step3.title.textContent = 'Attente';
            this.dogContainers.step3.description.textContent = 'Ne bougez pas pendant la phase de recherche du chien';
        });
    }

    _initStep4Event() {
        this.dogContainers.step4.button.addEventListener('click', () => {
            this._changeStep('step1')
                .then(() => {
                    /* We need to change nextStep to redirect to the step 3 */
                    this.dogContainers.step1.nextStep = 'step3';
                })
        });
    }

    _initSuspectFoundEvent() {
        this.router.onSuspectFound(() => {
            this.searchCount++;
            console.log('Suspect found !', this.searchCount);
            // In this situation we should be in step 3 interface
            if (this.searchCount === 1) {
                this._displaySuspect();
                this._setPositionModeStep3();

                // After 5 seconds, we change of step
                setTimeout(() => {
                    this.dogContainers.step3.rightSide.classList.remove('positionMode', 'searchMode');
                    this._changeStep('step4');
                }, 5000);
            }

            if (this.searchCount >= 2) {
                // In this situation, we should be in the step 3 for the second time
                this._displaySuspect();
                this.dogContainers.step3.title.textContent = 'Trouvé !';
                this.dogContainers.step3.description.textContent = 'Votre chien a identifié 2 fois le suspect, nous tenons le coupable !';
                console.log('On redirige trois seconde après vers la page finale !')
            }
        });
    }

    // Helpers
    _changeStep(stepNumber, onHiddingCallback = null) {
        /* Hide activity to change container step */
        console.log('before hidding');
        this.activity.element.classList.add('isHidden');
        console.log('after hidding');
        /* Hide all labo containers */
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('before trigger callback');
                if (onHiddingCallback) {
                    onHiddingCallback();
                }
                console.log('after trigger callback');
                for (const dogContainer of this.dogContainers.all) {
                    dogContainer.classList.remove('isActive');
                }
                /* Show current step container */
                const displayableContainer = this.dogContainers[stepNumber].element;
                for (const dogContainer of displayableContainer) {
                    dogContainer.classList.add('isActive');
                }
                /* Show activity after laboContainer changed  */
                this.activity.element.classList.remove('isHidden');
                resolve();
            }, 600);
        });
    }

    // Methods dynamic step3
    _setPositionModeStep3() {
        this.dogContainers.step3.rightSide.classList.remove('searchMode');
        //this.dogContainers.step3.rightSide.classList.add('positionMode');
        this.dogContainers.step3.title.textContent = 'Trouvé !';
        this.dogContainers.step3.description.textContent = 'Recommencer une seconde fois en changeant l\'ordre des pots.';
    }

    _setSearchModeStep3() {
        this.dogContainers.step3.rightSide.classList.remove('positionMode');
        this.dogContainers.step3.rightSide.classList.add('searchMode');
        this.dogContainers.step3.title.textContent = 'Odeur enregistré';
        this.dogContainers.step3.description.textContent = 'Votre chien se souvient de l\'odeur, il est prêt à la chercher';
    }
    _resetSuspectContainer() {
        this.dogContainers.step3.suspectContainer.element.classList.remove('isFound');
    }

    _displaySuspect() {
        this.dogContainers.step3.suspectContainer.element.classList.add('isFound');
    }

    launch() {
        super.launch();
        console.log('dog activity launched');
    }

}