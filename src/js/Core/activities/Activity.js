export default class Activity {
    constructor(webSocketConnection) {
        this.webSocketConnection = webSocketConnection;
    }

    /**
     * Init elements of the class
     */
    initElements() {}

    /**
     * Init events of the class
     */
    initEvents() {}

    /**
     * Return the name of the .html file corresponding to the activity
     */
    getTemplate() {}

    /**
     * Launch the current activity after retrieve and inject template on DOM
     */
    launch() {
        this.initElements();
        this.initEvents();
    }

    /**
     * Lifecycle hook for destroy
     */
    onDestroy() {}
}