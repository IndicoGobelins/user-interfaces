# Interfaces Web Utilisateurs

## Installation du projet
```npm
npm install
npm run watch
bash server.sh
```
Un serveur local sera créé à l'adresse `0.0.0.0:1234`

## Note rendu intermédiaire - 1/3

### Description
C'est la première partie de l'architecture. L'ensemble du code source est situé dans le dossier `src`.

### Structure
* On retrouve les deux fichiers HTML (atelier de la collecte d'indice et atelier du chien) dans le dossier `public`
* Toute la partie Javascript est située dans le dossier `src/js`. Il y a un fichier Javascript par fichier HTML.
* Le code est structuré en classe ES6 dans lesquelles on gère les écouteurs d'évènements des boutons et la communication WebSocket avec le serveur NodeJS.
* Au clique des boutons (ou des touches du clavier), un helper (`src/js/helpers`) construit le message en accord avec notre protocole et ce dernier est envoyé au serveur NodeJS.

### Exemple de la conversion du clique en message WebSocket
* Je clique sur le bouton `Avancer` (dans l'activité de la récolte d'indice).
* La classe Javascript principale l'évènement et va construire le message avec le helper :
```js
const data = helpers.formatDatas(DEVICE.SPHERO1, ACTION.FORWARD, ACTIVITY.CLUE)
```
* La variable data aura pour valeur : `$@#SPHERO1@#FORWARD@#CLUE_ACTIVITY`

### Explication rapide du protocole
Les données qui sont envoyées à l'application IOS respectent le format suivant :
`header + separateur + device + separateur + action + separateur + activité`

* Le **header** permet de distinguer les messages qui proviennent des activités des autres messages indésirables (que nous ne gérons pas).
* Le **device** est l'appareil ciblé à piloter.
* L'**action** correspond à l'action précise d'une activité qui sera exécutée (exemple: avancer la sphéro).
* L'**activité** correspond à l'activité courante qui est en train d'être jouée.
