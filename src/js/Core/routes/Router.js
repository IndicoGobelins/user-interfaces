import DomManager from "../managers/DomManager";
import Route from "./Route";
import {EVENT} from "../../constants";
import ActionManager from "../managers/ActionManager";

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
        this.suspectFoundCallback = null;
    }

    on(event, activity) {
        this.routes.push(new Route(event, activity));

        return this;
    }

    onSuspectFound(callback) {
        this.suspectFoundCallback = callback;
    }

    init(testTargetActivity = null) {
        /* Init activity routing */
        for (const route of this.routes) {
            this.webSocketClient.on(route.event, async () => {
                console.log(route.event);
                await this._displayActivity(route.activity);
            });
        }

        /* Init independent events */
        this.webSocketClient.on(EVENT.SUSPECT_FOUND, () => {
            this.suspectFoundCallback();
        });

        if (testTargetActivity) {
            this._displayActivity(testTargetActivity)
                .then(() => {
                    console.log(`Test activity displayed successfully`);
                })
                .catch(e => {
                    console.log('An error has occured during the activity test launch !', e);
                })
        }
    }

    async _displayActivity(activity) {
        const Activity = new activity(this.webSocketClient, this);
        const templateName = Activity.getTemplate();
        await DomManager.inject(templateName);
        Activity.launch();
    }
}