import io from 'socket.io-client'
import {ACTION, TARGET} from './constants'

document.addEventListener('DOMContentLoaded', (event) => {
    const port = "8888"
    const urlServerWebSocket = `172.20.10.10:${port}`

    // se connecte au serveur
    const socket = io(urlServerWebSocket);

    // au moment de la connexion
    socket.on('connect', () => {

        // Tant que le server est bien connecté
        console.log('connected to server');
        socket.send('connected !');

        standupButton.addEventListener("click",  () => {
            console.log("stand up clicked");
            socket.emit("test",{
                targetActivity:TARGET.DRONE,
                action:ACTION.STANDUP
            });
        })

        searchButton.addEventListener("click", function () {
            console.log("search clicked");
            socket.emit("test",{
                targetActivity:TARGET.SPHERO1,
                action:ACTION.SEARCH
            });
        })
    
        gobackButton.addEventListener("click", function () {
            console.log("go back clicked");
        })
    
        sitdownButton.addEventListener("click", function () {
            console.log("sit down clicked");
        })
    });

});