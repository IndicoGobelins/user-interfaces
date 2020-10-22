import axios from 'axios';

class DomManager {
    constructor() {
        this.initElements();
    }

    initElements() {
        this.TEMPLATE_DIRECTORY = '../../templates';
        this.overlayActivity = document.getElementById('activity-overlay');
        this.activityContainer = document.getElementById('activity-container');
    }

    async inject(templateName) {
        try {
            await this.displayOverlay();
            const {data: templateContent} = await axios.get(`${this.TEMPLATE_DIRECTORY}/${templateName}`);
            this.activityContainer.innerHTML = templateContent;
            this.hideOverlay();
        } catch (e) {
            console.log(`Template ${templateName} not found`);
        }
    }

    displayOverlay(time = 3000) {
        this.overlayActivity.style.width = '100%';
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, time)
        });
    }

    hideOverlay() {
        this.overlayActivity.style.width = '0%';
    }
}

export default new DomManager();