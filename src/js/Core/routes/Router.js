import DomManager from "../managers/DomManager";
import Route from "./Route";

export default class Router {
    constructor(webSocketClient) {
        this.webSocketClient = webSocketClient;
        this.initElements()
    }

    initElements() {
        /**
         * @type {Route[]}
         */
        this.routes = [];
    }

    on(event, activity) {
        this.routes.push(new Route(event, activity));

        return this;
    }

    init() {
        for (const route of this.routes) {
            this.webSocketClient.on(route.event, async () => {
                console.log(route.event);
                const Activity = new route.activity(this.webSocketClient);
                const templateName = Activity.getTemplate();
                await DomManager.inject(templateName);
                Activity.launch();
            });
        }
    }
}