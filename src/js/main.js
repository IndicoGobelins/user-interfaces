import io from 'socket.io-client'
import {ACTION, DEVICE, ACTIVITY} from './constants'
import * as helpers from './helper'

document.addEventListener('DOMContentLoaded', (event) => {
    const port = "8888"
    const ip = `172.20.10.14`
    const urlServerWebSocket = `${ip}:${port}`

    // se connecte au serveur
    const socket = io(urlServerWebSocket);

    // au moment de la connexion
    socket.on('connect', () => {

        // Tant que le server est bien connecté
        console.log('connected to server');
        socket.send('connected !');

        standupButton.addEventListener("click",  () => {
            console.log("stand up clicked");
            socket.emit("test",helpers.formatDatas(DEVICE.DRONE,ACTION.STANDUP,ACTIVITY.DOG));
        })

        searchButton.addEventListener("click", function () {
            console.log("search clicked");
            socket.emit("test",helpers.formatDatas(DEVICE.DRONE,ACTION.SEARCH,ACTIVITY.DOG));
        })
    
        gobackButton.addEventListener("click", function () {
            console.log("go back clicked");
        })
    
        sitdownButton.addEventListener("click", function () {
            console.log("sit down clicked");
        })
    });

});