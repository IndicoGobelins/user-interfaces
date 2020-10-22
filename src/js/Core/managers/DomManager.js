import axios from 'axios';

class DomManager {
    constructor() {
        this.initElements();
    }

    initElements() {
        this.TEMPLATE_DIRECTORY = '../../templates';
        this.activityContainer = document.getElementById('activity-container');
    }

    async inject(templateName) {
        try {
            const {data: templateContent} = await axios.get(`${this.TEMPLATE_DIRECTORY}/${templateName}`);
            this.activityContainer.innerHTML = templateContent;
        } catch (e) {
            console.log(`Template ${templateName} not found`);
        }
    }
}

export default new DomManager();