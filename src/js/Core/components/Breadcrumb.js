class Breadcrumb {
    constructor() {
        this.initElements();
    }

    initElements() {
        this.element = document.getElementById('breadcrumb');
        this.text = '';
        this.class = '';
        this.progressbar = {
            element: document.getElementById('progress-bar'),
            text: document.getElementById('progress-bar-text')
        };

        this.step1 = document.querySelector('#breadcrumb #step1');
        this.step2 = document.querySelector('#breadcrumb #step2');
        this.step3 = document.querySelector('#breadcrumb #step3');

        this.stepItem = document.getElementsByClassName('step-number');
    }

    setFirstStep() {
        this.resetBarWidth();
        this.resetStepItemClass();
        this.step1.classList.add('isActive');
        this.text = 'Prélever';
        this.class = 'firstStep';
        this.render();
    }

    setSecondStep() {
        this.resetBarWidth();
        this.resetStepItemClass();
        this.step2.classList.add('isActive');
        this.text = 'Analyser';
        this.class = 'secondStep';
        this.render();
    }

    setThirdStep() {
        this.resetBarWidth();
        this.resetStepItemClass();
        this.step3.classList.add('isActive');
        this.text = 'Chercher';
        this.class = 'thirdStep';
        this.render();
    }

    resetStepItemClass() {
        for (const item of this.stepItem) {
            item.classList.remove('isActive');
        }
        this.element.classList.remove('firstStep', 'secondStep', 'thirdStep');
    }

    resetBarWidth() {
        this.progressbar.element.style.width = '0';
    }

    render() {
        this.element.classList.add(this.class);
        this.progressbar.text.textContent = this.text;
    }

    /**
     *
     * @param {number} width // percentage %
     */
    setBarWidth(width) {
        this.progressbar.element.style.width = `${width}%`;
    }

    show() {
        this.element.style.visibility = 'visible';
    }
}

export default new Breadcrumb();